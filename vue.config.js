var path = require("path");
module.exports = {
  devServer: {
    host: "gawook.io",
    proxy: {
      "/api": {
        target: "http://gawook-backend.io:8000/api",
        pathRewrite: {'^/api' : '/'}
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        requestfactory: path.resolve(
          __dirname,
          "src/requests/RequestFactory.js"
        )
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack(config) {
    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-source-map")
    );
  }
};
