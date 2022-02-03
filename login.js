import { createApp } from  'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site='https://vue3-course-api.hexschool.io/v2/';

const app=createApp({
    data(){
        return{
            user:{
                username:'',
                password:'',
            },
        }
    },
    methods:{
        login(){
            //console.log(this.user);
            const url=`${site}admin/signin`;
            axios.post(url, this.user)
            .then(res => {
                //console.log(res);
                const { token, expired }=res.data;
                //console.log(token, expired);
                //自定義儲存token的名稱；new Date轉換UNIX timestamp
                //expired為秒數，而寫入 cookie 裡，必須使用毫秒（一秒＝1000毫秒），所以expired要乘以 1000
                document.cookie = `myToken=${token}; expires=${new Date(expired*1000)};` 
                //登入成功後,轉址
                window.location="productList.html" 
            })
            .catch(err => {
                console.log(err);
            })
        }, 
    }
});
app.mount('#app');