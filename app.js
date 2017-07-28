function getFlickr(query) {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + query + '&format=json&nojsoncallback=1';
    $.ajax({
        type: "GET",
        url: proxy + url,
        // dataType: "json",
        success: function(response) {
            renderResults(response);
        },
        error: function(xhr, status, e) {
            console.log(status, e);
        }
    });
}


function getYoutube(query) {
  var youTubeURL = "https://www.googleapis.com/youtube/v3/search";
  var data = {
        maxResults: '6',
        part: 'snippet',
        key: 'AIzaSyApCFcADbM3EgInOvuv2IevCLHYUDjaCfs',
        q: query,
    };
    $.getJSON(youTubeURL, data, displayYoutubeResults);
}


function displayYoutubeResults() {
  console.log("success")
}



function chooseVideo(query) {

  $(".videos").on("click", function() {
     $(".js-search-results").empty();
     getYoutube(query)
  });

}

chooseVideo();




function renderResults(response) {
    'use strict';
    //Hide lipstick smudges image and headline
    $(".smudges").addClass("hidden");
    $(".headline").addClass("hidden");
    // Unhide Results
    $(".js-search-results").removeClass("hidden");
    // fadeIn Results
    $(".js-search-results").hide().fadeIn("slow");
    // Hide divs that are not being used to render images
    $(".output").addClass('hidden');
    // Change instructions to user for results
    $(".instructions").html("Click thumbnail to view image on Flickr")

    for (var i = 0; i < response.items.length; i++) {
        //Render thumbnail images
        $(`#result${i+1}`).find("img").attr('src', response.items[i].media.m);
        //Render thumbnail links
        $(`#result${i+1}`).find("a").attr('href', response.items[i].link);
        $(`#result${i+1}`).removeClass("hidden");
        hoverTitles(i);
    }

    function hoverTitles(i) {
        'use strict'
        $(`#result${i+1}`).mouseover(function() {
            $(`.title${i+1}`).html(response.items[i].title);
        });
        $(`#result${i+1}`).mouseout(function() {
            $(".title").empty();
        });
    }
}


function pickColor() {
    $(".rubywoo").on("click", function() {
        getFlickr("rubywoo");
    });

    $(".ladydanger").on("click", function() {
        getFlickr("ladydanger");
    });

    $(".candyyumyum").on("click", function() {
        getFlickr("candy yumyum");
    });

    $(".heroine").on("click", function() {
        getFlickr("mac heroine");
    });

    $(".cremednude").on("click", function() {
        getFlickr("creme d' nude");
    });

    $(".velvetteddy").on("click", function() {
        getFlickr("velvet teddy");
    });
};



$(function() {
    pickColor();
});
