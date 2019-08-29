const {
    src,
    series,
    parallel,
    dest,
    watch
} = require("gulp")
const sass    = require("gulp-sass")
const webpack = require("webpack-stream")
const connect = require("gulp-connect")
const proxy   = require("http-proxy-middleware")
const del     = require("del")
// 拷贝html
function copyHtml(){
    return src(["../src/*.html"])
        .pipe(dest("../dev"))
        .pipe(connect.reload())
}
//拷贝css
function packCss(){
    return src("../src/styles/index.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(dest("../dev/styles"))
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
        .pipe(dest("../dev/scripts"))
        .pipe(connect.reload())
}
// 开启服务器
function webSrever(){
    return connect.server({
        host:'10.60.15.70',
        root:'../dev',
        port:8000,
        livereload:true,
        middleware(){
            return[
                proxy('/sapi',{
                    target : 'http://m.3songshu.com', //代理的链接
                    changeOrigin:true,  
                    pathRewrite:{
                        "^/sapi":'' //替换为空
                    }
                }),
                proxy('/submit',{
                    target : 'http://localhost:3000',
                    changeOrigin : true,
                    pathRewrite:{
                        "^/submit":''
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
// 拷贝libs
function copyLibs(){
    return src("../src/libs/**/*")
    .pipe(dest('../dev/libs'))
    .pipe(connect.reload())    
}

function copyAssets(){
    return src("../src/assets/**/*")
    .pipe(dest('../dev/assets'))
    .pipe(connect.reload())    
}

// 监听
function watcher(){
    watch("../src/*.html",series(copyHtml));
    watch("../src/styles/**/*.scss",series(packCss))
    watch("../src/scripts/**/*",series(packJs))
    watch("../src/libs/**/*",series(copyLibs))
}
exports.default = series(delDevFolder,packJs,packCss, parallel(copyLibs,copyAssets,copyHtml),parallel(webSrever,watcher));