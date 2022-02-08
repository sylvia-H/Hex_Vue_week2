"use strict";

var baseUrl = 'https://vue3-course-api.hexschool.io/v2';
var API_PATH = 'sylviah';
var AUTH_TOKEN = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
"use strict";

var app = {
  data: function data() {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    loginIn: function loginIn() {
      axios.post("".concat(baseUrl, "/admin/signin"), this.userInfo).then(function (res) {
        var _res$data = res.data,
            token = _res$data.token,
            expired = _res$data.expired; // 用 cookie 儲存資料，myToken 是自定義名稱

        document.cookie = "myToken=".concat(token, "; expires=").concat(new Date(expired), ";");
        window.location = './backend.html';
      })["catch"](function (err) {
        console.log(err.response);
        var errTitle = err.response.data.message;
        var errMSG = err.response.data.error.message; //登入失敗，sweetalert 跳出提示訊息視窗

        swal("".concat(errTitle, "\uFF01"), errMSG, {
          icon: "error"
        });
      });
    }
  }
}; // 建立實體、掛載

Vue.createApp(app).mount('#app');
"use strict";

var app2 = {
  data: function data() {
    return {
      products: [],
      tempItemInfo: {}
    };
  },
  methods: {
    checkLogin: function checkLogin() {
      var _this = this;

      AUTH_TOKEN = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      axios.post("".concat(baseUrl, "/api/user/check")).then(function () {
        _this.getProducts();
      })["catch"](function (err) {
        console.log(err.response);
        window.location = './index.html';
      });
    },
    getProducts: function getProducts() {
      var _this2 = this;

      axios.get("".concat(baseUrl, "/api/").concat(API_PATH, "/admin/products")).then(function (res) {
        console.log(res.data.products);
        _this2.products = res.data.products;
      })["catch"](function (err) {
        console.log(err.response);
      });
    },
    changeStatus: function changeStatus(id) {
      this.products.forEach(function (item) {
        if (item.id === id) {
          item.is_enabled ? item.is_enabled = 0 : item.is_enabled = 1;
        }
      });
    },
    showDetail: function showDetail(id) {
      var _this3 = this;

      this.tempID = id;
      this.products.forEach(function (item) {
        if (item.id === id) {
          _this3.tempItemInfo = item;
        }
      });
    }
  },
  mounted: function mounted() {
    this.checkLogin();
  }
}; // 建立實體、掛載

Vue.createApp(app2).mount('#app2');
//# sourceMappingURL=all.js.map
