import homeTpl from '../views/home.html';
import navShow from '../controller/HomeNavshowController';
import hotShow from '../controller/HomeHot-pro';
import countDown from '../controller/HomeCountDown';

import Http from '../model/Http';
import BScroll from 'better-scroll';
import lazyLoad from '../model/LazyLoad'
// Http.getdatas()
class HomeController{
    constructor(){}
    async render(){
        let data = await Http.getdata("/sapi/mobile/api/index/info?param=%7B%22type%22%3A%22mobile%22%7D")
        let datas = data.data
        let html = template.render(homeTpl,{ datas })
        $("main").html(html)
        let scroll = new BScroll("main",{
            probeType:3,
            tap:true
        })
        this.mainController(scroll)
    }

    mainController(scroll){
        navShow.init(scroll)
        hotShow.init(scroll)
        countDown.init()
        lazyLoad.init(scroll)
    }
}



export default new HomeController();

