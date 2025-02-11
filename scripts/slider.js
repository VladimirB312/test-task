document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.reviews__slider', {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 48,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    })

    const slides = document.querySelectorAll('.swiper-slide')
    slides.forEach(slide => {
        slide.style.display = 'flex'
    })
})