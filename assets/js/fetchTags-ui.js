var FETCH_TAGS_ENDPOINT = 'http://localhost:3000/fetchtags';
var $output = $('.js-results').first();
var ERROR_CLASS = 'c--error';

// we just want the hostname
var serializeUrl = function(url) {
    if (typeof url !== 'string') {
        return false;
    }

    if (url.replace(/\s/g, '') === '') {
        return false;
    }

    if (!/^(http|https)\:\/\//.test(url)) {
        console.log('Did you forget to include the protocol?');
        return false;
    }

    var serializer = document.createElement('a');
    serializer.href = url;

    return serializer.hostname;
};

var renderTags = function(data) {
    // wrap in a container so we can call .find() to return all nodes
    var $container = $('<div />');
    $container.append($(data));

    var outputString = '';

    $container.find('*').map(function(_, el) {
        outputString += '' + el.tagName + ', ';
    });

    if (outputString !== '') {
        // remove the extra comma
        outputString.replace(/\,$/, '');

        $output
            .removeClass(ERROR_CLASS)
            .removeAttr('hidden')
            .text(outputString);
    }
};

var handleError = function(err) {
    $output
        .addClass(ERROR_CLASS)
        .removeAttr('hidden')
        .text(err.responseText);
}

var getPage = function(e) {
    e.preventDefault();

    var $form = $(this);
    var data = {};

    data.url = serializeUrl($form.find('.js-input-url').val());

    if (!data.url) {
        console.log('URL invalid!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: FETCH_TAGS_ENDPOINT,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: renderTags,
        error: handleError
    });
};

$(document).ready(function() {
    $('.js-form').on('submit', getPage);
});
