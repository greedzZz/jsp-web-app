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
            success: function (data) {
                $("table").html(data);
                drawPoints();
            }
        });
    }

    $("form").submit(function (event) {
        event.preventDefault();
        if (validateData()) {
            requestWithArgs(getX(), getY());
        }
    })

    function drawPoints() {
        document.querySelectorAll("circle").forEach(e => e.remove());
        let x, y, r;
        let svg = document.querySelector("svg");
        document.querySelectorAll("table tbody tr").forEach(function (row, index) {
            x = parseFloat(row.cells[0].innerText);
            y = parseFloat(row.cells[1].innerText);
            r = parseFloat(row.cells[2].innerText);
            let absoluteX = 193 + x * 140 / r;
            let absoluteY = 193 - y * 140 / r;
            svg.insertAdjacentHTML('beforeend', `<circle r="4" cx=${absoluteX} cy=${absoluteY} fill="cyan"
                fill-opacity="0.85"></circle>`);
        })
    }

    function requestWithArgs(xArg, yArg) {
        $.ajax({
            url: "controller",
            type: "POST",
            data: {x: xArg, y: yArg, r: getR()},
            success: function (data) {
                $("table").html(data);
                drawPoints();
            }
        });
    }

    $("svg").click(function (e) {
        if ($("#r-buttons").hasClass("ready")) {
            let x = (e.offsetX - 193) * getR() / 140;
            let y = (193 - e.offsetY) * getR() / 140;
            requestWithArgs(x.toFixed(1), y.toFixed(1));
        } else {
            alert("Choose R value.");
        }
    })
});
