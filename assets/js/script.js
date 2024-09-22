function menu_show() {
    let menu_mobile = document.querySelector('.menu-mobile');
    let icon = document.querySelector('.nes-icon');
    
    if(menu_mobile.classList.contains('open')){
        menu_mobile.classList.remove('open');
        icon.classList.remove('times');
        icon.classList.add('bars');
    } else {
        menu_mobile.classList.add('open');
        icon.classList.remove('bars');
        icon.classList.add('times');
    }
}