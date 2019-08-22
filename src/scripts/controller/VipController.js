import homeTpl from '../views/home.html';
import vipTpl from '../views/vip.html';
import Http from '../model/Http'
import BScroll from 'better-scroll'
class VipController{
    constructor(){}
    async render(){
        let data = (await Http.getdata("/sapi/mobile/api/integral/index/info")).data.floors
        let html = template.render(vipTpl,{data})
        $("main").html(html);
        let nums = $(".txt")
        $.each(nums,(index,item)=>{
            var num = Number($(item).html())
            $(item).html(`${num}.00`)
        })
        let Scroll = new BScroll('.better-scroll',{
            scrollY: true
        })
    }
}
export default new VipController()