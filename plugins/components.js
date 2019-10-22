import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { Circle8 } from 'vue-loading-spinner'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

Vue.use(Notifications, { velocity })
Vue.use(VeeValidate)
Vue.component('Circle8', Circle8)
