const menu = doc.getElementById('menu'); // eslint-disable-line

menu.addEventListener('click', (event) => {
    const menuLink = doc.getElementsByTagName('A'); // eslint-disable-line
    const ev = event.target;
    if (ev.className == 'menu__link' || ev.className == 'nav__link') { 
        for(let i = 0; i < menuLink.length; i++){
            menuLink[i].classList.remove(`${ev.className}_active`);
        }
        ev.classList.add(`${ev.className}_active`);
    }
});
