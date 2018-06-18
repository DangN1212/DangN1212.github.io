function ready_checkPos() {
    var classShow = 'show_animation',
        in_ViewTop = $(window).scrollTop() + 74,
        in_ViewBottom = $(window).height() + $(window).scrollTop();

    var checkPos = $('.check_pos');

    checkPos.each(function() {
        if ($(this).offset().top >= in_ViewTop && ($(this).offset().top + $(this).height() / 2) < in_ViewBottom) {
            $(this).addClass(classShow);
        }
    });
}