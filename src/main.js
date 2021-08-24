//  eslint-disable-next-line no-undef
__webpack_public_path__ = window.vueZipURL || "";

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.prototype.coachViewContext = window.coachViewContext;
Vue.prototype.ajaxURLs = window.ajaxURLS;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
