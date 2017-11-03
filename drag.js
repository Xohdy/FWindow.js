function drag(elementToDrag, event, can_X, can_Y, max_X, max_Y, min_X, min_Y) {
    if (can_X === undefined)
        can_X = true;
    if (can_Y === undefined)
        can_Y = true;
    max_X = max_X || window.innerWidth - 50;
    max_Y = max_Y || window.innerHeight - 100;
    min_X = min_X || 50;
    min_Y = min_Y || 50;

    var startX = event.clientX;
    var startY = event.clientY;

    var origX = Get_style_val(elementToDrag.css('left'), 'px');
    var origY = Get_style_val(elementToDrag.css('top'), 'px');

    var deltaX = startX - origX;
    var deltaY = startY - origY;

    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);

    if (event.stopPropagation)
        event.stopPropagation();
    else
        event.cancelBubble = true;
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue = false;



    function moveHandler(e) {
        if (!e)
            e = window.event;
        var left = Get_style_val(elementToDrag.css('left'), 'px');
        var top = Get_style_val(elementToDrag.css('top'), 'px');
        var new_left = (e.clientX - deltaX);
        var new_top = (e.clientY - deltaY);

        if (can_X)
            elementToDrag.css('left', limit(left, new_left, max_X, min_X) + "px");
        if (can_Y)
            elementToDrag.css('top', limit(top, new_top, max_Y, min_Y) + "px");

        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true; // IE
    }

    function upHandler(e) {
        if (!e)
            e = window.event;
        document.removeEventListener("mouseup", upHandler, true);
        document.removeEventListener("mousemove", moveHandler, true);

        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }
}