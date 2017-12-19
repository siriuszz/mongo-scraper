$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<div class='singleArticle' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link +
            "<p><a id='save' class='btn btn-secondary btn-sm\' href='./saved.html' role='button'>Save Article</a></p>" +
            "</div>");
    }
});


// // // Whenever someone clicks the Save Article button ====
// ======== Unable to get this to work without it killing the scrape ===========

// $("#save").on("click", function() {
//
//     // Save the id
//     var thisId = $(this).attr("data-id");
//
//     // Now make an ajax call for the Article
//     $.ajax({
//         method: "GET",
//         url: "/articles/" + thisId
//     })
//     // With that done, add the note information to the page
//         .done(function(data) {
//             console.log(data);
//             // The title and link for article
//             $("#saved-articles").append("<h2>" + data.title + "</h2><p>" + data.link + "</p>");
//
//             };
// });

// When you click the savenote button
//=====Can't use/test this until I get the Save Article button working ===========

// $(document).on("click", "#savenote", function() {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");
//
//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//         method: "POST",
//         url: "/articles/" + thisId,
//         data: {
//             // Value taken from title input
//             title: $("#titleinput").val(),
//             // Value taken from note textarea
//             body: $("#bodyinput").val()
//         }
//     })
//     // With that done
//         .done(function(data) {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $("#notes").empty();
//         });

//     $("#titleinput").val("");
//     $("#bodyinput").val("");
// });
