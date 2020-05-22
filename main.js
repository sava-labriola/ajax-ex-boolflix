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
// da trasformare in una funzione
            var array_risultati = data.results;
            for (var i = 0; i < array_risultati.length; i++) {
                var titolo = array_risultati[i].title;
                var titolo_originale = array_risultati[i].original_title;
                var lingua = array_risultati[i].original_language;
                var voto = array_risultati[i].vote_average;
// html da creare dinamicamente con Handlebars
                $('.film_trovati').append("<li>" + titolo + "<li>");
                $('.film_trovati').append("<li>" + titolo_originale + "<li>");
                $('.film_trovati').append("<li>" + lingua + "<li>");
                $('.film_trovati').append("<li>" + voto + "<li>");
            }
        },
        'error': function() {
            alert('errore');
        }
    });
})
