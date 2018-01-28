// Register click handler for #request button
$(function onDocReady() {
    $('#universityForm').submit(sendRequest);

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
        $('#hidden_data').val(data)
    }

    if (!_config.api.invokeUrl) {
        $('#noApiMessage').show();
    }

    getUserPolicy();
});
