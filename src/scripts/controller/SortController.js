import homeTpl from '../views/home.html';
import sortTpl from '../views/sort.html';
import Http   from '../model/Http'
import sortRightController from './SortRightController'
import BScroll from 'better-scroll'

class SortController{
    constructor(){}
    async render(){
        let data = (await Http.getdata("/sapi/mobile/api/navigation/listNew?param=%7B%22id%22%3A0%2C%22depth%22%3A0%2C%22type%22%3A1%7D")).data
        let html = template.render(sortTpl,{data})
        $("main").html(html);
        sortRightController.init(data)
        let scroll_left = new BScroll(".sort-left",{})
    }
}
export default new SortController()