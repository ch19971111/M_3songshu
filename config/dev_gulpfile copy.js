const {
    src,
    series,
    parallel,
    dest,
    watch
} = require("gulp")
const htmlmin = require("gulp-htmlmin")
const sass    = require("gulp-sass")
const cleanCss= require("gulp-clean-css")
const webpack = require("webpack-stream")
const connect = require("gulp-connect")
const proxy   = require("http-proxy-middleware")
const del     = require("del")
const rev     = require("gulp-rev")
const revCollector = require("gulp-rev-collector")
// 拷贝html
function copyHtml(){
    return src(["../src/*.html","../dev/rev/**/*.json"])
        .pipe(revCollector()) //将dev里面的文件名引入到主页
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(dest("../dev"))
        .pipe(connect.reload())
}
//拷贝css
function packCss(){
    return src("../src/styles/index.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(rev()) //更改文件名
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(dest("../dev/styles"))
        .pipe(rev.manifest())  
        .pipe(dest("../dev/rev/styles")) // 把更改的文件名放入rev文件下的json中
        .pipe(connect.reload())
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
        .pipe(dest("../dev/scripts"))
        .pipe(rev.manifest())
        .pipe(dest("../dev/rev/scripts"))
        .pipe(connect.reload())
}
// 开启服务器
function webSrever(){
    return connect.server({
        host:'localhost',
        root:'../dev',
        port:8000,
        livereload:true,
        middleware(){
            return[
                proxy('/api',{
                    target : 'https://m.lagou.com', //代理的链接
                    changeOrigin:true,  
                    pathRewrite:{
                        "^/api":'' //替换为空
                    }
                })
            ]
        }
    })
}
// 删除文件夹
function delDevFolder(){
    return del("../dev/**",{
        force:true
    })
}


// 监听
function watcher(){
    watch("../src/*.html",series(copyHtml));
    watch("../src/styles/**/*.scss",series(packCss,copyHtml))
    watch("../src/scripts/**/*",series(packJs))
}
exports.default = series(delDevFolder,packJs,packCss,copyHtml,parallel(webSrever,watcher));