$(document).ready(function () {
    ///////////////// RICERCA DI FILM E SERIE TV INSIEME/////////////////

    var source = $("#template-hdb-film").html();
    var templateSchedaFilm = Handlebars.compile(source);

    var source2 = $("#template-attore").html();
    var templateAttore = Handlebars.compile(source2);




    //quando clicco sul bottone, creo una variabile (testoDigitato) che ha il valore digitato nella barra di ricerca. 

    $("#bottone-ricerca").click(function () {
        cercaFilm();
        cercaSerieTv();
        $("#barra-ricerca").val(""); //svuota il valore digitato nella barra di ricerca (il titolo del film). E' opzionale.
        $(".contenitore-titoli").children(".card").remove(); // così resta in vista solo la serie/saga appena cercata
    });


    $("#barra-ricerca").keypress(function () {
        if (event.key == "Enter") {
            cercaFilm();
            cercaSerieTv();
            $(".contenitore-titoli").children(".card").remove(); // così resta in vista solo la serie/saga appena cercata
        }
    });



    /////// RICERCA DI FILM A PARTE ///////////// 

    /*

    $("#bottone-ricerca").click(function () {
        cercaFilm();
        $("#barra-ricerca").val("");
    });


    $("#barra-ricerca").keypress(function () {
        if (event.key == "Enter") {
            cercaFilm();
            $("#barra-ricerca").val("");
        }
    });

    */


    ///////////////// RICERCA DI SERIE TV  a parte ////////////////

    /*

    $("#bottone-ricerca").click(function () {
        cercaSerieTv();
        $("#barra-ricerca").val("");
    });


    $("#barra-ricerca").keypress(function () {
        if (event.key == "Enter") {
            cercaSerieTv();
            $("#barra-ricerca").val("");
        }
    });
    
    */





    ///////////////// FUNZIONI //////////////////////

    function cercaSerieTv() {
        var testoDigitato = $("#barra-ricerca").val().toLowerCase();
        var apiUrlBase = "https://api.themoviedb.org/3";


        $.ajax({

            url: apiUrlBase + '/search/tv',
            data: {
                api_key: "bf6da085b921b2474703466befcb39eb",
                query: testoDigitato,
                language: "it-IT"
            },
            method: "GET",
            success: function (infoInArrivo) {
                var films = infoInArrivo.results;
                //console.log(films); //è un array di oggetti. 
                //$(".contenitore-titoli").children(".card").remove(); // così resta in vista solo la serie/saga appena cercata


                for (var i = 0; i < films.length; i++) {
                    var film = films[i];

                    var stellePiene = Math.ceil((film.vote_average) / 2) // MEMO: è un numero (arrotondato per eccesso)
                    var infoVisibiliFilm = {
                        titolo: film.name,
                        titoloOriginale: film.original_name,
                        voto: film.vote_average,
                        lingua: /*film.original_language,*/ "",
                        filmId: film.id,
                        bandiera: "",
                        copertina: "https://image.tmdb.org/t/p/w185" + film.poster_path, //aggiunto w185 per width immagine
                        stella1: "far fa-star",
                        stella2: "far fa-star",
                        stella3: "far fa-star",
                        stella4: "far fa-star",
                        stella5: "far fa-star",

                        stelle: stellePiene,
                    }

                    if (film.poster_path == null) {
                        infoVisibiliFilm.copertina = "immagini/noimage.jpg";
                    }

                    //console.log(film);



                    //////////////// BANDIERE IN BASE ALLA LINGUA ORIGINALE ////////////////

                    switch (film.original_language) {
                        case "en":
                            infoVisibiliFilm.bandiera = "bandiere/united-kingdom-flag-icon-64.png";
                            break;
                        case "it":
                            infoVisibiliFilm.bandiera = "bandiere/italy-flag-icon-64.png";
                            break;
                        case "fr":
                            infoVisibiliFilm.bandiera = "bandiere/france-flag-icon-64.png";
                            break;
                        case "ja":
                            infoVisibiliFilm.bandiera = "bandiere/japan-flag-icon-64.png";
                            break;
                        case "de":
                            infoVisibiliFilm.bandiera = "bandiere/germany-flag-icon-64.png";
                            break;

                        case "zh":
                            infoVisibiliFilm.bandiera = "bandiere/china-flag-icon-64.png";
                            break;

                        case "es":
                            infoVisibiliFilm.bandiera = "bandiere/spain-flag-icon-64.png";
                            break;

                        case "ru":
                            infoVisibiliFilm.bandiera = "bandiere/russia-flag-icon-64.png";
                            break;


                        default: infoVisibiliFilm.lingua = film.original_language;
                            break;
                    }

                    /////////////////////// STELLE IN BASE AL VOTO /////////////////////

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
                        $(".card").find(".lingua").hide();
                        $(".card").find("h3").hide();
                        $(".card").find(".contenitore-stelle").hide();


                        $(this).find("h4").show();
                        $(this).find("h3").show();
                        $(this).find(".lingua").show();
                        $(this).find(".contenitore-stelle").show();


                    });

                    $(".card").mouseleave(function () {
                        $(".card").find("h4").hide();
                        $(".card").find("h3").hide();
                        $(".card").find(".lingua").hide();
                        $(".card").find(".contenitore-stelle").hide();


                    });

                    $(".card").find(".contenitore-stelle").hide(); //così compare solo con l'hover sulla card


                }


            },
            error: function (errore) {
                alert("C\' è un rrore nel caricamento della pagina");
            }

        });



    }

    function cercaFilm() {
        var testoDigitato = $("#barra-ricerca").val().toLowerCase();
        var apiUrlBase = "https://api.themoviedb.org/3";
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
                //$(".contenitore-titoli").children(".card").remove(); // così resta in vista solo la serie/saga appena cercata

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


                    if (film.poster_path == null) {
                        infoVisibiliFilm.copertina = "https://www.clbdog.it/uploads/images/1551704103_no_poster.png";
                    }

                    //////////////// BANDIERE IN BASE ALLA LINGUA ORIGINALE ////////////////

                    switch (film.original_language) {
                        case "en":
                            infoVisibiliFilm.bandiera = "bandiere/united-kingdom-flag-icon-64.png";
                            break;
                        case "it":
                            infoVisibiliFilm.bandiera = "bandiere/italy-flag-icon-64.png";
                            break;
                        case "fr":
                            infoVisibiliFilm.bandiera = "bandiere/france-flag-icon-64.png";
                            break;
                        case "ja":
                            infoVisibiliFilm.bandiera = "bandiere/japan-flag-icon-64.png";
                            break;
                        case "de":
                            infoVisibiliFilm.bandiera = "bandiere/germany-flag-icon-64.png";
                            break;

                        case "zh":
                            infoVisibiliFilm.bandiera = "bandiere/china-flag-icon-64.png";
                            break;

                        case "es":
                            infoVisibiliFilm.bandiera = "bandiere/spain-flag-icon-64.png";
                            break;

                        case "ru":
                            infoVisibiliFilm.bandiera = "bandiere/russia-flag-icon-64.png";
                            break;


                        default:
                            infoVisibiliFilm.bandiera = film.original_language;
                            break;
                    }

                    /////////////////////// STELLE IN BASE AL VOTO /////////////////////

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
                        $(".card").find(".lingua").hide();
                        $(".card").find("h3").hide();
                        $(".card").find(".contenitore-stelle").hide();


                        $(this).find("h4").show();
                        $(this).find("h3").show();
                        $(this).find(".lingua").show();
                        $(this).find(".contenitore-stelle").show();


                    });

                    $(".card").mouseleave(function () {
                        $(".card").find("h4").hide();
                        $(".card").find("h3").hide();
                        $(".card").find(".lingua").hide();
                        $(".card").find(".contenitore-stelle").hide();


                    });

                    $(".card").find(".contenitore-stelle").hide(); //così compare solo con l'hover sulla card


                    /// RICHIESTA PER IL CAST DEI FILM ///

                    $.ajax({
                        url: apiUrlBase + "/movie/" + infoVisibiliFilm.filmId + "/credits",
                        data: {
                            api_key: "bf6da085b921b2474703466befcb39eb",
                            /*query: testoDigitato,*/
                        },
                        method: "GET",
                        success: function (infoArrivate) {
                            var castTutto = infoArrivate.cast; //array di oggetti
                            for (var i = 0; i < Math.min(castTutto.length, 5); i++) { //prende il valore minimo tra 5 e la lunghezza del cast (check per film con meno di 5 attori//
                                var castSingolo = castTutto[i];
                                var nomeAttore = {
                                    nome: castSingolo.name,
                                }


                                $(".card").each(function () {
                                    var templateAttoreCompilato = templateAttore(nomeAttore);
                                    if ($(this).data("identity") == infoArrivate.id) {
                                        //console.log($(this).data("identity"), infoArrivate.id)
                                        $(templateAttoreCompilato).insertBefore($(this).find(".lingua"));

                                    }

                                });

                            }

                        },

                        error: function (errore) {
                            alert("C\' è un errore nel caricamento della pagina");
                        }

                    });
                }





            },
            error: function (errore) {
                alert("C\' è un rrore nel caricamento della pagina");
            }

        });



    }



});

