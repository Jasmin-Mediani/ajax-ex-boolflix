$(document).ready(function () {

    var apiUrlBase = "https://api.themoviedb.org/3";

    var source = $("#template-hdb-film").html();
    var templateSchedaFilm = Handlebars.compile(source);


    var source = $("#template-hdb-stella").html();
    var templateStella = Handlebars.compile(source);



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
                    //console.log(film);
                    var infoVisibiliFilm = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        voto: film.vote_average,
                        lingua: film.original_language,
                        filmId: film.id,
                        //// MILESTONE 2 //////
                        stelle: Math.ceil((film.vote_average) / 2) // MEMO: è un numero (arrotondato per eccesso)
                    }
                    var templateSchedaFilmCompilata = templateSchedaFilm(infoVisibiliFilm);
                    //console.log(templateSchedaFilmCompilata);
                    $(".contenitore-titoli").append(templateSchedaFilmCompilata);



                    //////// //// STELLE //////////////

                    $(".card").each(function () {
                        //console.log($(this).data("id"), infoVisibiliFilm.filmId)
                        if ($(this).data("identity") == infoVisibiliFilm.filmId) {

                            var stelle = infoVisibiliFilm.stelle; //MEMO: è un numero 

                            for (var i = 0; i < stelle; i++) {
                                var templateStelleCompilate = templateStella();
                                $(this).find(".contenitore-stelle").append(templateStelleCompilate);
                            }
                        }

                    })

                }





            },
            error: function (errore) {
                alert("C\' è un rrore nel caricamento della pagina");
            }



        });










    });
























});



//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false