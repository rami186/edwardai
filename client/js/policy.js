function selectPolicy(policyNumber) {
    $.ajax({
        method: 'POST',
        url: "https://25nmupukve.execute-api.us-west-2.amazonaws.com/prod/addpolicy",
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
