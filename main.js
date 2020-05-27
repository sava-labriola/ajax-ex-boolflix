//variabili per il templae con Handlebars

var template_html = $('#card').html();

var template_function = Handlebars.compile(template_html);

//avvio ricerca premendo il pulsante

$('#search').click(function () {
    search();
})

//avvio ricerca premendo invio

$('#ricerca').keyup(function(event) {
    if(event.which == 13) {
        search();
    }
});

//funzione completa che fa visualizzare i film in pagina

function display_movies(array_results) {
    for (var i = 0; i < array_results.length; i++) {
        var titolo = array_results[i].title || array_results[i].name;
        var titolo_originale = array_results[i].original_title || array_results[i].original_name;
        var lingua = array_results[i].original_language;
        var voto = array_results[i].vote_average;
        var immagine = array_results[i].poster_path;
        var trama = array_results[i].overview;
//richiamo questa funzione per inserire i film in pagina
        html_structure(titolo, titolo_originale, lingua, voto, immagine, trama);
    }

}

//funzione che appende le informazioni dei film in pagina

function html_structure(title, original_title, language, vote, image, view) {
    var placeholder = {
        'titolo': title,
        'titolo_originale': original_title,
        'lingua': flag(language),
        'voto': vote_to_star(vote),
        'poster': image_broken(image),
        'trama': overview(view)
    }

    var html_finale = template_function(placeholder);
    $('.movie_list').append(html_finale);
}

// trasformo i voti da 1 a 10 in stelle da 1 a 5

function vote_to_star(votes) {
    var voto_trasformato = Math.ceil(votes / 2);
    var stella = '';
    for (var i = 0; i < voto_trasformato; i++) {
        stella = stella + '<i class="fas fa-star"></i>';
    }
    for (var i = 0; i < 5 - voto_trasformato; i++) {
        stella = stella + '<i class="far fa-star"></i>';
    }
    return stella ;
}

//ricavo la bandiera per ogni lingua

function flag(languages) {
    var lingua_bandiera = ['en', 'fr', 'it', 'es', 'fi', 'no', 'pl', 'el', 'de'];
    var flag;
    if(lingua_bandiera.includes(languages)) {
        flag = '<img src="img/flag_' + languages + '.png"></img>';
        return flag;
    }
    else {
        return languages;
    }
}

// funzione per chiamate ajax

function ajax(films, url) {
    $.ajax({
        'url': url,
        'method': 'GET',
        'data': {
            'api_key': '64a2fd972ada97403c0291bfb662a850',
            'query': films ,
            'language': 'it'
        },
        'success': function(data) {
            display_movies(data.results);
        },
        'error': function() {
            alert('errore');
        }
    });
}

//funzione se l immagine non è disponibile

function image_broken(image) {
    if (image == null) {
        return 'img/netflix_black.png';
    }
    return 'https://image.tmdb.org/t/p/w185' + image;
}

function overview(view) {
    var compact_overview = view.substr(0, 100);
    return compact_overview;
}

//funzione di ricerca

function search() {
    var film = $('#ricerca').val();
    $('.movie_list').empty();
    $('#ricerca').val('');
    var url_film = 'https://api.themoviedb.org/3/search/movie'
    var url_serie_tv = 'https://api.themoviedb.org/3/search/tv'

// chiamate ajax

    ajax(film, url_film);
    ajax(film, url_serie_tv);
}
