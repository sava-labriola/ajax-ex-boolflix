$('#search').click(function () {
    var film = $('#ricerca').val();
    $('#ricerca').val('');
// chiamata ajax
    $.ajax({
        'url': 'https://api.themoviedb.org/3/search/movie',
        'method': 'GET',
        'data': {
            'api_key': '64a2fd972ada97403c0291bfb662a850',
            'query': film ,
        },
        'success': function(data) {
            display_movies(data.results);
        },
        'error': function() {
            alert('errore');
        }
    });
})

//funzione completa che fa visualizzare i film in pagina

function display_movies(array_results) {
    for (var i = 0; i < array_results.length; i++) {
        var titolo = array_results[i].title;
        var titolo_originale = array_results[i].original_title;
        var lingua = array_results[i].original_language;
        var voto = array_results[i].vote_average;
//richiamo questa funzione per inserire i film in pagina
        html_structure(titolo, titolo_originale, lingua, voto);
    }

}

//funzione che appende le informazioni dei film in pagina

function html_structure(title, original_title, language, vote) {
    $('.film_trovati').append("<li>" + title + "<li>");
    $('.film_trovati').append("<li>" + original_title + "<li>");
    $('.film_trovati').append("<li>" + language + "<li>");
    $('.film_trovati').append("<li>" + vote + "<li>");
}
