var slideshow = function(tag) {
    
    let url = "http://api.flickr.com/services/feeds/photos_public.gne?" + "tags=" + tag + "&format=json&jsoncallback=?";
    
    let displayMessage = function (messageIndex) {

        $.getJSON(url, function (flickrResponse) {

            let $img = $("<img>").attr("src", flickrResponse.items[messageIndex].media.m).hide();
            $("main .photos").empty();
            $("main .photos").append($img);
            $img.fadeIn();

            setTimeout(function () {
                messageIndex++;
                displayMessage(messageIndex);
            }, 3000);

            if (messageIndex == flickrResponse.items.length - 1) {
                messageIndex = -1;
            }

        });
    };
    
    displayMessage(0);
    
}

var main = function () {
    "use strict"; 
    $(".search").on("click", function () {
        let tag = $('.tag').val();
        if (tag !== "") {
            $("main .photos").empty();
            slideshow(tag);
        }
        $('.tag').val("");
    });
};
$(document).ready(main);