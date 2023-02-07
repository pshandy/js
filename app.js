var organizeByTags = function (toDoObjects) { 

    console.log("organizeByTags called");

    let tags = [];
    toDoObjects.forEach(function (toDo) {
        toDo.tags.forEach(function (tag) {
            if (tags.indexOf(tag) === -1) { 
                tags.push(tag);
            }
        });
    }); 
    console.log(tags);

    let tagObjects = tags.map(function (tag) {
        let toDosWithTag = []; 
        toDoObjects.forEach(function (toDo) {
            if (toDo.tags.indexOf(tag) !== -1) { 
                toDosWithTag.push(toDo.description);
            }
        });
        return { "name": tag, "toDos": toDosWithTag };
    });
    console.log(tagObjects);
    return tagObjects;
};


var main = function (toDoObjects) {

    "use strict";
    let toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });

    $('.tabs a span').toArray().forEach(function (element) {
        $(element).on('click', function() {
            let $element = $(element);
            $('.tabs a span').removeClass('active');
            $element.addClass('active');
            $('main .content').empty();

            if ($element.parent().is(':nth-child(1)')) {
                let $content = $('<ul>');
                for (let i = toDos.length - 1; i > -1; i--) {
                    $content.append($('<li>').text(toDos[i]));
                }
                $('main .content').append($content);

            }  else if ($element.parent().is(':nth-child(2)')) {
                let $content = $('<ul>');
                toDos.forEach(function(todo) {
                    $content.append($('<li>').text(todo)); 
                });
                $('main .content').append($content);

            } else if ($element.parent().is(':nth-child(3)')) {
                let organizedByTag = organizeByTags(toDoObjects);
                organizedByTag.forEach(function(tag) {
                    let $tagName = $('<h3>').text(tag.name);
                    let $content = $('<ul>');
                    console.log(tag);
                    tag.toDos.forEach(function (description) {
                        let $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);        
                });


            } else if ($element.parent().is(':nth-child(4)')) {
                let $input = $('<input class="description">');
                let $inputLabel = $('<p>Новая задача: </p>');
                let $tagInput = $('<input class="tags">');
                let $tagLabel = $('<p>Тэги: </p>');
                let $button = $('<button>+</button>');
                $button.on("click", function () {
                    let description = $input.val(),
                    tags = $tagInput.val().split(","); 
                    toDoObjects.push({"description":description, "tags":tags}); 
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });
                    $input.val("");
                    $tagInput.val("");
                });
                $("main .content").append($inputLabel, $input, $tagLabel, $tagInput, $button);
            }
            return false;
        });
    });

};

$(document).ready(function() {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    })
});
