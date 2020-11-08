//page1 Delete Habitat
$(document).ready(function (){
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'http://nzwetland.herokuapp.com/api/habitat/',
        success: function (data) {
            // location.reload();

            i = 0;
            while (i < data.length){
                habitat = data[i];
                $("#habitat_id_input").append("<option value='"+habitat.id+"'>" +
                    "ID:" +habitat.id+
                    "|Description: "+habitat.description+"\</option>");
                i = i + 1;
            }
            $("#habitat_id_input").change(function (){
                habitat = getSinglehabitat($("#habitat_id_input").val());
                $("#habitat_id").text(habitat.id);
                $("#habitat_description").text(habitat.description);
                $("#habitat_habitattype").text(habitat.habitattype);

            })
        },
        error: function (err) {
            console.log(err);
        }
    });
    $("#delete_but").click(function () {
    deletehabitat     = $("#habitat_id_input").val();
    $.ajax({
    type: 'DELETE',
    dataType: 'JSON',
    url: 'http://nzwetland.herokuapp.com/api/habitat/'+deletehabitat,
    success: function (data) {
    alert('Habitat  deleted successfully');
    if (confirm(' Delete another Habitat?')) {
    location.reload();}
    else{
    console.log("");
    window.location.href = "mainMenu.html";
}

},
    error: function (err) {
    console.log(err);
    errors = JSON.parse(err.responseText);
    console.log(errors);
    $("#habitat_id_input_err").text(errors.name);
}
});
});
})
//--------------------------------------------------------------------------------------------------------------------------------------------
//page2 Produce Habitats Report

