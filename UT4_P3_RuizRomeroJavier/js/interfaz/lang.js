$(function () {

  let es = {
    nav: {
      index: "Inicio",
      animals: "Animales",
      storehouse: "Almacén",
      info: "Información",
      about: "Sobre nosotros",
      faq: "Preguntas frecuentes",
      map: "Mapa web"
    },
    main: {
      banner: {
        title: "ADOPTA UN ALMA",
        text: "Todos los peludos merecen una vida mejor, una segunda oportunidad. Ellos te lo devuelven con todo su amor"
      },
      banner2: {
        title: "ALMACÉN",
        text: "Visita nuestro almacén de alimentación y complementos"
      },
      banner3: {
        title: "SOBRE NOSOTROS",
        text: "Informate y contacta con nosotros"
      },
      banner4: {
        title: "PREGUNTAS FRECUENTES",
        text: "¿Tienes preguntas?, accede a nuestro banco de respuestas."
      },
      services: {
        title: "NUESTROS SERVICIOS",
        text: "Estamos en constante investigación sobre como mejorar la vida de nuestros amigos peludos, darles la posibilidad de encontrar una familia cariñosa con la que compartir su amor. Además podemos proveer a nuestros clientes con productos para cuidar cualquier aspecto de los animales. Visita nuestra Almacén para encontrar cualquier cosa que necesites!."
      }
    },
    icons: {
      adopt: "Adopta",
      donate: "Dona",
      storehouse: "Almacén"
    }
  }

  let en = {
    nav: {
      index: "Index",
      animals: "Animals",
      storehouse: "StoreHouse",
      info: "Information",
      about: "About Us",
      faq: "F.A.Q.",
      map: "Web Map"
    },
    main: {
      banner: {
        title: "ADOPT LOVELY SOULS",
        text: "Every furry deserves a better life, a secons chance. They return it with all their love."
      },
      banner2: {
        title: "STOREHOUSE",
        text: "Visit our food store and complements."
      },
      banner3: {
        title: "ABOUT US",
        text: "Contact with us."
      },
      banner4: {
        title: "F.A.Q.",
        text: "Any questions? Get access to out questions bank."
      },
      services: {
        title: "OUR SERVICES",
        text: "We are constantly researching how to improve the lives of our furry friends, giving them the chance to find a loving family with whom to share their love. We can also provide our customers with products to take care of any aspect of the animals. Visit our Warehouse to find anything you need!."
      }
    },
    icons: {
      adopt: "Adopt",
      donate: "Donate",
      storehouse: "Store"
    }
  }


  let translations = $(".translate");
  let langCont = $("#langSwitch");


  langCont.change(function () {
    (langCont[0].checked) ? toEnglish() : toSpanish();
    window.scroll(0, 0);
  });


  function toEnglish() {
    //Nav

    translations[0].text = en.nav.index;
    translations[1].text = en.nav.animals;
    translations[2].text = en.nav.storehouse;
    translations[3].text = en.nav.info;
    translations[4].text = en.nav.about;
    translations[5].text = en.nav.faq;
    translations[6].text = en.nav.map;

    //Main
    translations[7].innerText = en.main.banner.title;
    translations[8].innerText = en.main.banner.text;
    translations[9].innerText = en.main.banner2.title;
    translations[10].innerText = en.main.banner2.text;
    translations[11].innerText = en.main.banner3.title;
    translations[12].innerText = en.main.banner3.text;
    translations[13].innerText = en.main.banner4.title;
    translations[14].innerText = en.main.banner4.text;

    translations[15].innerText = en.main.services.title;
    translations[16].innerText = en.main.services.text;

    translations[17].innerText = en.icons.adopt;
    translations[18].innerText = en.icons.donate;
    translations[19].innerText = en.icons.storehouse;

    translations[20].innerText = "Pages";
    translations[21].innerText = en.nav.index;
    translations[22].innerText = en.nav.animals;
    translations[23].innerText = en.nav.storehouse;
    translations[24].innerText = en.nav.info;
    translations[25].innerText = en.nav.about;
    translations[26].innerText = en.nav.faq;
    translations[27].innerText = en.nav.map;
  }

  function toSpanish() {
    //Nav

    translations[0].text = es.nav.index;
    translations[1].text = es.nav.animals;
    translations[2].text = es.nav.storehouse;
    translations[3].text = es.nav.info;
    translations[4].text = es.nav.about;
    translations[5].text = es.nav.faq;
    translations[6].text = es.nav.map;

    //Main
    translations[7].innerText = es.main.banner.title;
    translations[8].innerText = es.main.banner.text;
    translations[9].innerText = es.main.banner2.title;
    translations[10].innerText = es.main.banner2.text;
    translations[11].innerText = es.main.banner3.title;
    translations[12].innerText = es.main.banner3.text;
    translations[13].innerText = es.main.banner4.title;
    translations[14].innerText = es.main.banner4.text;

    translations[15].innerText = es.main.services.title;
    translations[16].innerText = es.main.services.text;

    translations[17].innerText = es.icons.adopt;
    translations[18].innerText = es.icons.donate;
    translations[19].innerText = es.icons.storehouse;

    translations[20].innerText = "Páginas";
    translations[21].innerText = es.nav.index;
    translations[22].innerText = es.nav.animals;
    translations[23].innerText = es.nav.storehouse;
    translations[24].innerText = es.nav.info;
    translations[25].innerText = es.nav.about;
    translations[26].innerText = es.nav.faq;
    translations[27].innerText = es.nav.map;
  }

})