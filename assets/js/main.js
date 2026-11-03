const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const siteHeader = document.querySelector('.site-header');

const updateHeaderHeight = () => {
    if (siteHeader) {
        document.documentElement.style.setProperty(
            '--header-height', `${siteHeader.getBoundingClientRect().height}px`
        );
    }
};

if (menuToggle && navigation) {
    const setMenuOpen = (open) => {
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        updateHeaderHeight();
    };

    setMenuOpen(false);
    menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });
}

if (siteHeader) {
    updateHeaderHeight();
    new ResizeObserver(updateHeaderHeight).observe(siteHeader);
}
