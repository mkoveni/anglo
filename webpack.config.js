const path = require('path')
const outputDir = './public/js'

module.exports = {
    
    entry: {
        app: './resources/assets/js/app.ts'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, outputDir)
    },

    resolve: {
        extensions:['.ts','.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module:{
        rules:[
            {
                test: /\.vue\.html$/,
                loader: 'vue-loader',
                include:/resources/,
                options: {
                    loaders:{ js: 'awesome-typescript-loader?silence=true'}
                }
            },
            {
                test: /\.ts$/,
                use:['awesome-typescript-loader']
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }

        ]
    }
}