// Register click handler for #request button
$(function onDocReady() {
    $('#universityForm').submit(selectPolicy);

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

    function selectPolicy() {
        policyNumber = $('#select-policy').val();

        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/addpolicy',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PolicyId: policyNumber
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest() {
        alert('done');
    }

    if (!_config.api.invokeUrl) {
        $('#noApiMessage').show();
    }
});
