// Register click handler for #request button
$(function onDocReady() {

    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = "token";
        } else {
            authToken = "eyJraWQiOiJaVCtxTmNpQXNGMWlNUmUrdEZxQmJPWXF2VFY1dE81WklsRGY2a2N4VTFBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMmE5ZWM0ZC1iZDQ1LTRjOTUtOGIxNC1jMTRmYjgxN2JlMGYiLCJhdWQiOiI1ZW5xZjB2cDg3NzY2aDRybjZjcTI0czg1NyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjFjNDBjMTczLTA0MmYtMTFlOC05NGM5LTc1YTU4MWNjNmEwMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTE3MTQ2MTAxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9sM2pxWTUzYmkiLCJjb2duaXRvOnVzZXJuYW1lIjoicnlhaGlhOTQtYXQtZ21haWwuY29tIiwiZXhwIjoxNTE3MTQ5NzAxLCJpYXQiOjE1MTcxNDYxMDIsImVtYWlsIjoicnlhaGlhOTRAZ21haWwuY29tIn0.H2aOyknUPPosB-fTrq15PAZl9p6GaMLhwAWkCsa8cXzwP6LfaJibRkJeGnjlhsqdFj1I_iDxMysb7Azq88HbYwtQsd9wQREVxgskL14fxF_2LPCbZTkegbWrtCx8d5lwKHyWBBuL53RHIbm_Bd4FjmRB5AomG0cokLqmpcQ7ncdXEGst4yG9roZUObn6ujth_mr7V4XtaN4QmABONOxGuD3ys4ci36snkYpLXTXaSlRs-HtQJxpMuEc15dZBvdermuzTOdYhb7bhXgNyHNpksx7dw3uLuIcU5iXS64Ijos8CjLWeFPQJfYUC503Qq3lRnsgs2fxA8_RA7Cx5lES2Ww";
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function getUserPolicy() {
        completeRequest("{\"institution\":\"Concordia University\",\"policy\":{\"massage\":500,\"dental\":1000,\"physiotherapy\":250},\"PolicyId\":\"Q1102\"}");
        return;
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

        chatsection.append("<div class='options policy'>Here's your insurance policy ("+ data.institution+"):</div>");
        for (var property in data.policy) {
            if ((data.policy).hasOwnProperty(property)) {
                chatsection.append("<div class='options policy'>You have "+data.policy[property]+"$ remaining for "+property+"</div>");
            }
        }
    }

    function showUsageOption() {
        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());
        $('.usage').remove();

        chatsection.append("<div class='options usage'>Which service would you like to know more about?</div>");
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

        chatsection.append("<div class='options'>What would you like to do?</div>");
        chatsection.append("<div class='options'><button id='viewinsurance'>View Insurance Policy</button><button id='viewusage'>View Usage</button></div>");

        $('#viewinsurance').on('click', showInsurangePolicy);
        $('#viewusage').on('click', showUsageOption);
    }

    function massage() {
        cleanServices();

        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());

        chatsection.append("<div class='options usage massagedata'>You have "+data.policy['massage']+"$ remaining.</div>");
    }

    function dental() {
        cleanServices();

        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());

        chatsection.append("<div class='options usage dentaldata'>You have "+data.policy['dental']+"$ remaining.</div>");
    }

    function physiotherapy() {
        cleanServices();

        chatsection = $('#chatsection');
        data = JSON.parse($('#hidden_data').val());

        chatsection.append("<div class='options usage physiotherapydata'>You have "+data.policy['physiotherapy']+"$ remaining.</div>");
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
