const withCSS = require('@zeit/next-css')
const withLess = require('@akouryy/next-less');

module.exports = withCSS(withLess({
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
  lessLoaderOptions: {
    math: 'strict',
    strictUnits: true,
  },
}));
