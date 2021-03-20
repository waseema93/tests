module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style.scss";`
      }
    }
  },
  devServer: {
    watchOptions: {
      poll: true
    }
  }
};
