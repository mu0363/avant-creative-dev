//withTMは謎だけどDokaのNext.jsプロジェクトに書いてあったから...付けたの
const withTM = require('next-transpile-modules')(['doka', 'react-doka']);

module.exports = withTM({
  images: {
    domains: ['d2xa88l081gc75.cloudfront.net'],
  },

  webpack: (config) => {
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty',
    };
    return config;
  },
  webpack5: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
