import Http from '../model/Http'
import homeHotTpl from '../views/homeHot.html'

class HotproductController{
    init(scroll){
        // this.hot_ele = $(".hot-pro")
        // this.hot_ele_offset = this.hot_ele.offset().top
        // this.flag  = true
        this.render(scroll)
        
    }
    // showHot(scrollTop){
    //     if(scrollTop <= (-this.hot_ele_offset+700) && this.flag){
    //         this.render()
    //         this.flag =false;
    //     }
    // }
    async render(scroll){
       let data = (await Http.getdata("/sapimobile/api/index/recommendList/1")).data.items
       let html = template.render(homeHotTpl,{data})
       let flag = true
       scroll.on("touchEnd",function(){
           
           let diff = this.y - this.maxScrollY
           if(diff<44 && diff >= 0 && flag){
               this.scrollTo(0,this.maxScrollY+44)
           }
           if(diff < 0 && flag){
                $(".hot-pro").html(html)
                flag = false
                scroll.refresh()
           }
           if(!flag){
                diff = this.y - this.maxScrollY
                $('#load').html('我是有底线的哦！')
              if(diff<44){
                this.scrollTo(0,this.maxScrollY+44)
              }
           }
       })
    }
}
export default new HotproductController()