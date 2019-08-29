import homeTpl from '../views/home.html';
import signinTpl from '../views/signin.html';

class Signin{
    render(){
        $("main").html(signinTpl)
        this.styleController()
    }
    styleController(){
        $('#password').on('focus',function(){
            $(".login-img").addClass('active')
        })
        $('#password').on('input',function(){
            $('#password').val() == '' ? $('.sign-btn').removeClass('active') : $('.sign-btn').addClass('active')
        })
        $('#password').on('blur',function(){
            $(".login-img").removeClass('active')
        })
        $('.back-home').on('click',function(){
            location.hash = '#home'
        })
        $('.sign-btn').on('click',()=>{
            let data = $('.signin-form').serialize()
            $.ajax({
                url:'/submit/api/users/signin',
                type:'POST',
                data,
                success(result, textStatus, jqXHR){
                    if(result.ret){
                        let token = jqXHR.getResponseHeader('x-access-token')
                        localStorage.setItem('x-access-token',token)
                        location.hash = '#home'
                    }else{
                        alert('请输入正确的用户名或密码')
                    }
                }
            })
        })
    }
}

export default new Signin();