const menuButton = doc.getElementById('menu-button'); // eslint-disable-line

menuButton.addEventListener('click', (event) => {
    const menu = doc.querySelector('#menu'); // eslint-disable-line
    const menuWrapper = doc.querySelector('#menu__wrapper'); // eslint-disable-line
    const menuStyle = menu.style;
    const ev = event.target;

    if(!ev.checked) {
        menuWrapper.style.left = '0';
        menuStyle.width = '100%';
    }else {
        menuWrapper.style.left = '';
        menuStyle.width = '';
    }
});
