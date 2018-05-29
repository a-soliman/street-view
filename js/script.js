
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $street = $("#street").val();
    var $city   = $("#city").val();
    var streetViewImage;

    if ($street.length > 0 && $city.length > 0) {
        apiUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
        apiUrl += $street
        apiUrl += ', '
        apiUrl += $city
        streetViewImage =apiUrl.replace(/ /gi, '%20');
        console.log(streetViewImage)
        var img = `<img class="bgimg" src="${streetViewImage}">`
        $body.append(img);
    }

    // NYTimes
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "f7d60cc6c9ec4779987719ebe7782a10",
        'q': "geary st, san francisco"
      });
    
    var NYarticles = []

    $.ajax({
    url: url,
    method: 'GET',
    }).done(function(result) {
    console.log(result.response.docs);
    result.response.docs.forEach((doc) => {
        NYarticles.push({'headline': doc.headline.main, 'body': doc.snippet});
    });

    NYarticles.forEach((article) => {
        $nytElem.append(`<li>${article.headline}</li>`)
    })
    console.log(NYarticles)
    }).fail(function(err) {
    throw err;
    });

    return false;
};

$('#form-container').submit(loadData);
