import homeTpl from '../views/home.html';
import profileTpl from '../views/profile.html';
import BScroll from 'better-scroll'
class ProfileController{
    constructor(){}
    render(){
        $("main").html(profileTpl);
        let Scroll = new BScroll('.profile',{
            scrollY: true
        })
    }

}
export default new ProfileController()