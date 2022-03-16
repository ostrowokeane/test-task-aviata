import "reset.css";
import "./assets/styles/main.styl";
import "@fontsource/open-sans";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Checkbox from "@/components/Checkbox.vue";
import IcoReset from "@/components/IcoReset.vue";
import VWave from "v-wave";

const app = createApp(App);
app.use(router);
app.use(VWave, {
  duration: 0.25,
  initialOpacity: 0.5,
});
app.component("Checkbox", Checkbox);
app.component("IcoReset", IcoReset);
app.mount("#app");
