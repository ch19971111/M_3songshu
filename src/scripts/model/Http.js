class Http{
    constructor(){}
    getdata(url){
        return fetch(url,{
            headers:{
                "appkey":"ef1fc57c13007e33",
                "appVersion":"4.0.1",
                "channel":"wap",
                "Connection":"keep-alive",
                "os":"wap",
                "osVersion":"11",
                "unique":"custom-2019080608144608645342930581938722945",
                "sourcePage":"#/tabs/index",
                "Accept" :'application/json, text/plain, */*'
            }
        })  
        .then(response => response.json())
        .then(result =>{
            return result
        })
    }
//     getdatas(){
//         //https://m.maizuo.com/gateway?type=2&cityId=110100&k=1233109
//         //https://m.study.163.com/j/operation/homepage.json
//         return fetch('/submit/j/operation/homepage.json',{
//             headers:{
//             'content-type': 'application/x-www-form-urlencoded',
//             'edu-script-token': 'ed24e26fe254481589b236e9e6c0e084',
//             'sec-fetch-mode': 'cors',
//             'sec-fetch-site': 'same-origin',
//             'access-control-expose-header': 'Set-Cookie,Max-Age',
//             'cache-control': 'no-cache'
//             },
//             method: 'POST',
//             credentials: 'include',
//             body:'_ntes_nnid=9712db9e650b5fe459381dd55bbc2390,1555746286704& _ntes_nuid=9712db9e650b5fe459381dd55bbc2390&NTESSTUDYSI=ed24e26fe254481589b236e9e6c0e084&EDUWEBDEVICE=5e56ec8fa1ba44a29aab053cee55d759&__utma=62404336.488765504.1566916579.1566916579.1566916579.1&__utmc=62404336&__utmz=62404336.1566916579.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)&utm=eyJjIjoiIiwiY3QiOiIiLCJpIjoiIiwibSI6IiIsInMiOiIiLCJ0IjoiIn0=|aHR0cHM6Ly9tLnN0dWR5LjE2My5jb20v&EDU-YKT-MODULE_GLOBAL_PRIVACY_DIALOG=true&__utma=129633230.2003775728.1566916714.1566916714.1566916714.1&__utmc=129633230&__utmz=129633230.1566916714.1.1.utmcsr=m.study.163.com|utmccn=(referral)|utmcmd=referral|utmcct=/&__utmb=129633230.1.10.1566916714&__utmb=62404336.3.10.1566916579',
//         })  
//         .then(response => response.json())
//         .then(result =>{
//             console.log(result)
//             return result
//         })
//     }
        getVipShop(){
            let token = localStorage.getItem('x-access-token')
            return $.ajax({
                url:'/submit/api/position/viplist',
                headers:{
                    'x-access-token':token
                },
                success(result){
                    return result
                }
            })
        }
}

export default new Http();