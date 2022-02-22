;(function(){
    //前台首页
    $('.navbar-collapse a.myindex').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
    //Admin
    $('.navbar-collapse .dropdown-menu a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
    //退出按钮
    $('.navbar-collapse .closes a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
   
})();