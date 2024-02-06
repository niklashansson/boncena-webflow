import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.Webflow = window.Webflow || [];

window.Webflow.push(() => {
  const showAnim = gsap
    .from('.global_header', {
      yPercent: -120,
      paused: true,
      duration: 0.3,
    })
    .progress(1);

  ScrollTrigger.create({
    start: '50vh top',
    end: 'max',
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });
});
