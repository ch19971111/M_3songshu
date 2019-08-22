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
}

export default new Http();