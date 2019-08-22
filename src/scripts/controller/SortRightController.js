import sortRightTpl from '../views/sortRight.html';
import BScroll from 'better-scroll'
class SortRightController{
    init(data){
        let datas = data[0]
        let items =  $(".sort-left ul li")
        $(items[0]).addClass("active")
        items.on("tap",function(){
            let index = items.index($(this))
            $(this).addClass("active").siblings().removeClass('active')
            datas = data[index]
            function render(datas){
                let html = template.render(sortRightTpl,{datas})
                $(".sort-right").html(html)
                let scroll_right = new BScroll(".sort-right",{})
            }
            render(datas)
        })
        this.render(datas)
    }
    render(datas){
        let html = template.render(sortRightTpl,{datas})
        $(".sort-right").html(html)
        let scroll_right = new BScroll(".sort-right",{})
    }
}

export default new SortRightController()