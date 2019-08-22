import BScroll from 'better-scroll'
import Http  from '../model/Http'
import homeNavMainTpl from '../views/homeNavMain.html'
class ControllerNav{
    constructor(){}
    init(scroll){
        this.nav_wrapper = $("#recommend") 
        this.box   = $(".home-main-wraper")
        this.items_list = $('#nav-scroll ul') 
        this.flag  = true
        this.items     = $("#recommend nav ul li");
        this.items.on("tap",function(){
          $(this).addClass('active').siblings().removeClass('active')
        })
        $(this.items[0]).addClass('active');
        let eles =$('#nav-scroll > ul >li')
        let sum = 0;
        eles.forEach((item)=>{
            sum +=  $(item).width()
        })
        $("#nav-scroll > ul").css("width",sum)
        let Scroll = new BScroll('#nav-scroll',{
            scrollX: true
        })
        scroll.on("scroll",(scroll)=>{
            let hash =location.hash.substr(1)
            if(hash == "home"){
                this.nvafixed()
            }
        })
        this.navBarTap(scroll)
    }
    nvafixed(){
        if(this.nav_wrapper.offset().top <= 0  && this.flag){
            $(".cloneNav").remove()
            $($(".container")[0].insertBefore(this.nav_wrapper[0],$(".container main")[0])).addClass("cloneNav")
            $("cloneNav").removeClass('cloneNav')
            this.flag =false
        }
        if(this.box.offset().top >= 44 && !this.flag){
            $(".container main #home")[0].insertBefore(this.nav_wrapper[0],$(".home-main-wraper")[0])
            this.flag = true
        }
    }
    navBarTap(){
        let flag = false
       this.items_list.on('tap','.active',function(){
            if(!flag){
                new NavMainRender().init(this,scroll)
                setTimeout(function(){flag=false},200)
            }
            flag = true
        })
    }
}

class NavMainRender{
    constructor(){}
    init(ele,scroll){
        this.render(ele,scroll)
    }
    async render(ele,scroll){
        let id = $(ele).attr('data-id')
        let content_wrapper = $(`.sign[data-sign='${id}']`)
        if(content_wrapper.length == 1){
            content_wrapper.css('display','block').siblings().css('display','none')
        }else{
            let url = `/sapi/mobile/api/index/channelInfo?param=%7B%22id%22%3A${id}%2C%22type%22%3A%22mobile%22%7D`
            let data = await Http.getdata(url)
            let html = template.render(homeNavMainTpl,{data,id})
            let main = $(`<div  class="sign" data-sign="${id}">${html}</div>`) 
            $(".home-main-wraper").append(main)
            content_wrapper = $(`.sign[data-sign='${id}']`)
            content_wrapper.css('display','block').siblings().css('display','none')
            // this.fixed(scroll)
        }
    }
    // fixed(scroll){
    //     scroll.on('touchEnd',function(){
    //         console.log(this.y)
    //     }
    // }
}


export default new ControllerNav()