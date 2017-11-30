const menu = doc.getElementById('menu'); // eslint-disable-line

menu.addEventListener('click', (event) => {
    const menuLink = doc.getElementsByTagName('A'); // eslint-disable-line

    for(let i = 0; i < menuLink.length; i++){
        menuLink[i].classList.remove(`${event.target.className}_active`);
    }
    event.target.classList.add(`${event.target.className}_active`);
});
