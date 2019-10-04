const withCSS = require('@zeit/next-css')
const withLess = require('@akouryy/next-less');

module.exports = withCSS(withLess({
  exportPathMap: () => ({
    '/': { page: '/' },
    '/info': { page: '/info' },
    '/tmp/md-label': { page: '/tmp/md-label' },
  }),
  lessLoaderOptions: {
    math: 'strict',
    strictUnits: true,
  },
}));
