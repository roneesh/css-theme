const slidersCallback = (entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.intersectionRatio > 0.25) {
      const klass = el.getAttribute('data-slide-class');
      el.classList.add(klass);
    }
  });
}

let observer = new IntersectionObserver(slidersCallback, {
  rootMargin: '0px',
  threshold: 0.25,
});

const sliders = Array.from(document.getElementsByClassName('js-slider'));
sliders.forEach(slider => observer.observe(slider));