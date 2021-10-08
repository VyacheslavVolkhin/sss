$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};

	//popup block
	$('.js-popup-wrap .js-btn-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('menu-show');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('main-catalog-wrap')) {
				$('body').addClass('menu-show');
			}
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
		$('body').removeClass('menu-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
	    $('body').removeClass('menu-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			// alert(1)
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
		return false;
	})


    //mobile catalog menu
    $('.btn-catalog-back').on('click', function() {
        $('.main-catalog-wrap .catalog-submenu-active').removeClass('catalog-submenu-active');
        $('body').removeClass('catalog-submenu-active');
        return false;
    })
    $('.btn-catalog-close').on('click', function() {
        $('.main-catalog-wrap .catalog-submenu-active').removeClass('catalog-submenu-active');
        $('body').removeClass('catalog-submenu-active');
        $('body').removeClass('catalog-active');
        $('body').removeClass('menu-show');
        return false;
    })
    $('.btn-catalog-open').on('click', function() {
        $('body').addClass('catalog-active');
        $('body').addClass('menu-show');
        return false;
    })
    $('.main-catalog-wrap li').each(function() {
        if ($(this).children('ul').length>0) {
            $(this).addClass('submenu');
        }
    })
    $('.main-catalog-wrap .btn-catalog-toggle').on('click', function() {
        if ($('body').hasClass('catalog-active')) {
            $('body').removeClass('catalog-active');
        } else {
            $('body').addClass('catalog-active');
        }
        return false;
    })
    $('.main-catalog-wrap .catalog-menu-wrap>ul>li>a').on('click', function() {
        if ($(window).innerWidth() < 768) {
            if ($(this).next('ul').length>0) {
                $(this).parent('li').addClass('catalog-submenu-active');
                $('body').addClass('catalog-submenu-active');
                return false;
            }
        }
    })
    $('.main-catalog-wrap .catalog-menu-wrap>ul>li>ul>li>a').on('click', function() {
        if ($(this).next('ul').length>0) {
            $(this).parent().toggleClass('open');
            return false;
        }
    })


    if (!!$('.js-fixed-box').offset()) {
        var stickyTop = $('.js-fixed-box').offset().top;
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop() + 20;
            if (stickyTop < windowTop) {
                $('.wrap').addClass('fixed-active');
            } else {
                $('.wrap').removeClass('fixed-active');
            }
        });
    }
    
    
	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tab-title').each(function() {
		if ($(this).hasClass('active')) {
			$(this).next('.js-tab-content').show(0);
		}
	})
	$('.js-tabs-nav li a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	$('.js-tab-title').on('click' , function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.js-tab-content').slideUp(200);
		} else {
			$(this).addClass('active').next('.js-tab-content').slideDown(200);
		}
	})

    //frm counter
    $('.js-counter').each(function() {
        if ($(this).find('.js-input-counter').val() == 1) {
            $(this).find('.js-button-counter-minus').addClass('button-disabled');
        }
    })
    $('.js-counter .js-button-counter-minus').on('click', function () {
        var cnt = $(this).parents('.js-counter').find('.js-input-counter').val();
        cnt = parseInt(cnt);
        if (cnt > 1) {
            $(this).parents('.js-counter').find('.js-input-counter').val(cnt - 1);
        }
        if (cnt === 2) {
            $(this).addClass('button-disabled');
        } else {
            $(this).removeClass('button-disabled');
        }
        return false;
    })
    $('.js-counter .js-button-counter-plus').on('click', function () {
        var cnt = $(this).parents('.js-counter').find('.js-input-counter').val();
        $(this).parents('.js-counter').find('.js-input-counter').val(cnt - 1 + 2);

        if (cnt > 0) {
            $(this).parent().find('.js-button-counter-minus').removeClass('button-disabled');
        } else {
            $(this).parent().find('.js-button-counter-minus').addClass('button-disabled');
        }
        return false;
    })
    
    //help
    $('.elm-help[title]').tooltip();
	
	//text toggle
    $('.js-text-toggle').on('click', function() {
        $(this).parents('.text-toggle-box').toggleClass('active');
        return false;
    })

    //orders toggle
    $('.item-total-row.row-toggle .row-title').on('click', function() {
        $(this).parent().toggleClass('active');
        return false;
    })


    //frm-select content
    let dataContent;
    $('.frm-select-content').each(function() {
        $(this).removeClass('active');
    })
    $('.frm-select[data-select-content]').each(function() {
        if ($(this).children('input').is(':checked')) {
            dataContent = $(this).attr('data-select-content');
            $('.frm-select-content[data-select-content='+dataContent+']').addClass('active');
        }
    })
    $('.frm-select[data-select-content] input').on('click', function() {
        $('.frm-select-content').each(function() {
            $(this).removeClass('active');
        })
        $('.frm-select[data-select-content]').each(function() {
            if ($(this).children('input').is(':checked')) {
                dataContent = $(this).attr('data-select-content');
                $('.frm-select-content[data-select-content='+dataContent+']').addClass('active');
            }
        })
    })


    //compare slider
    let cmpD = 0;
    let cmpL = 0;
    let cmpLeft = 0;
    $('.compare-slider-box .ico-arrow-next').on('click', function() {
        cmpD = $('.tbl-items-wrap th:first').outerWidth();
        cmpL = $('.tbl-items-wrap .tbl-inner-wrap').css('left');
        cmpLeft = parseInt(cmpL)  - parseInt(cmpD);
        $('.tbl-inner-wrap').css('left', cmpLeft);
        return false;
    })
    $('.compare-slider-box .ico-arrow-prev').on('click', function() {
        cmpD = $('.tbl-items-wrap th:first').outerWidth();
        cmpL = $('.tbl-items-wrap .tbl-inner-wrap').css('left');
        cmpLeft = parseInt(cmpL)  + parseInt(cmpD);
        $('.tbl-inner-wrap').css('left', cmpLeft);
        return false;
    })
    if ($('.compare-slider-box').length>0) {
        let compareTimer = setInterval(function() {
            if (($('.tbl-items-wrap').offset().left + $('.tbl-items-wrap').outerWidth()) > ($('.tbl-items-wrap .tbl-inner-wrap table').offset().left + $('.tbl-items-wrap .tbl-inner-wrap table').outerWidth())) {
                $('.compare-slider-box .ico-arrow-next').addClass('button-disabled');
            } else {
                $('.compare-slider-box .ico-arrow-next').removeClass('button-disabled');
            }
            if (($('.tbl-items-wrap').offset().left) < ($('.tbl-items-wrap .tbl-inner-wrap table').offset().left + 10)) {
                $('.compare-slider-box .ico-arrow-prev').addClass('button-disabled');
            } else {
                $('.compare-slider-box .ico-arrow-prev').removeClass('button-disabled');
            }
        }, 200)
    }
    $('.tbl-items-wrap .tbl-inner-wrap').on('scroll', function() {
        $('.tbl-features-wrap .tbl-inner-wrap').scrollLeft($(this).scrollLeft());
    })
    $('.tbl-features-wrap .tbl-inner-wrap').on('scroll', function() {
        $('.tbl-items-wrap .tbl-inner-wrap').scrollLeft($(this).scrollLeft());
    })

    //lk menu
    $('.js-lk-menu-toggle').on('click', function() {
        if ($('body').hasClass('lk-menu-active')) {
            $('body').removeClass('lk-menu-active');
        } else {
            $('body').removeClass('lk-menu-active');
        }
        return false;
    })


    //button up scroll
    $(".js-btn-up").click(function () {
        $("html,body").animate({scrollTop: 0}, "slow");
        return false;
    })

    //btn tgl
    $('.js-btn-tgl').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })
    
    
    //filter toggle
    $('.js-filter-open').on('click', function() {
        $('.wrap').addClass('filter-showed');
        return false;
    })
    $('.js-filter-close').on('click', function() {
        $('.wrap').removeClass('filter-showed');
        return false;
    })

    //main-slider-box
    $('.main-slider-box .slider').slick({
        dots: true,
        slidesToShow: 1,
        variableWidth: false,
        prevArrow: false,
        nextArrow: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    variableWidth: true,
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    variableWidth: true,
                    dots: false,
                }
            },
        ]
    });

    //catalog-slider-box
    $('.catalog-slider-box:not(.slider-inner):not(.slider-fav) .slider').slick({
        dots: false,
        slidesToShow: 6,
        variableWidth: false,
        prevArrow: '<span class="btn-action-ico button-nav ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico button-nav ico-arrow ico-arrow-next"></span>',
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    variableWidth: true,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
        ]
    });

    //catalog-slider-box
    $('.catalog-slider-box.slider-inner .slider').slick({
        dots: false,
        slidesToShow: 4,
        variableWidth: false,
        prevArrow: '<span class="btn-action-ico button-nav ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico button-nav ico-arrow ico-arrow-next"></span>',
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    variableWidth: true,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
        ]
    });

    //catalog-slider-box
    $('.catalog-slider-box.slider-fav .slider').slick({
        dots: false,
        slidesToShow: 4,
        variableWidth: false,
        prevArrow: '<span class="btn-action-ico button-nav ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico button-nav ico-arrow ico-arrow-next"></span>',
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    variableWidth: true,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
        ]
    });

    //services-slider-box
    $('.services-slider-box .slider').slick({
        dots: false,
        slidesToShow: 6,
        variableWidth: false,
        infinite: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    variableWidth: true,
                    dots: true
                }
            },
        ]
    });


    //card slider
    $('.photos-slider-box .slider-wrap .slider').slick({
        dots: false,
        slidesToShow: 1,
        infinite: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                }
            },
        ]
    });
    $('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
        $('.photos-slider-box .slider-preview-wrap .item-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
    });
    $('.photos-slider-box .slider-preview-wrap .slider').slick({
        dots: false,
        slidesToShow: 4,
        vertical: false,
        infinite: true,
        prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
        nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
    });
    $('.photos-slider-box .slider-preview-wrap .slider .item-photo').click(function () {
        let newSlide = $(this).attr('data-slide');
        $('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
        return false;
    })
    $('.photos-slider-box .slider-preview-wrap .slider .item-photo').click(function () {
        let newSlide = $(this).attr('data-slide');
        $('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
        $(this).parent().addClass('active');
        $('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
        return false;
    })
    
    
    //range slider
    $('#range-slider').slider({
        range: true,
        min: 0,
        max: 120000,
        values: [0, 70000],
        slide: function (event, ui) {
            $('#range-min').val(ui.values[0]);
            $('#range-max').val(ui.values[1]);
        }
    })
    $('#range-min').val($('#range-slider').slider('values', 0));
    $('#range-max').val($('#range-slider').slider('values', 1));
    $('#range-min').bind('focusout', function () {
        if ($(this).val() > $('#range-slider').slider('values', 1)) {
            $(this).val($('#range-slider').slider('values', 0));
        }
        $('#range-slider').slider('values', 0, $(this).val());
    })
    $('#range-max').bind('focusout', function () {
        if ($(this).val() < $('#range-slider').slider('values', 0)) {
            $(this).val($('#range-slider').slider('values', 1));
        }
        $('#range-slider').slider('values', 1, $(this).val());
    })
    $('#range-min').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() > $('#range-slider').slider('values', 1)) {
                $(this).val($('#range-slider').slider('values', 0));
            }
            $('#range-slider').slider('values', 0, $(this).val());
        }
    })
    $('#range-max').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() < $('#range-slider').slider('values', 0)) {
                $(this).val($('#range-slider').slider('values', 1));
            }
            $('#range-slider').slider('values', 1, $(this).val());
        }
    })
    $('#widget').draggable();
	
});