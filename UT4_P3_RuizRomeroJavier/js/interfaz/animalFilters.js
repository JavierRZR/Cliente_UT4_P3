
$(function () {

    function init() {
        for (let i = 0; i < dogs.length; i++) {
            animals.forEach(elem => {
                createCard(elem[i]);
            })
        }
    }
    init();

    function createCard(animal) {
        let postElement = $(`
        <div class="card ms-5 mb-5" style="width: 13rem;">
            <img src="../img/animals/${animal.img[0]}" class="card-img-top" alt="${animal.name}">
            <div class="card-body">
                <h5 class="card-title">${animal.name}</h5>
                <a href="../html/infoanimal.html?id=${animal.name}" target="blank" class="stretched-link fw-light fs-6 text-muted">Conóceme!</a>
            </div>
        </div>`)
        $("#animals").append(postElement);
    }


    //TODO realizar filtro
})