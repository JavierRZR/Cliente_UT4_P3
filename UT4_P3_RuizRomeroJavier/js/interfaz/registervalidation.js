$(function () {

    let paypal = $("#paypal");
    let tarjeta = $("#tarjeta");
    $('input:radio').change(function () {
        paypal.toggleClass("d-none");
        tarjeta.toggleClass("d-none");
    });

    let form = document.forms.registerForm;
    form
    let inputs = $(form).find("input, select");
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        event.stopPropagation();

        let validated = true;
        let errorInput = null;

        for (const it of inputs) {
            if (!it.checkValidity()) {
                validated = false;
                $(it).addClass("--invalid");
                $(it).removeClass("--valid");
                $(it).parent().find(".--invalid").removeClass("d-none");
                $(it).parent().find(".--valid").addClass("d-none");
            } else {
                $(it).addClass("--valid");
                $(it).removeClass("--invalid");
                $(it).parent().find(".--invalid").addClass("d-none");
                $(it).parent().find(".--valid").removeClass("d-none");
            }
        }


        if (!validated) {
            $("#formErrorMsg").addClass("d-none");
            $(errorInput).focus();
        } else {
            $("#formErrorMsg").removeClass("d-none");
            document.getElementById("btnmodalregister").click();
            form.reset();
            for (const it of inputs) {
                $(it).removeClass("--invalid");
                $(it).removeClass("--valid");
                $(it).parent().find(".--invalid").addClass("d-none");
                $(it).parent().find(".--valid").addClass("d-none");
            }
        }
    })

    $("#btnmodalregister").click(function () {
        setTimeout(function () {
            $('#modalRegister').modal('toggle');
        }, 2000);
    });


    for (const it of form.querySelectorAll('input')) {
        it.addEventListener("beforeinput", function (event) {
            if (!this.checkValidity()) {
                $(this).addClass("--invalid");
                $(this).removeClass("--valid");
                $(this).parent().find(".--invalid").removeClass("d-none");
                $(this).parent().find(".--valid").addClass("d-none");
            } else {
                $(this).addClass("--valid");
                $(this).removeClass("--invalid");
                $(this).parent().find(".--invalid").addClass("d-none");
                $(this).parent().find(".--valid").removeClass("d-none");
            }
        })
    }

    for (const it of inputs) {
        $(it).change(function (event) {
            if (!this.checkValidity()) {
                $(this).addClass("--invalid");
                $(this).removeClass("--valid");
                $(this).parent().find(".--invalid").removeClass("d-none");
                $(this).parent().find(".--valid").addClass("d-none");
            } else {
                $(this).addClass("--valid");
                $(this).removeClass("--invalid");
                $(this).parent().find(".--invalid").addClass("d-none");
                $(this).parent().find(".--valid").removeClass("d-none");
            }
        });
    }


    $("#ipass2").change(function (event) {
        if ($(this).val() != $("#ipass").val()) {
            $(this).addClass("--invalid");
            $(this).removeClass("--valid");
            $(this).parent().find(".--invalid").removeClass("d-none");
            $(this).parent().find(".--valid").addClass("d-none");
        } else {
            $(this).addClass("--valid");
            $(this).removeClass("--invalid");
            $(this).parent().find(".--invalid").addClass("d-none");
            $(this).parent().find(".--valid").removeClass("d-none");
        }
    })

});