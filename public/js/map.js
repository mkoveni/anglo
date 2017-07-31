let token;
let container = document.getElementById('popup');
let closer = document.getElementById('popup-closer');

$('#popup').css('left', '-50px');

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};