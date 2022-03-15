
let banners = $(".contrast");
let contrastCont = $("#contrastSwitch");


contrastCont.change(function () {
    (contrastCont[0].checked) ? toContrast() : toColors();
    window.scroll(0, 0);
});

function toContrast() {
    banners.css({
        backgroundColor: "black",
        backgroundImage: "none",
        color: "white"
    });
}

function toColors() {
    $(banners[0]).css({
        backgroundImage: "url('../img/webresources/cat-banner.jpg')"
    });
    $(banners[1]).css({
        backgroundColor: "rgb(238, 238, 28)",
        color: "black"
    });
    $(banners[2]).css({
        backgroundColor: "rgb(65, 216, 216)",
        color: "black"
    });
    $(banners[3]).css({
        backgroundColor: "rgb(91, 174, 64)",
        color: "black"
    });
}