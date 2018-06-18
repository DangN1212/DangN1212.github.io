 function setWidthSlideLogo() {
     var wSlide = 0,
         slideLogo = $('.slide_logo');
     $('.list01').clone().appendTo('.slide_logo');
     $('.slide_logo p').each(function() {
         wSlide += $(this).width() + 20;
     });
     slideLogo.width(wSlide);
     $('.list01').width(wSlide / 2);
 }

 function initialization() {
     var slideLogo = $('.slider').bxSlider({
         pager: false,
         controls: false,
         minSlides: 1,
         maxSlides: 1,
         auto: true,
         slideWidth: 509,
         touchEnabled: false
     });
     $('.group_form').bxSlider({
         pager: false,
         slideMargin: 10,
         minSlides: 1,
         maxSlides: 1,
         slideWidth: 425,
         preventDefaultSwipeY: true,
         nextSelector: '#slider-next',
         prevSelector: '#slider-prev',
         nextText: 'Tiếp theo',
         prevText: 'Trở về',
         infiniteLoop: false,
         hideControlOnEnd: true,
         onSlideAfter: function($slideElement, oldIndex, newIndex) {
             $slideElement.find('textarea,input[type="text"]:nth-child(1)').focus();
         }
     });

 }
 $(window).scroll(function() {
     ready_checkPos();
 });
 $(document).ready(function() {
     $('.banner').addClass('show_animation');
     initialization();
     setWidthSlideLogo();

     $('#form_contact').submit(function() {

         $.ajax({
             url: 'test.php',
             type: 'POST',
             data: {
                 user: $('.userName').val(),
                 comp: $('.comp').val(),
                 mail: $('.mail').val(),
                 phone: $('.phone').val()
             },
             success: function(result) {
                 var object = jQuery.parseJSON(result);
                 var str = '';

                 if (object.error) {
                     $.each(object.error, function(key, value) {
                         str += '\n' + value;
                     });
                     alert(str);
                 } else if (object.success) {
                     $('.box_success').fadeIn();
                     $('.overlay_sc').fadeIn();
                 }


             }
         });

         return false;
     });
     $('.overlay_sc').on('click', function() {
         $('.box_success').fadeOut();
         $('.overlay_sc').fadeOut();
         console.log(1);
     });
     $('.navi_top').on('click', 'a', function() {
         var offsetE = $('#' + $(this).attr('data-index')).offset().top - 74;
         $('html,body').animate({
             scrollTop: offsetE
         });
     });
     $('.btn_contact').click(function() {
         $('html,body').animate({
             scrollTop: $('#contactus').offset().top - 74
         });
     });
     $('.form01').on('click', '.radio_label', function() {
         if (!$(this).hasClass('clicked')) {
             $(this).closest('.form01').find('.radio_label').not($(this)).removeClass('clicked');
             $(this).addClass('clicked');
             $(this).closest('.form01').find('input').attr('checked', false);
             $(this).closest('.form01').find('input[value=' + $(this).attr("data-input") + ']').attr('checked', true);
         }
     });
     $('.form04').on('click', '.radio_label', function() {
         if (!$(this).hasClass('clicked')) {
             $(this).closest('.form04').find('.radio_label').not($(this)).removeClass('clicked');
             $(this).addClass('clicked');
             $(this).closest('.form04').find('input').attr('checked', false);
             $(this).closest('.form04').find('input[value=' + $(this).attr("data-input") + ']').attr('checked', true);
         }
     });
     $('.form05').on('click', '.radio_label', function() {
         if (!$(this).hasClass('clicked')) {
             $(this).closest('.form05').find('.radio_label').not($(this)).removeClass('clicked');
             $(this).addClass('clicked');
             $(this).closest('.form05').find('input').attr('checked', false);
             $(this).closest('.form05').find('input[value=' + $(this).attr("data-input") + ']').attr('checked', true);
         }
     });

     /*Mobile*/
     if ($(window).width() < 769) {
         $('.banner').css('margin-top', $('#header').height());
         $('.hambuger_btn').click(function() {
             $(this).toggleClass('clicked');
             $('.navi_top').stop().slideToggle(function() {
                 $('.overlay').stop().fadeToggle();
             });
         });
         $('.overlay').click(function() {
             $('.hambuger_btn').removeClass('clicked');
             $('.navi_top').slideUp();
             $(this).fadeOut();
         });
         $('.navi_top li').click(function() {
             $('.hambuger_btn').toggleClass('clicked');
             $('.navi_top').stop().slideToggle(function() {
                 $('.overlay').stop().fadeToggle();
             });
         });
     }


 });
 window.onbeforeunload = function() {
     window.scrollTo(0, 0);
 }