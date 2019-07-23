

var movieURL = "";
var bookURL = "";


$(document).ready(function () {

$("#search").on("click", function(e) {
   e.preventDefault();
    
   var input = $("#input").val().trim();
   console.log(input);
   movieURL = "https://www.omdbapi.com/?t="+input+"&apikey=trilogy";
   bookURL = "https://www.googleapis.com/books/v1/volumes?q="+input;

    $.ajax({
        url: movieURL,
        method: "GET"
    }).then(function(res) {
         console.log("------MOVIE OBJECT-----------")
         console.log(res);
    });

    $.ajax({
        url: bookURL,
        method: "GET"
    }).then(function(res) {
         console.log("------BOOK OBJECT------------")
         console.log(res);
    });
});


});