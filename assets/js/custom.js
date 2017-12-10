jQuery(document).ready(function($) {
    "use strict";
    // PrettyPhoto Script
    $('a[data-rel]').each(function() {
        $(this).attr('rel', $(this).data('rel'));
        $(".pretty-gallery a[rel^='prettyPhoto']").prettyPhoto();
    });

    if ($('.gallery').length) {
        $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({
            animation_speed: 'normal',
            theme: 'light_square',
            slideshow: 3000,
            autoplay_slideshow: true
        });
        $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({
            animation_speed: 'fast',
            slideshow: 10000,
            hideflash: true
        });
    }

    //Side Bar Menu Js
    if ($('#cp_side-menu-btn, #cp-close-btn').length) {
        $('#cp_side-menu-btn, #cp-close-btn').on('click', function(e) {
            var $navigacia = $('body, #cp_side-menu'),
                val = $navigacia.css('right') === '410px' ? '0px' : '410px';
            $navigacia.animate({
                right: val
            }, 410)
        });
    }

    //SCROLL FOR SIDEBAR NAVIGATION
    if ($('#content-1').length) {
        $("#content-1").mCustomScrollbar({
            horizontalScroll: false
        });
        $(".content.inner").mCustomScrollbar({
            scrollButtons: {
                enable: true
            }
        });
    }


    // Home Banner
    if ($('#home-banner').length) {
        $('#home-banner').owlCarousel({
            loop: false,
            dots: false,
            nav: false,
            items: 1,
            autoplay: true,
            smartSpeed: 7000,
            animateIn: 'fadeIn',
            URLhashListener: true,
            autoplayHoverPause: false,
        });
    }

    //HIGHLIGHTS
    if ($('#highlight-fade').length) {
        $('#highlight-fade').owlCarousel({
            loop: false,
            dots: false,
            nav: false,
            items: 1,
            autoplay: true,
            smartSpeed: 7000,
            animateIn: 'fadeIn',
            URLhashListener: true,
            autoplayHoverPause: false,
        });
    }

    //CALL ACTION STYLE 2
    if ($('#call-action-2').length) {
        $('#call-action-2').owlCarousel({
            loop: false,
            dots: true,
            nav: false,
            items: 1,
            autoplay: true,
            smartSpeed: 7000,
            animateIn: 'fadeIn',
            URLhashListener: true,
            autoplayHoverPause: false,
        });
    }

    //Blog Slider
    if ($('#blog-slider').length) {
        $('#blog-slider').owlCarousel({
            loop: false,
            dots: false,
            nav: true,
            items: 1,
            autoplay: true,
            smartSpeed: 7000,
            URLhashListener: true,
            autoplayHoverPause: false,
        });
    }

    //Causes Slider
    if ($('#causes-slider').length) {
        $('#causes-slider').owlCarousel({
            loop: false,
            dots: false,
            nav: true,
            items: 1,
            autoplay: true,
            smartSpeed: 1000,
            URLhashListener: true,
            autoplayHoverPause: false,
        });
    }

    //Departments Slider
    if ($('#department-slider').length) {
        $('#department-slider').owlCarousel({
            loop: false,
            dots: false,
            nav: true,
            items: 1,
            autoplay: true,
            smartSpeed: 1000,
            URLhashListener: true,
            autoplayHoverPause: false,
        });
    }



    //SERVICES SLIDER
    if ($('#services-slider').length) {
        $('#services-slider').owlCarousel({
            loop: true,
            dots: false,
            nav: true,
            navText: '',
            items: 0,
            smartSpeed: 1000,
            padding: 0,
            margin: 30,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                992: {
                    items: 2,
                },
                1199: {
                    items: 4,
                }
            }
        });
    }

    //UPCOMING EVENTS
    if ($('.bxslider').length) {
        $('.bxslider').bxSlider({
            pagerCustom: '#bx-pager'
        });
    }

    //Accordion
    if ($('.accordion_cp').length) {
        $.fn.slideFadeToggle = function(speed, easing, callback) {
            return this.animate({
                opacity: 'toggle',
                height: 'toggle'
            }, speed, easing, callback);
        };
        $('.accordion_cp').accordion({
            defaultOpen: 'section1',
            cookieName: 'nav',
            speed: 'slow',
            animateOpen: function(elem, opts) { //replace the standard slideUp with custom function
                elem.next().stop(true, true).slideFadeToggle(opts.speed);
            },
            animateClose: function(elem, opts) { //replace the standard slideDown with custom function
                elem.next().stop(true, true).slideFadeToggle(opts.speed);
            }
        });
    }

    //COMINGSOON
    if ($('.defaultCountdown').length) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('.defaultCountdown').countdown({
            until: austDay
        });
        $('#year').text(austDay.getFullYear());
    }

    //
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 380,
        itemMargin: 0,
        asNavFor: '#slider'
    });

    $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
    });



    //CONTACT MAP
    if ($('#map_contact_1').length) {
        var map;
        var myLatLng = new google.maps.LatLng(40.712784, -74.005941);
        //Initialize MAP
        var myOptions = {
            zoom: 12,
            center: myLatLng,
            //disableDefaultUI: true,
            zoomControl: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            styles: [{
                stylers: [{
                    hue: '#2b2b2b'
                }, {
                    saturation: -100,
                }, {
                    lightness: 10
                }]
            }],
        }
        map = new google.maps.Map(document.getElementById('map_contact_1'), myOptions);
        //End Initialize MAP
        //Set Marker
        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            icon: 'images/map-icon-2.png'
        });
        marker.getPosition();
        //End marker
    }
    //Function End
});