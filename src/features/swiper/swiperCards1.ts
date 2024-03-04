import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types/swiper-options';

// import { breakpoint } from '$utils/breakpoint';

window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
  // const curBreakpoint = breakpoint();

  // if (curBreakpoint === 'desktop') return;

  const className: string = '.swiper.is-cards-1[data-mobile-swipe-mode="true"]';
  const swiperInstances: NodeListOf<HTMLElement> = document.querySelectorAll(className);

  // return if no swipers
  if (!swiperInstances.length) return;

  swiperInstances.forEach((swiperElement) => {
    initiateSwiper(swiperElement);
  });

  function initiateSwiper(swiperElement: HTMLElement) {
    const options = getSwiperOptions();
    const swiper = new Swiper(swiperElement, options);

    swiper.on('init', () => {
      const slides = swiper.slides.length;

      swiper.params.breakpoints = {
        0: {
          slidesPerView: slides <= 1 ? 1 : 1.25,
        },
        768: {
          slidesPerView: slides <= 2 ? 1.25 : 2.25,
        },
        992: {
          slidesPerView: slides <= 3 ? 2.25 : 3.25,
        },
      };
    });

    swiper.init();
    return swiper;
  }
});

function getSwiperOptions() {
  const options: SwiperOptions = {
    speed: 400,
    spaceBetween: 0,
    allowTouchMove: true,
    init: false,
  };

  return options;
}
