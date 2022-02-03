import { createApp } from  'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site='https://vue3-course-api.hexschool.io/v2/';
const api_path='amberlin';

const app=createApp({
    data(){
        return{
            selectObj:{},
            products:{},
        }
        
      },
    methods:{
        checkLogin(){
            //取出 cookie
            const token=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            //預設: 驗證登入狀態
            const url=`${site}api/user/check`;
            axios.post(url)
            .then(()=>{
                //console.log(res);
                this.getProduct();
            })
        }, 
        getProduct(){
            const url=`${site}api/${api_path}/admin/products/all`;
            axios.get(url)
            .then(res=>{
                //console.log(res);
                this.products=res.data.products;
            });
        }
    },
    mounted(){
        this.checkLogin();
    }
});
app.mount('#app');