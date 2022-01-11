import { createApp } from "vue";
import App from "@/view/App.vue";
import { showLoading } from "@/view/layers/loading";

function init() {
    showLoading();
}

createApp(App, { init }).mount("#app");
