(() => {
    const mobileQuery = window.matchMedia('(max-width: 991px)');
    const navbar = document.querySelector('.site-navbar');
    const toggler = navbar?.querySelector('.navbar-toggler');
    const collapse = navbar?.querySelector('.navbar-collapse');

    if (!navbar || !toggler || !collapse) {
        return;
    }

    navbar.addEventListener('pointerenter', () => {
        if (!mobileQuery.matches) {
            return;
        }
        navbar.classList.add('mobile-nav-hover-open');
        toggler.setAttribute('aria-expanded', 'true');
    });

    navbar.addEventListener('pointerleave', () => {
        if (!mobileQuery.matches) {
            return;
        }
        navbar.classList.remove('mobile-nav-hover-open');
        toggler.setAttribute('aria-expanded', 'false');
    });

    toggler.addEventListener('click', (event) => {
        if (mobileQuery.matches) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    mobileQuery.addEventListener('change', () => {
        if (!mobileQuery.matches) {
            navbar.classList.remove('mobile-nav-hover-open');
            toggler.setAttribute('aria-expanded', 'false');
        }
    });
})();
