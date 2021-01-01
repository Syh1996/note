import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { get,post } from '../libs/axios'
import BrandNav from '../components/brandNav'
Vue.use(Element, { locale })
Vue.component('BrandNav',BrandNav);
Vue.prototype.$get = get;
Vue.prototype.$post = post;

