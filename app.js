var main = function () {
    
    "use strict";
    var toDos = [
        "Закончить писать эту книгу",
        "Вывести Грейси на прогулку в парк",
        "Ответить на электронные письма",
        "Подготовиться к лекции в понедельник",
        "Купить продукты"
    ];
    
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
                
            } else if ($element.parent().is(':nth-child(2)')) {
                var $content = $('<ul>');
                toDos.forEach(function(todo) {
                   $content.append($('<li>').text(todo)); 
                });
                $('main .content').append($content);
                
                
            } else if ($element.parent().is(':nth-child(3)')) {
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
$(document).ready(main);
