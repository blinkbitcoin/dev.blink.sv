// plugins/inject-script/index.js
module.exports = function (context, options) {
  return {
    name: 'inject-script-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              src: '/js/bolt11.min.js',
            },
          },
        ],
      };
    },
  };
};
