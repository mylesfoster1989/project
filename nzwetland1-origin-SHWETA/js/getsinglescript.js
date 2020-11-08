function getSinglelanduse(landuseID) {

    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'http://nzwetland.herokuapp.com/api/landuse/' + landuseID + '/',
        success: function (data) {
            // location.reload();
            landuse1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return landuse1;
}
//HABITAT//
function getSinglehabitat(habitatID) {

    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'http://nzwetland.herokuapp.com/api/habitat/' + habitatID + '/',
        success: function (data) {
            // location.reload();
            habitat1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return habitat1;
}

//Site Habitat//
//HABITAT//
function getSingleSitehabitat(SitehabitatID) {

    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'http://nzwetland.herokuapp.com/api/Sitehabitat/' + SitehabitatID + '/',
        success: function (data) {
            // location.reload();
            Sitehabitat1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return Sitehabitat1;
}
//SITE//
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

function getSinglehabiatatLanduse(habiatalanduseid){
    //return case object
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'http://nzwetland.herokuapp.com/api/sitehabitatlanduse/'+habiatalanduseid+'/',
        success: function (data) {
            // location.reload();
            habitatlanduse1 = data;

        },
        error: function (err) {
            console.log(err);
        }

    });
    return habitatlanduse1;
}



function getAssignSitehabitatLanduse(sitehabitatID){
    //return assessment objects
    sitehabitatlanduses = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'http://nzwetland.herokuapp.com/api/sitehabitatlanduse/',
        success: function (data) {
            // location.reload();
            i = 0;
            while (i<data.length){
                sitehabitatlanduse = data[i];
                if (sitehabitatlanduse.sitehabitat == sitehabitatID){
                    sitehabitatlanduses.push(sitehabitatlanduse);
                }
                i=i+1;
            }

        },
        error: function (err) {
            console.log(err);
        }

    });
    return sitehabitatlanduses;
}

function getsingleLanduse1(landuse){
    //return assessment objects
    landuses = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async:false,
        url: 'http://nzwetland.herokuapp.com/api/landuse/',
        success: function (data) {
            // location.reload();
            i = 0;
            while (i<data.length){
             landuse = data[i];
                if (landuse.id == landuse){
                    landuses.push(landuse);
                }
                i=i+1;
            }

        },
        error: function (err) {
            console.log(err);
        }

    });
    return landuses;
}