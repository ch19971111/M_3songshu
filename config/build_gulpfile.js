const {
    src,
    series,
    dest,
} = require("gulp")
const htmlmin = require("gulp-htmlmin")
const sass    = require("gulp-sass")
const cleanCss= require("gulp-clean-css")
const webpack = require("webpack-stream")
const del     = require("del")
const rev     = require("gulp-rev")
const revCollector = require("gulp-rev-collector")
// 拷贝html
function copyHtml(){
    return src(["../src/*.html","../build/rev/**/*.json"])
        .pipe(revCollector()) //将build里面的文件名引入到主页
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(dest("../build"))
}
//拷贝css
function packCss(){
    return src("../src/styles/index.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(rev()) //更改文件名
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(dest("../build/styles"))
        .pipe(rev.manifest())  
        .pipe(dest("../build/rev/styles")) // 把更改的文件名放入rev文件下的json中
}
//拷贝js
function packJs(){
    return src("../src/scripts/**/*.js")
        .pipe(webpack({
            mode:"production", // 模式生成环境
            entry:"../src/scripts/index.js", //入口文件
            output:{
                filename:"index.js" // 出口文件名
            },
            module:{
                rules:[
                    {
                        test:/\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    },
                    {
                        test: /\.html$/, 
                        loader: "string-loader"
                    }
                ]
            }
        }))
        .pipe(rev())
        .pipe(dest("../build/scripts"))
        .pipe(rev.manifest())
        .pipe(dest("../build/rev/scripts"))
}

// 删除文件夹
function delbuildFolder(){
    return del("../build/**",{
        force:true
    })
}

exports.default = series(delbuildFolder,packJs,packCss,copyHtml);