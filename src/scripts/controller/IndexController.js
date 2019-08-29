const indexTpl = require("../views/index.html")
import HomeController from "./HomeController"
import SortController from "./SortController"
import VipController from  "./VipController"
import CartController from "./CartController"
import ProfileController from "./ProfileController"
import signinController  from './SigninController'



class IndexController{
    constructor(){
        this.render()
        this.bindHashChange()
        this.bindTabbarEvent()
        this.components = {
            home   : HomeController,
            sort   : SortController,
            vip    : VipController,
            cart   : CartController,
            profile: ProfileController,
            signin   : signinController,
        }
    }
    render(){
        $("#root").html(indexTpl);
    }
    bindHashChange(){
        $(window).on('hashchange',()=>{
            let hash = location.hash && location.hash.substr(1) || 'home'
            if(hash == 'cart' || hash == 'profile' || hash == 'signin'){
               let token = localStorage.getItem('x-access-token')
              $.ajax({
                    url:'/submit/api/users/isSignin',
                    headers:{
                        'x-access-token':token
                    },
                    success:$.proxy(function(result){
                        if(result.ret){
                            this.setTabbarActive(hash)
                            this.renderMain(this.components[hash])
                        }else{
                            $('.container footer').css('display','none')
                            location.hash = 'signin'
                            this.renderMain(this.components[hash])
                        }
                    },this)
                })
            }else{
                $('.container footer').css('display','block')
                this.setTabbarActive(hash)
                this.renderMain(this.components[hash])
            }

        })
        $(window).on('load',()=>{
            let hash = location.hash && location.hash.substr(1) || "home"
            location.hash = hash  ;
            if(hash == 'cart' || hash == 'profile' || hash == 'signin'){
                let token = localStorage.getItem('x-access-token')
               $.ajax({
                     url:'/submit/api/users/isSignin',
                     headers:{
                         'x-access-token':token
                     },
                     success:$.proxy(function(result){
                         if(result.ret){
                             this.setTabbarActive(hash)
                             this.renderMain(this.components[hash])
                         }else{
                             $('.container footer').css('display','none')
                             location.hash = 'signin'
                             this.renderMain(this.components[hash])
                         }
                     },this)
                 })
             }else{
                 $('.container footer').css('display','block')
                 this.setTabbarActive(hash)
                 this.renderMain(this.components[hash])
             }
        })
    }
    renderMain(controller){
        $("main").html("<img id='layz' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565276100052&di=0b144fdf380706b81fc7bb4efb41ada5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5ac0d375bfb83e892b4884bb1d7e5046d223da2d2bd08-LrjhBO_fw658'/>");
        $(".container>#recommend").remove()

        controller.render()
    }
    bindTabbarEvent(){
        $("footer li").on('tap',function(){
            let dataHash = $(this).attr("id")
            location.hash = dataHash
        })
    }
    setTabbarActive(hash){
        $(`footer li[id=${hash}]`).addClass('active').siblings().removeClass('active')
    }
}

export default new IndexController()










