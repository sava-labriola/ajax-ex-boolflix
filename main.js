var template_html = $('#card').html();

var template_function = Handlebars.compile(template_html);

$('#search').click(function () {
    var film = $('#ricerca').val();
    $('.movie_list').empty();
    $('#ricerca').val('');
    var url_film = 'https://api.themoviedb.org/3/search/movie'
    var url_serie_tv = 'https://api.themoviedb.org/3/search/tv'
// chiamata ajax
    ajax(film, url_film);
    ajax(film, url_serie_tv);
})

//funzione completa che fa visualizzare i film in pagina

function display_movies(array_results) {
    for (var i = 0; i < array_results.length; i++) {
        var titolo = array_results[i].title || array_results[i].name;
        var titolo_originale = array_results[i].original_title || array_results[i].original_name;
        var lingua = array_results[i].original_language;
        var voto = array_results[i].vote_average;
        var immagine = array_results[i].poster_path;
//richiamo questa funzione per inserire i film in pagina
        html_structure(titolo, titolo_originale, lingua, voto, immagine);
    }

}

//funzione che appende le informazioni dei film in pagina

function html_structure(title, original_title, language, vote, image) {
    var placeholder = {
        'titolo': title,
        'titolo_originale': original_title,
        'lingua': flag(language),
        'voto': vote_to_star(vote),
        'poster': image_broken(image)
    }

    var html_finale = template_function(placeholder);
    $('.movie_list').append(html_finale);
}

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

function ajax(films, url) {
    $.ajax({
        'url': url,
        'method': 'GET',
        'data': {
            'api_key': '64a2fd972ada97403c0291bfb662a850',
            'query': films ,
        },
        'success': function(data) {
            display_movies(data.results);
        },
        'error': function() {
            alert('errore');
        }
    });
}

function image_broken(image) {
    if (image == null) {
        return 'img/netflix_black.png';
    }
    return 'https://image.tmdb.org/t/p/w185' + image;
}
