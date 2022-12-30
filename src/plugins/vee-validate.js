import Vue from "vue";
import {
	ValidationObserver,
	ValidationProvider,
	extend,
	localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
//import { required, alpha } from "vee-validate/dist/rules";
import * as rules from "vee-validate/dist/rules";
// install rules and localization
Object.keys(rules).forEach(rule => {
	extend(rule, rules[rule]);
});

localize("en", en);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
