$(function () {

    function getX() {
        let x = $("input[name='x-value']").val();
        let regex = /^[+-]?[0-9]{1,10}([.]?[0-9]{1,10})?$/;
        if (x.match(regex)) {
            return parseFloat(x);
        } else {
            return NaN;
        }
    }

    function getY() {
        if ($("input[type='radio']").is(":checked")) {
            return parseFloat($("input[type='radio']:checked").val());
        } else {
            return NaN;
        }
    }

    function getR() {
        if ($("#r-buttons").hasClass("ready")) {
            return parseFloat($("button[type='button'].selected-r").val());
        } else {
            return NaN;
        }
    }

    function validateX() {
        let x = getX();
        const MIN_X = -5;
        const MAX_X = 3;
        if (x > MIN_X && x < MAX_X) {
            $("input[type='text']").removeClass('text-error');
            return true;
        } else {
            $("input[type='text']").addClass('text-error');
            return false;
        }
    }

    function validateY() {
        if ($("input[type='radio']").is(":checked")) {
            $(".radio-block").removeClass("radio-error");
            return true;
        } else {
            $(".radio-block").addClass("radio-error");
            return false;
        }
    }

    function validateR() {
        let ready = $("#r-buttons").hasClass("ready");
        if (!ready) {
            $("#r-buttons").addClass("buttons-error");
        } else {
            $("#r-buttons").removeClass("buttons-error");
        }
        return ready;
    }

    function validateData() {
        let x = validateX();
        let y = validateY();
        let r = validateR();
        return x && y && r;
    }

    $("button[type='button']").click(function () {
        if ($(this).hasClass("selected-r")) {
            $(this).removeClass("selected-r");
            $("#r-buttons").removeClass("ready");
        } else {
            $(this).addClass("selected-r");
            $(this).siblings("button.selected-r").removeClass("selected-r");
            $("#r-buttons").addClass("ready");
        }
    });

    $("button[type='reset']").click(function () {
        if ($("button[type='button']").hasClass("selected-r")) {
            $("button[type='button']").removeClass("selected-r");
            $("#r-buttons").removeClass("ready");
        }
        clearTable();
    })

    function clearTable() {
        $.ajax({
            url: "controller",
            type: "POST",
            data: {clear: "true"},
            success: function () {
                window.location.href = '/web2-1.0-SNAPSHOT/index.jsp';
            }
        });
    }

    $("form").submit(function (event) {
        event.preventDefault();
        if (validateData()) {
            $.ajax({
                url: "controller",
                type: "POST",
                data: {x: getX(), y: getY(), r: getR()},
                success: function () {
                    window.location.href = '/web2-1.0-SNAPSHOT/index.jsp';
                }
            });
        }
    })

});
