document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector('.menu__burger-menu');
    const menuList = document.querySelector('.menu_navigation-wrapper');

    menuButton.addEventListener('click', function() {
        menuList.classList.toggle('active');
        menuButton.classList.toggle('active');
        document.body.classList.toggle('_lock');
    })

    window.addEventListener('resize', function() {
        menuList.classList.remove('active');
        menuButton.classList.remove('active');
        document.body.classList.remove('_lock');
    })
});