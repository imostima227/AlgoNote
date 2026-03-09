// 懒加载
if ('IntersectionObserver' in window) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let img = entry.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        observer.unobserve(img);
      }
    });
})
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
} else {
  // Fallback for older browsers (using scroll events - less efficient)
  // ... implement scroll event logic ...

}