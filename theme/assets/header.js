// Function to update group heights
function updateGroupHeights() {
  // Update header group height
  const headerGroup = document.querySelector('.header-group');
  if (headerGroup) {
    const headerHeight = headerGroup.offsetHeight;
    document.documentElement.style.setProperty('--header-group-height', `${headerHeight}px`);
  }

  // Update header height (desktop)
  const headerNav = document.querySelector('.topbar__nav-space');
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
const headerGroup = document.querySelector('.header-group');
const headerNav = document.querySelector('.topbar__nav-space');
const mobileSidebar = document.querySelector('.sidebar');

if (headerGroup) observer.observe(headerGroup);
if (headerNav) observer.observe(headerNav);
if (mobileSidebar) observer.observe(mobileSidebar);

class LanguageSelector {
  constructor() {
    // Initialize both forms
    this.forms = {
      sidebar: document.getElementById('sidebar-language-form'),
      topbar: document.getElementById('topbar-language-form')
    };
    
    // Set up event listeners for both forms
    Object.values(this.forms).forEach(form => {
      if (!form) return;
      
      const buttons = form.querySelectorAll('button[data-value]');
      const input = form.querySelector('input[name="language_code"]');
      
      buttons.forEach(button => {
        button.addEventListener('click', (event) => this.handleLanguageSelection(event, form, input));
      });
    });
  }

  handleLanguageSelection(event, form, input) {
    const selectedLanguage = event.currentTarget.getAttribute('data-value');
    if (selectedLanguage === input.value) return; // Don't submit if same language
    
    // Update both forms' inputs
    Object.values(this.forms).forEach(f => {
      const formInput = f.querySelector('input[name="language_code"]');
      formInput.value = selectedLanguage;
    });
    
    // Submit the form that was clicked
    form.submit();
  }
}

// Initialize language selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSelector();
}); 