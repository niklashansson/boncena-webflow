export function breakpoint() {
  if (window.matchMedia('screen and (max-width: 991px) and (min-width: 768px)').matches) {
    return 'tablet';
  }
  if (window.matchMedia('screen and (max-width: 767px) and (min-width: 479px)').matches) {
    return 'landscape';
  }
  if (window.matchMedia('screen and (max-width: 478px)').matches) {
    return 'portrait';
  }
  return 'desktop';
}
