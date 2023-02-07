var organizeByTags = function (toDoObjects) { 
	
	console.log("organizeByTags called");
    
	var tags = [];
	toDoObjects.forEach(function (toDo) {
		toDo.tags.forEach(function (tag) {
			if (tags.indexOf(tag) === -1) { 
				tags.push(tag);
			}
		});
	}); 
	console.log(tags);

	var tagObjects = tags.map(function (tag) {
		var toDosWithTag = []; 
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
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });

    $('.tabs a span').toArray().forEach(function (element) {
        $(element).on('click', function() {
            var $element = $(element);
            $('.tabs a span').removeClass('active');
            $element.addClass('active');
            $('main .content').empty();

            if ($element.parent().is(':nth-child(1)')) {
                var $content = $('<ul>');
                for (var i = toDos.length - 1; i > -1; i--) {
                    $content.append($('<li>').text(toDos[i]));
                }
                $('main .content').append($content);

            }  else if ($element.parent().is(':nth-child(2)')) {
                var $content = $('<ul>');
                toDos.forEach(function(todo) {
                    $content.append($('<li>').text(todo)); 
                });
                $('main .content').append($content);

            } else if ($element.parent().is(':nth-child(3)')) {
				var organizedByTag = organizeByTags(toDoObjects);
                organizedByTag.forEach(function(tag) {
                    var $tagName = $('<h3>').text(tag.name);
                    var $content = $('<ul>');
                    console.log(tag);
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);        
                });


            } else if ($element.parent().is(':nth-child(4)')) {
                var $button = $('<button class="btn">+</button>');
                var $input = $('<input type="text" class="inp">');
                $button.on('click', function(element) {
                    toDos.push($input.val());
                    $input.val("");
                });
                $('main .content').append($input, $button);
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
