module.exports = {
    filenameHashing: false,
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 100000,
                maxSize: 250000000
            }
        }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    }
}
