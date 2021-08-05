module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/info': { page: '/info' },
    '/tmp/md-label': { page: '/tmp/md-label' },
  }),
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}
