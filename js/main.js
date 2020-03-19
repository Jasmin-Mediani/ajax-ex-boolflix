$(document).ready(function () {

    var apiUrlBase = "https://api.themoviedb.org/3";

    var source = $("#template-hdb-film").html();
    var templateSchedaFilm = Handlebars.compile(source);


    //quando clicco sul bottone, creo una variabile (testoDigitato) che ha il valore digitato nella barra di ricerca. 
    $("#bottone-ricerca").click(function (event) {
        var testoDigitato = $("#barra-ricerca").val().toLowerCase();


        $.ajax({

            url: apiUrlBase + '/search/movie',
            data: {
                api_key: "bf6da085b921b2474703466befcb39eb",
                query: testoDigitato,
                language: "it-IT"
            },
            method: "GET",
            success: function (infoInArrivo) {
                var films = infoInArrivo.results;
                $(".contenitore-titoli").children(".card").remove(); // così resta in vista solo la serie/saga appena cercata

                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var stellePiene = Math.ceil((film.vote_average) / 2) // MEMO: è un numero (arrotondato per eccesso)
                    var infoVisibiliFilm = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        voto: film.vote_average,
                        lingua: /*film.original_language,*/ "",
                        filmId: film.id,
                        copertina: "https://image.tmdb.org/t/p/w185" + film.poster_path, //aggiunto w185 per width immagine
                        stella1: "far fa-star",
                        stella2: "far fa-star",
                        stella3: "far fa-star",
                        stella4: "far fa-star",
                        stella5: "far fa-star",

                        stelle: stellePiene,
                    }


                    switch (film.original_language) {
                        case "en":
                            infoVisibiliFilm.lingua = "/bandiere/united-kingdom-flag-icon-64.png";
                            break;
                        case "it":
                            infoVisibiliFilm.lingua = "/bandiere/italy-flag-icon-64.png";
                            break;
                        case "fr":
                            infoVisibiliFilm.lingua = "/bandiere/france-flag-icon-64.png";
                            break;
                        case "jp":
                            infoVisibiliFilm.lingua = "/bandiere/japan-flag-icon-64.png";
                            break;
                        case "de":
                            infoVisibiliFilm.lingua = "/bandiere/germany-flag-icon-64.png";
                            break;

                        case "cn":
                            infoVisibiliFilm.lingua = "/bandiere/china-flag-icon-64.png";
                            break;

                        case "es":
                            infoVisibiliFilm.lingua = "/bandiere/spain-flag-icon-64.png";
                            break;

                        default:
                    }



                    console.log(infoVisibiliFilm.copertina);

                    // if (stellePiene == 1) {
                    //     infoVisibiliFilm.stella1 = "fas fa-star";
                    // } else if (stellePiene == 2) {
                    //     infoVisibiliFilm.stella1 = "fas fa-star";
                    //     infoVisibiliFilm.stella2 = "fas fa-star";

                    // } else if (stellePiene == 3) {
                    //     infoVisibiliFilm.stella1 = "fas fa-star";
                    //     infoVisibiliFilm.stella2 = "fas fa-star";
                    //     infoVisibiliFilm.stella3 = "fas fa-star";

                    // } else if (stellePiene == 4) {
                    //     infoVisibiliFilm.stella1 = "fas fa-star";
                    //     infoVisibiliFilm.stella2 = "fas fa-star";
                    //     infoVisibiliFilm.stella3 = "fas fa-star";
                    //     infoVisibiliFilm.stella4 = "fas fa-star";

                    // } else if (stellePiene == 5) {
                    //     infoVisibiliFilm.stella1 = "fas fa-star";
                    //     infoVisibiliFilm.stella2 = "fas fa-star";
                    //     infoVisibiliFilm.stella3 = "fas fa-star";
                    //     infoVisibiliFilm.stella4 = "fas fa-star";
                    //     infoVisibiliFilm.stella5 = "fas fa-star";
                    // }

                    /*switch (stellePiene) {
                        case 1:
                            infoVisibiliFilm.stella1 = "fas fa-star";
                            break;
                        case 2:
                            infoVisibiliFilm.stella1 = "fas fa-star";
                            infoVisibiliFilm.stella2 = "fas fa-star";
                            break;
                        case 3:
                            infoVisibiliFilm.stella1 = "fas fa-star";
                            infoVisibiliFilm.stella2 = "fas fa-star";
                            infoVisibiliFilm.stella3 = "fas fa-star";
                            break;
                        case 4:
                            infoVisibiliFilm.stella1 = "fas fa-star";
                            infoVisibiliFilm.stella2 = "fas fa-star";
                            infoVisibiliFilm.stella3 = "fas fa-star";
                            infoVisibiliFilm.stella4 = "fas fa-star";
                            break;
                        case 5:
                            infoVisibiliFilm.stella1 = "fas fa-star";
                            infoVisibiliFilm.stella2 = "fas fa-star";
                            infoVisibiliFilm.stella3 = "fas fa-star";
                            infoVisibiliFilm.stella4 = "fas fa-star";
                            infoVisibiliFilm.stella5 = "fas fa-star";
                            break;

                        default:
                    } */





                    if (stellePiene > 0)
                        infoVisibiliFilm.stella1 = "fas fa-star";
                    if (stellePiene > 1)
                        infoVisibiliFilm.stella2 = "fas fa-star";
                    if (stellePiene > 2)
                        infoVisibiliFilm.stella3 = "fas fa-star";
                    if (stellePiene > 3)
                        infoVisibiliFilm.stella4 = "fas fa-star";
                    if (stellePiene > 4)
                        infoVisibiliFilm.stella5 = "fas fa-star";



                    var templateSchedaFilmCompilata = templateSchedaFilm(infoVisibiliFilm);
                    $(".contenitore-titoli").append(templateSchedaFilmCompilata);



                    ///// INFO A COMPARSA SULLA CARD ////////


                    $(".card").mouseenter(function () {
                        $(".card").find("h4").hide();
                        $(".card").find("h3").hide();
                        $(".card").find(".contenitore-stelle").hide();


                        $(this).find("h4").show();
                        $(this).find("h3").show();
                        $(this).find(".contenitore-stelle").show();


                    });

                    $(".card").mouseleave(function () {
                        $(".card").find("h4").hide();
                        $(".card").find("h3").hide();
                        $(".card").find(".contenitore-stelle").hide();


                    });

                    $(".card").find(".contenitore-stelle").hide(); //così compare solo con l'hover sulla card


                    ////////////////////////////// 

                    var copertina = infoVisibiliFilm.copertina;



                }





            },
            error: function (errore) {
                alert("C\' è un rrore nel caricamento della pagina");
            }



        });










    });
























});



//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false