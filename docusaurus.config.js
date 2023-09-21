// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Blink Dev Site',
  tagline: 'Developer Docs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dev.blink.sv',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'GaloyMoney', // Usually your GitHub org/user name.
  projectName: 'dev.blink.sv', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // This changes the base path from /docs
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/blink-logo.svg',
      navbar: {
        title: 'Blink Developer Documentation',
        logo: {
          alt: 'Blink logo',
          src: 'img/blink-logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'left',
            label: 'Hosted API',
          },
          {
            href: 'https://github.com/GaloyMoney',
            label: 'Follow Galoy on GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Hosted API',
                to: '/api',
              },
              {
                label: 'FAQ',
                href: 'https://faq.blink.sv',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/blinkbtc',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/blinkbtc',
              },
              {
                label: 'Nostr',
                href: 'https://snort.social/p/community@blink.sv',
              },
              {
                label: 'Galoy Mattermost',
                href: 'https://chat.galoy.io',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Project website',
                href: 'https://www.blink.sv',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/GaloyMoney',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Galoy Inc.`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,  // manual switch
        respectPrefersColorScheme: true, // system dark mode switch
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
