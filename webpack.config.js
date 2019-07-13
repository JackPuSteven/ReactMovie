// 向外暴露一个打包配置对象  因为webpack是基于node构建的，支持node的所有语法

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin") //导入在内存中自动生成index.html页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    // __dirname是当前目录，就是根目录
    template: path.join(__dirname, "./src/index.html"), //源文件
    filename: "index.html" //生成的内存中首页的名称
})

// webpack默认只能打包 .js 后缀名类型的文件 像 .png .vue 无法主动处理，所以要配置第三方的loader；规则，都是放在module中处理
module.exports = {
    mode: "development", //development 开发环境  production 第一步
    // production会打包文件的同时压缩文件
    // development只会打包文件不会压缩文件
    // 在webpack4.x中 有一个很大的特性，就是约定默认大于配置，默认的打包入口路径是src下面的index.js  声明是开发模式
    plugins: [
        htmlPlugin
    ],

    module:{ //所有第三方模块的匹配规则
        rules:[ //第三方匹配规则 test是匹配规则一般是正则，use后是loader, exclude是排除的文件、文件夹
            {test: /\.js$|jsx$/, use: "babel-loader", exclude: /node_modules/}, //千万别忘记添加exclude排除项
            // 可以在CSS-loader之后通过  ？ 追加参数
            // 其中有一个固定的参数，叫做 modules，表示为 普通的 CSS 样式表启用模块化
            {test: /\.css$/, use:["style-loader", "css-loader"] },  //打包处理CSS样式表第三方loader
                // css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]
            {test: /\.ttf|woff|woff2|eot|svg$/, use: "url-loader"}, //打包处理字体文件的loader
            // 执行顺序是从右到左的，第三方普通的css不用模块化，自己写的scss或less就要模块化
            {test: /\.scss$/, use:["style-loader", "css-loader?modules", "sass-loader"]}, //打包处理scss 文件的loader
            // {test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/, use: "url-loader"}
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: "url-loader?limit=80000&name=[hash:8]-[name].[ext]"
            }, //处理图片路径的loader ?进行传参  ?limit=76311字节数,
        ]
    },

    resolve:{
        extensions : [".js", ".jsx", ".json"],  //表示,这几个文件的后缀名可以不写，会自动补全
        alias :{
            "@" : path.join(__dirname, './src')  //这样在 ，@表示项目根目录中src的这一层路径
        }
    }


}

// 行不行 不行不能这样子
// export default {}这是ES6的API向外导出模块的api  与之对应的是import ** from "标识符"  
// 哪些特性 Node支持？ 如果chrome 浏览器支持哪些，Node就支持哪些
// 