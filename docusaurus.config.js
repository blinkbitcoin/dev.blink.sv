// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Blink Developer Documentation',
  tagline: 'Developer Docs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://dev.blink.sv',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'blinkbitcoin', // Usually your GitHub org/user name.
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
          // Remove these to remove the "edit this page" links.
          /*
          editUrl: ({ versionDocsDirPath, docPath }) => {
            return `https://github.com/blinkbitcoin/dev.blink.sv/edit/main/${versionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          */
        },
        blog: {
          showReadingTime: true,
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/blinkbitcoin/dev.blink.sv/edit/main/website/${blogDirPath}/${blogPath}',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-QG87ZX5PS3',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/blink-logo-black.png',
      navbar: {
        title: 'API Documentation',
        logo: {
          alt: 'Blink logo',
          src: 'img/blink-logo-orange.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'decode',
            label: 'LN Invoice Decoder',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'selfHostSidebar',
            label: 'Self-Host',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'contact',
            label: 'Contact',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Follow us',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/blinkbitcoin',
              },
              {
                label: 'X/Twitter',
                href: 'https://twitter.com/blinkbtc',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Blink Mattermost',
                href: 'https://chat.blink.sv',
              },
              {
                label: 'BlinkAPI Telegram Channel',
                href: 'https://t.me/+aKn9E5ZIMs8zZmMy',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'About Blink',
                href: 'https://www.blink.sv',
              },
              {
                label: 'Status Page',
                href: 'https://blink.statuspage.io',
              },
              {
              label: 'Blink FAQ',
              href: 'https://faq.blink.sv',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BBW, S.A. de C.V.`,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false, //manual dark mode switch
        respectPrefersColorScheme: true, // system dark mode switch
      },
      algolia: {
        appId: 'W87P4T5P28',
        apiKey: 'ee1b157f836a7e06f1a72f0935486516',
        indexName: 'blink',
        contextualSearch: false, // only false works
        // Optional: Specify domains where the navigation should occur through
        // window.location instead on history.push. Useful when our Algolia config
        // crawls multiple documentation sites and we want to navigate with
        //window.location.href to them.
        externalUrlRegex: 'dev\\.blink\\.sv/public-api-reference\\.html|dev\\.blink\\.sv/admin-api-reference\\.html',
      },
    }),
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/api/auth',
            from: ['/api'],
          },
          {
            to: '/api/auth',
            from: ['/api/start'],
          },
          {
            to: '/examples/atm-integrations',
            from: ['/examples/lamassu-atm', '/examples/lightning-atm'],
          },
        ],
      },
    ],
  ],
};

module.exports = config;
