;(function(){
    var Temp={
        template:'#temp'
    };
    var Heart={
        template:'#heart'
    };
    var Bp={
        template:'#bp'
    };
    var Bf={
        template:'#bf'
    };

    var routes=[
        {
            path:"/",
            component:Temp,
        },
		{
		    path:"/temp",
            component:Temp,
		},
        {
            path:"/heart",
            component:Heart,
			
        },{
            path:"/bp",
            component:Bp,
			
        },{
            path:"/bf",
            component:Bf,
			
        },
    ];
    var router=new VueRouter({
        routes:routes
    });

    var app=new Vue({
        el:'#app',
        router:router,
        methods:{
            refresh(){
                this.$router.go(0);				
            },       
        },
		computed:{
				activeDate: function(){
					var test = new Date();
					return test;
				}
		},
		watch:{
		            // //监听路由变化，用于判断是查看还是管理实习生系统
		            // $route(to,from){
		            //     Object.assign(this.$data, this.$options.data());
		            // }
					"$route":"refresh",
					
		        },
		
    });

})();