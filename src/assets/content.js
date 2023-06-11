$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },


    }
});

///
// $(() => {
//     $('.img-extra img').click(
//         function () {
//             let imga = $(this).attr('src');
//             $('#img-mains').attr('src', imga);

//         }
//     )
// })
////
$('.img-mains').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    arrows: false,
    draggable: false,
    swipe: false,
    asNavFor: '.img-extra'
});
$('.img-extra').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.img-mains',
    dots: false,
    prevArrow: '',
    nextArrow: '',
    focusOnSelect: true
});