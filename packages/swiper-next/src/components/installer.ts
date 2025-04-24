import type { App } from 'vue';

import { Swiper } from './swiper';
import { SwiperItem } from './swiper-item';


export default function (Vue: App) {
  Vue.use(Swiper);
  Vue.use(SwiperItem);
}
