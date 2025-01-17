document.addEventListener('DOMContentLoaded', function() {
  // Find all anchor tags that start with #_
  const styleHooks = document.querySelectorAll('a[href^="#_"]');
  
  // Set ARIA attributes for each hook
  styleHooks.forEach(hook => {
    hook.setAttribute('aria-hidden', 'true');
    hook.setAttribute('tabindex', '-1');
    hook.setAttribute('role', 'presentation');
  });
}); 