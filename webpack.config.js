var webpack = require('webpack');
var path = require('path');
//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
module.exports = {//注意这里是exports不是export
    devtool: 'eval-source-map',
    entry: __dirname + "/app/index.js",//唯一入口文件，就像Java中的main方法
    output: {//输出目录
        path: __dirname + "/build",//打包后的js文件存放的地方
        filename: "bundle.js"//打包后的js文件名
    }, module: {
        //loaders加载器
        loaders: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel-loader'//loader的名称（必须）
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 8081,
        hot:true,
        inline:true,
        progress:true,
        historyApiFallback: true,
        open: true,
    }, plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};