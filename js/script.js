BaseURL = "https://nzwetland.herokuapp.com/";

function login(username, password){
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: BaseURL+'api/auth/login',
        data: {username : username, password: password},
        async: false,
        success: function (data) {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            console.log(JSON.stringify(data.user));
            console.log(data.token);
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function hasValidToken(){
    token = localStorage.getItem('token');
    var loginStatus = false;
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: BaseURL+'api/auth/user',
        headers: { 'Authorization': 'Token ' + token },
        async: false,
        success: function (data) {
            console.log(data);
            alert('valid login');
            loginStatus = true;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return loginStatus;
}

function hasValidLogin(){
    var loginStatus = false;
    try {
        user = JSON.parse(localStorage.getItem('user'));
        token = localStorage.getItem('token');
        // console.log("validToken: "+hasValidToken());
        if (hasValidToken()){
            loginStatus = true;
        }
    }
    catch(err) {
        console.log("no user login");
    }
    return loginStatus;
}

function logout(){
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: BaseURL+'api/auth/logout',
        headers: { 'Authorization': 'Token ' + token },
        async: false,
        success: function (data) {
            console.log(data);
            localStorage.clear();
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
}



/**
 * @name getClientInfo
 * @param clientID
 * @returns client object
 */
function getClientInfo(clientID){
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://bigeye6.herokuapp.com/api/clients/'+clientID+'/',
        success: function (data) {
            // location.reload();
            client = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return client;

}

/**
 * @name getSiteInfo
 * @param site_id
 * @returns site object
 */
function getSiteInfo (site_id) {
    site = '';
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'https://nzwetland.herokuapp.com/api/site/'+site_id,
        success: function (data) {
            // location.reload();
            site = data;

            // var departmentID = data.department;

            console.log(data);

        },

        error: function (err) {
            console.log(err);
        }
    });
    return site;
}

function getAllSites() {
    sites = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/site/',
        success: function (data) {
            sites = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return sites;
}