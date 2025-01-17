function initSplitSlider() {
    const mainSlider = document.querySelector('.splide-slider .splide');
    const controlsSlider = document.querySelector('.banner-stack [data-splide-controller]');

    if (!mainSlider || !controlsSlider) {
        console.warn('Slider elements not found:', {
            mainSlider: !!mainSlider,
            controlsSlider: !!controlsSlider
        });
        return;
    }

    const mainSplide = new Splide(mainSlider, {
        type: 'loop',
        arrows: false,
        pagination: false,
        fixedWidth: '288px',
        perPage: 4,
        gap: '24px',
        breakpoints: {
            990: {
                perPage: 3,
                fixedWidth: false,
                gap: '24px'
            },
            720: {
                perPage: 2,
                fixedWidth: false,
                gap: '16px'
            }
        }
    });

    const controlsSplide = new Splide(controlsSlider, {
        type: 'loop',
        perPage: 4,
        gap: '24px',
        pagination: true,
        arrows: true,
        isNavigation: true,
        classes: {
            arrows: 'splide__arrows your-class-arrows',
            arrow : 'splide__arrow your-class-arrow',
            prev  : 'splide__arrow--prev your-class-prev',
            next  : 'splide__arrow--next your-class-next',
        }
    });

    mainSplide.sync(controlsSplide);

    // Custom autoplay implementation
    let direction = 'next';
    let autoplayInterval;
    const INTERVAL = 2500;

    function updateArrowStates() {
        const prevButton = controlsSlider.querySelector('.splide__arrow--prev');
        const nextButton = controlsSlider.querySelector('.splide__arrow--next');
        
        prevButton.dataset.active = direction === 'prev';
        nextButton.dataset.active = direction === 'next';
    }

    function startAutoplay() {
        stopAutoplay();
        updateArrowStates();
        autoplayInterval = setInterval(() => {
            if (direction === 'next') {
                controlsSplide.go('>');
            } else {
                controlsSplide.go('<');
            }
        }, INTERVAL);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Mount the sliders first
    mainSplide.mount();
    controlsSplide.mount();

    // Then setup controls and autoplay
    const prevButton = controlsSlider.querySelector('.splide__arrow--prev');
    const nextButton = controlsSlider.querySelector('.splide__arrow--next');

    prevButton.addEventListener('click', () => {
        direction = 'prev';
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        direction = 'next';
        startAutoplay();
    });

    // Pause autoplay on hover/focus if needed
    controlsSlider.addEventListener('mouseenter', stopAutoplay);
    controlsSlider.addEventListener('mouseleave', startAutoplay);
    controlsSlider.addEventListener('focusin', stopAutoplay);
    controlsSlider.addEventListener('focusout', startAutoplay);

    // Start autoplay after everything is set up
    startAutoplay();
}

document.addEventListener('DOMContentLoaded', function() {
    initSplitSlider();
});

document.addEventListener('shopify:section:load', (event) => {
    const section = event.target;
    const slider = section.querySelector('.splide-slider .splide');

    if (slider) {
        initSplitSlider();
    }
});
