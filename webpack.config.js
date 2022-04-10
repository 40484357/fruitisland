const path = require('path')

module.exports = {
    mode:'development',
    entry: {
        register: "./src/register.js",
        game: "./src/game.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    watch: true
}