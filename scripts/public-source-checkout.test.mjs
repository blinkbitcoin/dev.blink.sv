import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

const scripts = [
  "generate-public-api-reference.sh",
  "generate-admin-api-reference.sh",
  "generate-api-reference-for-llm.sh",
  "generate-api-reference-markdown.sh",
  "generate-api-reference-openapi.sh",
]
const sourceUrl = "https://github.com/blinkbitcoin/blink-legacy"

function fixture(t, scriptName) {
  const script = readFileSync(new URL(`./${scriptName}`, import.meta.url))
  const root = mkdtempSync(join(tmpdir(), "public-source-"))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const git = execFileSync("which", ["git"], { encoding: "utf8" }).trim()
  const bin = join(root, "bin")
  const docs = join(root, "docs")
  mkdirSync(bin)
  mkdirSync(docs)
  mkdirSync(join(docs, "static", "reference"), { recursive: true })
  const env = {
    ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
    PATH: `${bin}:${process.env.PATH}`,
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_TERMINAL_PROMPT: "0",
    GIT_ALLOW_PROTOCOL: "file",
  }
  const runGit = (cwd, ...args) => execFileSync(git, args, {
    cwd, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
  }).trim()
  function repo(name) {
    const path = join(root, name)
    mkdirSync(path)
    runGit(path, "init", "-b", "main")
    runGit(path, "config", "user.name", "Test")
    runGit(path, "config", "user.email", "test@example.invalid")
    writeFileSync(join(path, "source"), name)
    runGit(path, "add", ".")
    runGit(path, "-c", "commit.gpgsign=false", "commit", "--no-gpg-sign", "-m", name)
    return path
  }
  const publicRepo = repo("public")
  const privateRepo = repo("private")
  Object.assign(env, {
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: `url.file://${publicRepo}/.insteadOf`,
    GIT_CONFIG_VALUE_0: sourceUrl,
  })
  for (const command of ["yarn", "npm", "curl", "sed"]) {
    writeFileSync(join(bin, command), "#!/bin/sh\nexit 0\n", { mode: 0o755 })
  }
  writeFileSync(join(bin, "npx"),
    '#!/bin/sh\nif [ "$2" != "--version" ]; then touch "$GENERATION_MARKER"; fi\n',
    { mode: 0o755 })
  writeFileSync(join(bin, "node"),
    '#!/bin/sh\nif [ "$1" != "--version" ]; then touch "$GENERATION_MARKER"; fi\n',
    { mode: 0o755 })
  env.GENERATION_MARKER = join(root, "generated")
  writeFileSync(join(docs, "generate.sh"), script)
  const checkout = join(docs, ".temp", "blink")
  const run = () => spawnSync("bash", ["generate.sh"], { cwd: docs, env, encoding: "utf8" })
  return { root, docs, env, publicRepo, privateRepo, checkout, run, runGit }
}

for (const scriptName of scripts) {
  test(`${scriptName}: fresh generation clones into the expected blink directory`, (t) => {
    const f = fixture(t, scriptName)
    const result = f.run()
    assert.equal(result.status, 0, result.stderr)
    assert.equal(readFileSync(f.env.GENERATION_MARKER, "utf8"), "")
    assert.equal(f.runGit(f.checkout, "rev-parse", "HEAD"), f.runGit(f.publicRepo, "rev-parse", "HEAD"))
    assert.equal(f.runGit(f.checkout, "config", "remote.origin.url"), sourceUrl)
  })

  test(`${scriptName}: cached checkout is retargeted before generation`, (t) => {
    const f = fixture(t, scriptName)
    mkdirSync(join(f.docs, ".temp"))
    f.runGit(f.docs, "clone", f.privateRepo, f.checkout)
    const result = f.run()
    assert.equal(result.status, 0, result.stderr)
    assert.equal(readFileSync(f.env.GENERATION_MARKER, "utf8"), "")
    assert.equal(f.runGit(f.checkout, "rev-parse", "HEAD"), f.runGit(f.publicRepo, "rev-parse", "HEAD"))
    assert.equal(f.runGit(f.checkout, "config", "remote.origin.url"), sourceUrl)
  })

  test(`${scriptName}: unavailable public source fails before generation`, (t) => {
    const f = fixture(t, scriptName)
    f.env.GIT_CONFIG_KEY_0 = `url.file://${join(f.root, "missing")}/.insteadOf`
    const result = f.run()
    assert.notEqual(result.status, 0)
    assert.throws(() => readFileSync(f.env.GENERATION_MARKER), { code: "ENOENT" })
  })

  test(`${scriptName}: failed refresh never generates from cached private source`, (t) => {
    const f = fixture(t, scriptName)
    mkdirSync(join(f.docs, ".temp"))
    f.runGit(f.docs, "clone", f.privateRepo, f.checkout)
    f.env.GIT_CONFIG_KEY_0 = `url.file://${join(f.root, "missing")}/.insteadOf`
    const result = f.run()
    assert.notEqual(result.status, 0)
    assert.throws(() => readFileSync(f.env.GENERATION_MARKER), { code: "ENOENT" })
  })
}
