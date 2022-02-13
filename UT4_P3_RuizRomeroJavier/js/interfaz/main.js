$(function () {





    //Arrow top scroll
    let arrow = $('<i class="fas fa-arrow-circle-up display-3"></i>');
    arrow.css({
        position: "fixed",
        right: "0.5em",
        bottom: "0.5em",
        color: "orange",
        cursor: "pointer"
    })
    arrow.click((event) => {
        window.scroll(0, 0);
    })
    $("body").append(arrow);
})