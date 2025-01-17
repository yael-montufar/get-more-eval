document.addEventListener('DOMContentLoaded', function() {
  // Find all splide elements
  const splideElements = document.querySelectorAll('.splide');
  
  // Initialize each splide instance
  splideElements.forEach(element => {
    // Get configuration from data attributes
    const type = element.dataset.splideType || 'loop';
    const autoplay = element.dataset.splideAutoplay === 'true';
    const interval = parseInt(element.dataset.splideInterval, 10) || 5000;
    
    // Create new Splide instance with configuration
    const splide = new Splide(element, {
      type,
      autoplay,
      interval,
      width: '50%',
      // cover: true,
      heightRatio: 1,
      arrows: {
        position: 'bottom',
      },
      pagination: {
        position: 'bottom',
      },
      pauseOnHover: true,
      pauseOnFocus: true,
      rewind: true,
      speed: 1000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      updateOnMove: true,
      gap: '20px',
      padding: 0,
    });

    // Mount the splide instance
    splide.mount();
  });
});
