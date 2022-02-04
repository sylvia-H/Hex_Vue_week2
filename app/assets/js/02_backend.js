const app2 = {
    data() {
        return {
            products : [],
            tempItemInfo:{}
        }
    },
    methods:{
        checkLogin(){
            AUTH_TOKEN = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            axios.post(`${baseUrl}/api/user/check`)
            .then(() => {
                this.getProducts();
            })
            .catch(err => {
                console.log(err.response);
                window.location = './index.html';
            })
        },
        getProducts(){
            axios.get(`${baseUrl}/api/${API_PATH}/admin/products`)
            .then(res => {
                console.log(res.data.products);
                this.products = res.data.products;
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        changeStatus(id){
            this.products.forEach(item => {
                if(item.id === id){
                    item.is_enabled ? item.is_enabled = 0 : item.is_enabled = 1;
                }
            });
        },
        showDetail(id){
          this.tempID = id;
          this.products.forEach(item => {
            if(item.id === id){
            this.tempItemInfo = item;
            }
          });
        }
    },
    mounted(){
        this.checkLogin();
    }
};

// 建立實體、掛載
Vue.createApp(app2).mount('#app2');
