module.exports = {
    publicPath: "/dtx/",
    devServer: {
        host: "0.0.0.0",
        port: "8080", //name of port
        public: "0.0.0.0:8080"
        // disableHostCheck: true,
        // noInfo: true,
        // proxy: "http://hrdproxy.hrd-s.com:81"
    },
    transpileDependencies: ["vuetify"]
};
