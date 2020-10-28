function login(username, password){
    user = '';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: "https://nzwetland.herokuapp.com/api/auth/login",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            console.log(data);
            user = data;
            if (1 in user.user.group){
                alert("administrator");
            }
            if (2 in user.user.group){
                alert("another group");
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
    return user;
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