module.exports = function configOverride(config) {
    /**
     * @Resolve Some new config in Webpack >5 cause issues for old polyfills
     */
    const fallback = config.resolve.fallback || {}
    config.resolve.fallback =  Object.assign(fallback, {
        stream: require.resolve('stream-browserify')
      })

    return config
  }