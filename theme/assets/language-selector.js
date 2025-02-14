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