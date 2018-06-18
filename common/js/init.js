$(document).ready(function () {


    if($(window).width()> 768){
        setHeight();
    }
    $('.list_rules').click(function(){
        clickDt($(this));
    });
    //function set same height with elements have class 'js-targetH'
    function setHeight(){
        var ele = $('.js-targetH');
        var maxHeight = 0;
        ele.each(function(){
            var self = $(this);
            if(self.height() > maxHeight){
                maxHeight = self.height();
            }
        });
        ele.height(maxHeight); 
    }

    function clickDt(ele){
        ele.toggleClass('show').find('dd').stop().toggle(400);
    }

    
    // ------------------------------
    // UA
    // ------------------------------

    var window_width  = window.innerWidth;

    agent = navigator.userAgent;
    mobile       = false;
    iPhone       = false; /* iPhone */
    iPad         = false; /* iPad */
    androidphone = false; /* Android Phone only */
    android      = false; /* Android Phone and Tablet */
    OSX          = false; /* Mac OSX */

    if (agent.search(/iPhone/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) { mobile = true } else { mobile = false };
    if (agent.search(/Mac/) != -1)    { OSX    = true };
    if (agent.search(/iPad/) != -1)   { iPad   = true };
    if (agent.search(/iPhone/) != -1) { iPhone = true };
    if (agent.search(/Android/) != -1 && agent.search(/Mobile/) != -1) { androidphone = true };
    if (agent.search(/Android/) != -1 && androidphone == false)        { android      = true };

    // ------------------------------
    // UA機種別に命令したい場合
    // ------------------------------

    /* iPhone */
    if (iPhone == true) {
    }

    /* iPad */
    if (iPad == true) {
      $(window).load(function() {
        $('meta[name=viewport]').attr('content','width=1100px');
      });
    }

    /* Android Phone and Tablet */
    if (android == true) {
    }

    /* Android phone */
    if (androidphone == true) {
    }

    /* MacOS */
    if (OSX == true) {
    }
})
if($(window).width() < 768){
    $('.btnMore').click(function(){
        $('#section_03 .wrap_img .layer').removeAttr('style')
    })
    $(window).on('scroll',function(){
        setFixBackground();
    })
}
//Set background fixed on mobile
function setFixBackground(){
    var valueScroll = $(window).scrollTop();
    var layer02 = $('#section_03 .wrap_img .layer');
    if(valueScroll + $(window).height() >= $('#section_03').offset().top - 250){
        $('.layerFixed').css({'opacity':1});
        }else{
        $('.layerFixed').css({'opacity':0});
        
    }
}