// Register click handler for #request button
$(function onDocReady() {

    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function getUserPolicy() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/getuserpolicy',
            headers: {
                Authorization: authToken
            },
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(data) {
        console.log(data);
        $('#hidden_data').val(data);
        trigger_init_message();
    }

    function showInsurangePolicy() {
        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());
        $('.policy').remove();
        $('.usage').remove();

        chatsection.append("<div class='options txt-white policy'>Here's your insurance policy ("+ data.institution+"):</div>");
        for (var property in data.policy) {
            if ((data.policy).hasOwnProperty(property)) {
                chatsection.append("<div class='options txt-white policy'>You have "+data.policy[property]+"$ remaining for "+property+"</div>");
            }
        }
    }

    function showUsageOption() {
        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());
        $('.usage').remove();
        $('.policy').remove();

        chatsection.append("<div class='options txt-white usage'>Which service would you like to know more about?</div>");
        for (var property in data.policy) {
            if ((data.policy).hasOwnProperty(property)) {
                chatsection.append("<button class='options usage " + property + "'>View " +property+" usage</div>");
            }
        }

        for (var property in data.policy) {
            if ((data.policy).hasOwnProperty(property)) {
                if (property == 'massage') {
                    $(document).on('click', '.'+property, massage);
                } else if (property == 'dental') {
                    $(document).on('click', '.'+property, dental);
                } else if (property == 'physiotherapy') {
                    $(document).on('click', '.'+property, physiotherapy);
                }
            }
        }
    }

    function trigger_init_message() {
        chatsection = $('#chatsection');

        chatsection.append("<div class='options txt-white'>What would you like to do?</div>");
        chatsection.append("<div class='options'><button id='viewinsurance'>View Insurance Policy</button><button id='viewusage'>View Usage</button></div>");

        $('#viewinsurance').on('click', showInsurangePolicy);
        $('#viewusage').on('click', showUsageOption);
    }

    function massage() {
        cleanServices();

        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());

        chatsection.append("<div class='options txt-white usage massagedata'>You have "+data.policy['massage']+"$ remaining.</div>");
    }

    function dental() {
        cleanServices();

        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());

        chatsection.append("<div class='options txt-white usage dentaldata'>You have "+data.policy['dental']+"$ remaining.</div>");
    }

    function physiotherapy() {
        cleanServices();

        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());

        chatsection.append("<div class='options txt-white usage physiotherapydata'>You have "+data.policy['physiotherapy']+"$ remaining.</div>");
    }

    function cleanServices() {
        data = JSON.parse($('#hidden_data').val());

        for (var property in data.policy) {
            if ((data.policy).hasOwnProperty(property)) {
                $('.'+property+'data').remove();
            }
        }

    }


    if (!_config.api.invokeUrl) {
        $('#noApiMessage').show();
    }

    getUserPolicy();
});