$(document).ready(function () {
    $("#show_report").click(function () {
        $("#Sitehabitat_report").empty();
        $.ajax({
            type: 'Get',
            dataType: 'JSON',
            url: 'http://nzwetland.herokuapp.com/api/Sitehabitat/',
            success: function (data) {
                // location.reload();

                i = 0;
                while (i < data.length) {
                    Sitehabitat = data[i];
                    $("#Sitehabitat_report").append("<hr>" +
                        " Sitehabitat ID: " + Sitehabitat.id + "<br>" +
                        " Site habitat Name: " + Sitehabitat.sitehabitatname + "<br>" +
                        " Area: " + Sitehabitat.area + "<br>");
                    site = getsite(sitet.id)
                    m = 0;
                    while (m < site.length) {
                        $("#site_report").append(
                            " Site Name: " + site[m].sitename + "<br>")

                        m = m + 1;
                    }
                    console.log('site', site)

                    i = i + 1;
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    })

});

function getsite(Sitehabitat) {
    site = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'http://nzwetland.herokuapp.com/api/site/',
        success: function (data) {
            // location.reload();

            j = 0;
            while (j < data.length) {
                site = data[j];
                if (site.Sitehabitat == Sitehabitat) {
                    landuse.push(landuse);
                }
                j = j + 1;
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    return site;
}
//--------------------------------------------------------------------------------------------------------------------------------------------
//page3 Assign Land use


    $(document).ready(function () {
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'https://nzwetland.herokuapp.com/api/Sitehabitat/',
        success: function (data) {
            // location.reload();

            i = 0;
            while (i < data.length) {
                sitehabitats = data[i];
                $("#siteHabitat_id_input").append("<option value='" + sitehabitats.id + "'>" +
                    "" + sitehabitats.id +
                    " | " + sitehabitats.sitehabitatname + "\</option>");
                i = i + 1;
            }
            $("#siteHabitat_id_input").change(function () {
                siteHabitat = getSingleSitehabitat($("#siteHabitat_id_input").val());
                console.log('sitehabitast', siteHabitat)
                $("#siteHabitat_id").text(siteHabitat.id);
                $("#siteHabitat_name").text(siteHabitat.sitehabitatname);
                sitename1 = siteHabitat.site;
                sitename2 = getSingleSite(sitename1);
                console.log('sitename2', sitename2)

                $("#site_name").text(sitename2.sitename);
                sitehabitatlanduse1 = getAssignSitehabitatLanduse($("#siteHabitat_id_input").val())
                console.log('shbtlanduse', sitehabitatlanduse1)
                j = 0;
                while (j < sitehabitatlanduse1.length) {
                    landuseID = sitehabitatlanduse1[j].landuse;
                    landuse1 = getSinglelanduse(landuseID);

                    $("#landuse1_input").append("<option value='" + sitehabitatlanduse1[j].id + "'>"
                        + "LandUseID" + landuse1.id +
                        " | LandUse Description: " + landuse1.description +
                        " | Impact: " + sitehabitatlanduse1[j].impact +
                        "</option>");

                    j++;
                }
            })
        },
        error: function (err) {
            console.log(err);
        }


    });


    $.ajax({
    type: 'Get',
    dataType: 'JSON',
    url: 'http://nzwetland.herokuapp.com/api/landuse/',
    success: function (data) {
    // location.reload();

    i = 0;
    while (i < data.length) {
    landuse = data[i];
    $("#landuse_input").append("<option value='" + landuse.id + "'>" +
    "" + landuse.id +
    " | " + landuse.description + "\</option>");
    i = i + 1;
}
    $("#landuse_input").change(function () {
    landuse = getSinglelanduse($("#landuse_input").val());
    $("#landuse_id").text(landuse.id);
    $("#landuse_description").text(landuse.description);


})
},
    error: function (err) {
    console.log(err);
}
});

    $("#assign_btn").click(function () {

    sitehabitatID = $("#siteHabitat_id").text();
    landuseID = $("#landuse_id").text();
    landuseID = $("#landuse_id").text();
    Impact = $("#sitehabitatlanduse_impact").val();
    lanusedescription = $("#landuse_description").text();
    landusetype1 = $("#landuse_description").text();
    impact = $('input[name="Impact"]:checked').val();
    console.log('landuse', landuseID),
    $.ajax({
    type: 'POST',
    dataType: 'JSON',
    url: 'http://nzwetland.herokuapp.com/api/landuse/',
    data: {
    description: lanusedescription,
    landusetype: landusetype1,

    success: function (data) {
    alert('Land use Assigned successfully');
    if (confirm(' Add another land use?')) {
    location.reload();}
    else{
    console.log("");
    window.location.href = "mainmenu.html";
}
},

},

});

});
})
//--------------------------------------------------------------------------------------------------------------------------------------------
//page4 Remove Land use

$(document).ready(function() {
        $.ajax({
            type: 'Get',
            dataType: 'JSON',
            url: 'http://nzwetland.herokuapp.com/api/Sitehabitat/',
            success: function(data) {
                i = 0;
                while (i < data.length) {
                    Sitehabitat = data[i];
                    console.log('gg',Sitehabitat);
                    $("#siteHabitat_id_input").append("<option value='" + Sitehabitat.id + "'> " + Sitehabitat.sitehabitatname + "" + Sitehabitat.habitat + "</option>");
                    i = i + 1;
                }
                $("#siteHabitat_id_input").change(function() {
                    Sitehabitat1 = getSitehabitat($("siteHabitat_id_input").val())
                });
            },
            error: function(err) {
                console.log(err);
            }
        });

        function getSiteInfo(SiteID) {
            $.ajax({
                type: 'Get',
                dataType: 'JSON',
                url: 'https://nzwetland.herokuapp.com/api/site/' + SiteID,
                success: function(data) {
                    // location.reload();

                    $("#site_name").val(data.sitename);
                    $("#site_status").val(data.status);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }

        $.ajax({
            type: 'Get',
            dataType: 'JSON',
            url: 'http://nzwetland.herokuapp.com/api/landuse/',
            async: true,
            success: function(data) {
                $("#landuse_id_input").change(function() {
                    i = 0;
                    while (i < data.length) {
                        landuse = data[i];
                        landuse = getlanduseInfo(landuse.landuse);
                        $("#landuse_id_input").append("<option value='" + landuse.id + "'>" + landuse.description + " </option>");
                        i = i + 1;
                    }
                });

            },
            error: function(err) {
                console.log(err);
            }
        });

        $("#remove_landuse_but").click(function() {
            sitehabitatID = $("#landuse_id_input").val();
            $.ajax({
                type: 'DELETE',
                dataType: 'JSON',
                url: 'http://nzwetland.herokuapp.com/api/landuse/' + landuseID,
                success: function(data) {
                    alert('Land use removed successfully.');
                    if (confirm(' Remove another land use?')) {
                        location.reload();}
                    else{
                        console.log("");
                        window.location.href = "mainmenu.html";
                    }
                },

                error: function(err) {
                    console.log(err);
                    errors = JSON.parse(err.responseText);
                    console.log(errors);
                    $("#landuse_id_input_err").val(errors.name);
                }
            });
        });
    });

function back() {
    window.history.back();
}

window.onload = function() {
    $("#Sitehabitat_id").val('');
    $("#Sitehabitat_name").val('');
    $("#site_id_input").val('');
    $("#landuse_id_input").val('');
    $("#sitehabitatlanduse_id_input").val('');
}
//--------------------------------------------------------------------------------------------------------------------------------------------
//page5Add Land use

    $(document).ready(function (){
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'http://nzwetland.herokuapp.com/api/landuse/',
        success: function (data) {
            // location.reload();

            i = 0;
            while (i < data.length){
                landuse = data[i];
                $("#landuse_input").append("<option value='"+landuse.id+"'>"+landuse.description+" "+landuse.landusetype+"\</option>");
                i = i + 1;
            }

        },
        error: function (err) {
            console.log(err);
        }
    });
    $("#add_landuse_but").click(function () {

    description = $("#landuse_description").val();
    landusetype= $("#landuse_landusetype").val();

    $.ajax({
    type: 'POST',
    dataType: 'JSON',
    url: 'http://nzwetland.herokuapp.com/api/landuse/',
    data: {

    description: description,
    landusetype: landusetype,

},
    success: function (data) {
    alert('land use added successfully');
    if (confirm(' Add another land use?')) {
    location.reload();}
    else{
    console.log("");
    window.location.href = "mainmenu.html";
}
},


});

});

})
//--------------------------------------------------------------------------------------------------------------------------------------------
//page6 Update Land use

    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'http://nzwetland.herokuapp.com/api/landuse/',
        success: function (data) {
            // location.reload();

            i = 0;
            while (i < data.length){
                landuse = data[i];
                $("#landuse_id_input").append("<option value='"+landuse.id+"'>"+landuse.id+" "+landuse.description+" \</option>");
                i = i + 1;
            }
            $("#landuse_id_input").change(function(){
                site = getlanduseInfo($("#landuse_id_input").val());
            });
            $("#update_landuse_but").click(function(){
                updatelanduseInfo($("#landuse_id_input").val());
            });
        },
        error: function (err) {
            console.log(err);
        }
    });

function getlanduseInfo (landuse_id) {
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'http://nzwetland.herokuapp.com/api/landuse/'+landuse_id,
        success: function (data) {
            // location.reload();
            $("#landuse_id").val(data.id);
            $("#landuse_description").val(data.description);
            $("#landuse_landusetype").val(data.landusetype);




            console.log(data);


        },

        error: function (err) {
            console.log(err);
        }
    });
}


function updatelanduseInfo (landuse_id) {
    // location.reload();
    description = $("#landuse_description").val();
    landusetype = $("#landuse_landusetype").val();



    $.ajax({
        type: 'put',
        dataType: 'JSON',
        url: 'http://nzwetland.herokuapp.com/api/landuse/'+ updatelanduse,
        success: function (data) {
            alert("Landuse updated successfully");
            if (confirm(' Update another land use?')) {
                location.reload();}
            else{
                console.log("");
                window.location.href = "mainmenu.html";
            }
        },


        error: function (err) {
            console.log(err);
            errors = JSON.parse(err.responseText);
            console.log(errors);
            $("#landuse_id_input_err").text(errors.id);
        }
    });
}


$(document).ready(function () {


});
//--------------------------------------------------------------------------------------------------------------------------------------------
//page7 Delete Land use

    $(document).ready(function (){
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'http://nzwetland.herokuapp.com/api/landuse/',
        success: function (data) {
            // location.reload();

            i = 0;
            while (i < data.length){
                landuses = data[i];
                $("#landuse_id_input").append("<option value='" + landuses.id+"'>" +
                    "ID:" +landuses.id+
                    "|Description" +landuses.description+
                    "|Land use type"+landuses.landusetype+"\</option>");
                i = i + 1;
            }
            $("#landuse_id_input").change(function (){
                landuse = getSinglelanduse($("#landuse_id_input").val());
                $("#landuse_id").text(landuse.id);
                $("#landuse_description").text(landuse.description);
                $("#landuse_landusetype").text(landuse.landusetype);

            })
        },
        error: function (err) {
            console.log(err);
        }
    });
    $("#delete_but").click(function () {
    deletelanduse      = $("#landuse_id_input").val();
    $.ajax({
    type: 'DELETE',
    dataType: 'JSON',
    url: 'http://nzwetland.herokuapp.com/api/landuse/'+deletelanduse,
    success: function (data) {
    alert('Land use Deleted successfully');
    if (confirm(' Delete another land use?')) {
    location.reload();}
    else{
    console.log("");
    window.location.href = "mainmenu.html";
}
},
    error: function (err) {
    console.log(err);
    errors = JSON.parse(err.responseText);
    console.log(errors);
    $("#landuse_id_input_err").text(errors.id);
}
});
});
})
//--------------------------------------------------------------------------------------------------------------------------------------------
//page8 Produce Land uses Report

    $(document).ready(function () {
        $("#show_report").click(function () {
            $("#landuse_report").empty();
            $.ajax({
                type: 'Get',
                dataType: 'JSON',
                url: 'http://nzwetland.herokuapp.com/api/landuse/',
                success: function (data) {
                    // location.reload();

                    i = 0;
                    while (i < data.length) {
                        landuse = data[i];
                        $("#landuse_report").append("<hr>" +
                            " landuse ID: " + landuse.id + "<br>" +
                            " Description: " + landuse.description + "<br>" +
                            " Landuse Type: " + landuse.landusetype + "<br>");
                        sitehabitats = getSitehabitat(landuse.id)
                        m = 0;
                        while (m < sitehabitats.length) {
                            $("#landuse_report").append(
                                " Site Habitat ID: " + sitehabitats[m].id + "<br>" +
                                " Site Habitat name: " + sitehabitats[m].sitehabitatname + "<br>")

                            m= m+1;
                        }
                        console.log('sitehabitats', sitehabitats)

                        i = i + 1;
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        })

    });

function getSitehabitat(landuse) {
    Sitehabitat = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'http://nzwetland.herokuapp.com/api/Sitehabitat/',
        success: function (data) {
            // location.reload();

            j = 0;
            while (j < data.length) {
                Sitehabitat1 = data[j];
                if (Sitehabitat1.landuse == landuse) {
                    Sitehabitat.push(Sitehabitat1);
                }
                j = j + 1;
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    return Sitehabitat;
}
//--------------------------------------------------------------------------------------------------------------------------------------------
//page9 Produce Land uses Report

    $(document).ready(function () {
    $("#show_report").click(function () {
        $("#habitat_report").empty();
        $.ajax({
            type: 'Get',
            dataType: 'JSON',
            url: 'http://nzwetland.herokuapp.com/api/habitat/',
            success: function (data) {
                // location.reload();

                i = 0;
                while (i < data.length) {
                    habitat = data[i];
                    $("#habitat_report").append("<hr>" +
                        " <h3>Habitat ID:</h3> " + habitat.id + "<br>" +
                        " <h3>Description:</h3> " + habitat.description + "<br>" +
                        " <h3>Habitat Type:</h3> " + habitat.habitattype + "<br>");
                    sitehabitats = getSitehabitat(habitat.id)
                    m = 0;
                    while (m < sitehabitats.length) {
                        $("#habitat_report").append(
                            " <h3>Site Habitat ID:</h3> " + sitehabitats[m].id + "<br>" +
                            " <h3>Site Habitat name:</h3> " + sitehabitats[m].sitehabitatname + "<br>"+
                            "     <h3>Site Habitat area:</h3> " + sitehabitats[m].area + "<br>");
                        m= m+1;
                    }
                    console.log('sitehabitats', sitehabitats)

                    i = i + 1;
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    })

});

    function getSitehabitat(habitat) {
    Sitehabitat = [];
    $.ajax({
    type: 'Get',
    dataType: 'JSON',
    async: false,
    url: 'http://nzwetland.herokuapp.com/api/Sitehabitat/',
    success: function (data) {
    // location.reload();

    j = 0;
    while (j < data.length) {
    Sitehabitat1 = data[j];
    if (Sitehabitat1.habitat == habitat) {
    Sitehabitat.push(Sitehabitat1);
}
    j = j + 1;
}
},
    error: function (err) {
    console.log(err);
}
});
    return Sitehabitat;
}

//--------------------------------------------------------------------------------------------------------------------------------------------






