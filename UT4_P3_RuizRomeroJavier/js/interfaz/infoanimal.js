
$(function () {
    let general = $("#infAnimal");
    let carousel = $("#infAnimalCarousel");
    let description = $("#infAnimalDesc");
    let animal = window.location.search.split("=")[1];
    let soul = dogs.find((elem) => elem.name == animal);
    if (!soul) soul = cats.find(elem => elem.name == animal);

    if (soul) {
        generateCarousel(soul);
        generateData(soul);
    } else {
        general.empty();
        general.append(`
            <h1 class="mt-5 display-1 text-center">ERROR</h1>
            <h5 class="mb-5 display-5 text-center">No se ha econtrado al animal</h5>
        `)
    }

    $("main nav .active").text(soul.name);

    function generateCarousel(soul) {
        let active = "active";
        for (let i = 0; i < soul.img.length; i++) {
            carousel.append(`
            <div class="carousel-item ${active}">
                <img src="../img/animals/${soul.img[i]}" class="d-block w-100" alt="${soul.name + " " + i}">
            </div>
            `);
            active = "";
        }
    }

    function generateData(soul) {
        description.append(`
            <h1>${soul.name}</h1>
            <h5 class="text-muted">${soul.breed}</h5>
            <p>Genero: <span class="text-muted">${soul.gender}</span> <span class="h3">|</span> Tamaño: <span class="text-muted">${soul.size}</span></p>
            <p class="mb-5">${soul.description}</p>
            <a href="${soul.link}" target="blank">Más información. Ven a verme!</a>
        `)
    }

    carousel.find(".carousel-item").hover(
        function (event) {
            $(this).css({
                transform: "scale(1.5)"
            });
        }, function (event) {
            $(this).css({
                transform: "scale(1)"
            });
        }
    );

    carousel.find("img").click(function (event) {
        event.preventDefault;
        this.webkitRequestFullScreen();   
    })
})


