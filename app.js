var main = function () {
    "use strict";
    var tabNumber;
    for (tabNumber = 1; tabNumber <= 3; tabNumber++) {
        var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
        $(tabSelector).on("click", function () {
            console.log(tabSelector);
            $(".tabs span").removeClass("active");
            $(this).addClass("active");
            return false;
        });
    }
};
$(document).ready(main);
