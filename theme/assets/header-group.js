// Function to update group heights
function updateGroupHeights() {
  // Update custom group height
  const customGroup = document.querySelector('.custom-group');
  if (customGroup) {
    const customHeight = customGroup.offsetHeight;
    document.documentElement.style.setProperty('--custom-group-height', `${customHeight}px`);
  }

  // Update header height (desktop)
  const headerNav = document.querySelector('.header-group__nav-space');
  if (headerNav) {
    const headerHeight = headerNav.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }

  // Update mobile header height
  const mobileSidebar = document.querySelector('.sidebar');
  if (mobileSidebar) {
    const mobileHeight = mobileSidebar.offsetHeight;
    document.documentElement.style.setProperty('--header-mobile-height', `${mobileHeight}px`);
  }
}

// Update on load and resize
window.addEventListener('load', updateGroupHeights);
window.addEventListener('resize', updateGroupHeights);

// Update when content changes (for dynamic content)
const observer = new ResizeObserver(updateGroupHeights);
const customGroup = document.querySelector('.custom-group');
const headerNav = document.querySelector('.header-group__nav-space');
const mobileSidebar = document.querySelector('.sidebar');

if (customGroup) observer.observe(customGroup);
if (headerNav) observer.observe(headerNav);
if (mobileSidebar) observer.observe(mobileSidebar);

class LanguageSelector {
  constructor() {
    this.form = document.getElementById('sidebar-language-form');
    this.buttons = this.form.querySelectorAll('button[data-value]');
    this.input = this.form.querySelector('input[name="language_code"]');
    
    this.buttons.forEach(button => {
      button.addEventListener('click', this.handleLanguageSelection.bind(this));
    });
  }

  handleLanguageSelection(event) {
    const selectedLanguage = event.currentTarget.getAttribute('data-value');
    if (selectedLanguage === this.input.value) return; // Don't submit if same language
    
    this.input.value = selectedLanguage;
    this.form.submit();
  }
}

// Initialize language selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSelector();
}); 