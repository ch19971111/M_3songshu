import homeHotTpl from '../views/homeHot.html'
class HomeCountDown{
    init(){
        this.eles =$(".timedown");
        this.star()
    }
    star(){
        this.eles.forEach((item)=>{
            this.setTime(item)
            item.timer = setInterval(()=>{
                this.setTime(item)
            },1000)
        })
    }
    setTime(dom){
        let endtiem = $(dom).attr("data-endtime")
        let target  = new Date(endtiem)
        let diff    = target - Date.now()
        let days    = parseInt(diff/1000/60/60/24)
        let hours   = parseInt(diff/1000/60/60%24).toString().padStart(2,"0")
        let minutes = parseInt(diff/1000/60%60).toString().padStart(2,"0")
        let second  = parseInt(diff/1000%60).toString().padStart(2,"0")
        let d_html = days > 0 ? `仅剩${days.toString().padStart(2,"0")}天${hours}小时${minutes}分${second}秒` :  `仅剩${hours}小时${minutes}分${second}秒`
        if(diff<= 0){
            d_html = `活动已结束`
        }
        if($(dom).hasClass("time-count-down")){
            $(dom).html(`<span>${hours}:${minutes}:${second}</span>`)
        }else{
            $(dom).html(d_html)
        }
    }
    seckillCountDown(){
        
        ele.forEach((item,index)=>{
            
        })
        let endtiem = ele.attr("data-endtime")
        // setInterval(()=>{
            let target  = new Date(endtiem)
            let diff    = target - Date.now()
            let hours   = parseInt(diff/1000/60/60).toString().padStart(2,"0")
            let minutes = parseInt((diff/1000/60)%60).toString().padStart(2,"0")
            let second  = parseInt(diff/1000%60).toString().padStart(2,"0")
            ele.html(`<span> ${hours}:${minutes}:${second} </span>`)
        // },1000)
    }
    specialCountDown(){
        
    }
}

export default new HomeCountDown()