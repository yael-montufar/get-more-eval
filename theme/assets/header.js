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