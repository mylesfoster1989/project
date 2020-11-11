/**
 * @name getSingleSurvey
 * @param surveyID
 * @returns survey obj
 */
function getSingleSurvey(surveyID){

    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/Survey/'+surveyID+'/',
        success: function (data) {
            // location.reload();
            survey1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return survey1;
}
function getSingleSiteHabitat(siteHabitatID){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/Sitehabitat/'+siteHabitatID+'/',
        success: function (data) {
            // location.reload();
            siteHabitat1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return siteHabitat1;
}
function getSingleSite(siteID){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/site/'+siteID+'/',
        success: function (data) {
            // location.reload();
            site1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return site1;
}
function getSingleanimal(animalID){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/Animal/'+animalID+'/',
        success: function (data) {
            // location.reload();
            animal1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return animal1;
}
function getSingleObservation(observationID){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/Observation/'+observationID+'/',
        success: function (data) {
            // location.reload();
            observations = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return observations;
}

function recordedObservation(siteHabitat){
    //return assessment objects
    recordedObservations = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/Observation/',
        success: function (data) {
            // location.reload();
            i = 0;
            while (i<data.length){
                obsevation = data[i];
                if (obsevation.sitehabitat == siteHabitat){
                    recordedObservations.push(obsevation);
                }
                i=i+1;
            }

        },
        error: function (err) {
            console.log(err);
        }

    });
    return recordedObservations;
}

function assignedsiteHabitat(siteHabitat){
    //return assessment objects
    assignedsiteHabitats = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/Sitehabitat/',
        success: function (data) {
            // location.reload();
            i = 0;
            while (i<data.length){
                assignedsiteHBT = data[i];
                if (assignedsiteHBT.id == siteHabitat){
                    assignedsiteHabitats.push(assignedsiteHBT);
                }
                i=i+1;
            }

        },
        error: function (err) {
            console.log(err);
        }

    });
    return assignedsiteHabitats;
}

function getSingleSitehabitatlanduse(sitehabitatlanduseID){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/sitehabitatlanduse/'+sitehabitatlanduseID+'/',
        success: function (data) {
            // location.reload();
            sitehabitatlanduse = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return sitehabitatlanduse;
}
function getSinglelanduse(landuseID){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'https://nzwetland.herokuapp.com/api/landuse/'+landuseID+'/',
        success: function (data) {
            // location.reload();
            landuse = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return landuse;
}




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