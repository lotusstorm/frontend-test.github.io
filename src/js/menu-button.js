const menuButton = doc.getElementById('menu-button'); // eslint-disable-line

menuButton.addEventListener('click', (event) => {
    const menu = doc.getElementById('menu'); // eslint-disable-line
    const menuWrapper = doc.getElementById('menu__wrapper'); // eslint-disable-line
    const menuStyle = menu.style;
    const ev = event.target;

    if(!ev.checked) {
        menuWrapper.style.left = '0';
        menuStyle.zIndex = '4';
        menuStyle.width = '100%';
        menuStyle.backgroundColor = 'rgba(31, 34, 41, .5)';

        ev.classList.remove('menu-button_invisible');
        ev.classList.add('menu-button_visible');
    }else {
        menuWrapper.style.left = '-50%';
        menuStyle.zIndex = '0';
        menuStyle.width = '0';
        menuStyle.backgroundColor = 'rgba(31, 34, 41, .0)';

        ev.classList.remove('menu-button_visible');
        ev.classList.add('menu-button_invisible');
    }
});
