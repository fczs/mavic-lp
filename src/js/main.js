$(function () {
    //Init popover
    $('[data-toggle="popover"]').popover({
        placement: function (context, source) {
            var position = $(source).offset().top - $(window).scrollTop();
            return (position < 300) ? "bottom" : "top";
        },
        trigger: "hover",
        html: true
    });

    //Scrolling
    $(window).on('scroll load', function () {
        var $btn = $(".up-btn");
        ($(this).scrollTop() > 500) ? $btn.show() : $btn.hide();
    });

    $('a[href^=#]').on('click', function (e) {
        var target = $(this).attr('href');
        if (target == '#' || target == '#tab1' || target == '#tab2')
            return false;
        if ($(target).length) {
            $('html, body').animate({scrollTop: $(target).offset().top - 50}, 1000);
        }
        e.preventDefault();
    });

    $('.popup').on('click', function () {
       $('#callback-form').find('input[name=action]').val($(this).data('action'));
       $('#modal-callback').modal('show');
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        nav: true,
        navText: ['<span class="sprite-icon icon-arrow-left"></span>', '<span class="sprite-icon icon-arrow-right"></span>'],
        center: true,
        loop: true
    });

    var dot = $('.owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 7) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    $('.video__fade').on('click', function() {
        $(this).fadeOut('slow');
    });

    //Mask phone field
    //$('[name="phone"]').mask("0 000 000 00 00");

    /**
     * Validate forms
     */
    //Add new method for phone number validation
    $.validator.addMethod("phone", function (phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 10 &&
            phone_number.match(/^((8|\+8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{9,10}$/);
    }, "");

    //Delete all messages
    $.validator.messages.required = "";
    var baseErrorMessage = {
        name: {
            maxlength: ""
        },
        phone: {
            phone: ""
        },
        email: {
            email: ""
        }
    };

    var FORM = [
        '#callback-form',
        '.footer_form',
        '.buy__form-form'
    ];

    $.each(FORM, function (index, value) {
        $(value).validate({
            rules: {
                name: {
                    required: true,
                    maxlength: 30
                },
                phone: {
                    required: true
                    //phone: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: baseErrorMessage.name,
                phone: baseErrorMessage.phone,
                email: baseErrorMessage.email
            }
        });
    });

    // Process forms submit
    $(".btn-submit").on('click', function (e) {
        var $form = $(this).parents('form');
        //Break if form is not valid
        if (!$form.valid()) return false;
        //Serialize form input values and...
        var data = $form.serializeArray(),
            formData = new FormData($form[0]);
        //... add them to a new FormData, which is used to post file via ajax
        $.each(data, function (key, input) {
            formData.append(input.name, input.value);
        });

        $.ajax({
            url: "/components/ajax/ajax-mail.php",
            type: 'POST',
            xhr: function () { // custom xhr
                return $.ajaxSettings.xhr();
            },
            success: function (response) {
                if (response != "-1") {
                    $form.find('.form-control').val('');
                    $('.modal').modal('hide');
                    $('#modal-success').modal('show');
                } else {
                    console.log(response);
                }
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }, 'json');

        e.preventDefault();
    });
});