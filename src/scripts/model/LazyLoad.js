class LazyLoad{
    constructor(){}
    init(scroll){
        scroll.on("scroll",function(){
            $(".lazyload").each((index,item)=>{
               if($(item).offset().top <= 500){
                   $(item).attr("src",$(item).attr("data-url"))
                   $(item).removeClass("lazyload")
               }
            })
        })
    }
}
export default new LazyLoad()