document.addEventListener('DOMContentLoaded', function() {
  // Find all splide elements
  const splideElements = document.querySelectorAll('.splide:not([data-splide-controller])');
  
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
      fixedWidth: '288px',
      arrows: false,
      pauseOnHover: true,
      pauseOnFocus: true,
      rewind: true,
      speed: 1000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      updateOnMove: true,
      gap: '36px',
      perPage: 3,
      focus: 0,
      pagination: false,
      breakpoints: {
        989: {
          fixedWidth: false,
          perPage: 3,
          gap: '24px'
        },
        720: {
          fixedWidth: false,
          perPage: 2,
          gap: '16px'
        }
      }
    });

    // Function to update slide positions
    const updateSlidePositions = () => {
      const slides = splide.Components.Slides.get();
      const activeIndex = splide.index;
      
      slides.forEach((slide) => {
        const element = slide.slide;
        // Calculate relative position (-1 = previous, 0 = current, 1 = next, etc)
        const relativePosition = slide.index - activeIndex;
        element.dataset.slidePosition = relativePosition;
      });
    };

    // Find the controller element
    const bannerStack = element.closest('.slider').querySelector('.banner-stack');
    const sliderControls = bannerStack?.querySelector('.slider__controls');
    
    if (sliderControls) {
      const arrowsContainer = sliderControls.querySelector('.splide__arrows');
      const controllerElement = sliderControls.querySelector('[data-splide-controller]');
      
      if (arrowsContainer) {
        // Create and append arrows
        const prevButton = document.createElement('button');
        prevButton.className = 'splide__arrow splide__arrow--prev';
        prevButton.setAttribute('type', 'button');
        prevButton.setAttribute('aria-label', 'Previous slide');
        
        const nextButton = document.createElement('button');
        nextButton.className = 'splide__arrow splide__arrow--next';
        nextButton.setAttribute('type', 'button');
        nextButton.setAttribute('aria-label', 'Next slide');
        
        arrowsContainer.appendChild(prevButton);
        arrowsContainer.appendChild(nextButton);
        
        // Initialize arrows functionality
        prevButton.addEventListener('click', () => splide.go('<'));
        nextButton.addEventListener('click', () => splide.go('>'));
      }

      if (controllerElement) {
        // Initialize controller
        const controller = new Splide(controllerElement, {
          type: 'slide',
          rewind: true,
          pagination: true,
          arrows: false,
          isNavigation: true,
          perPage: 1,
          perMove: 1
        });

        // Sync the controller with the main carousel
        controller.sync(splide);
        controller.mount();
      }
    }

    // Update positions when mounted
    splide.on('mounted', updateSlidePositions);
    
    // Update positions when slides move
    splide.on('moved', updateSlidePositions);

    // Mount the main splide instance
    splide.mount();
  });
});
