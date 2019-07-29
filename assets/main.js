$(document).ready(function() {

    var movieDivisEmpty = true;
    var bookDivisEmpty = true;
    var invalidInput = $(".warningText");

    //$("#")          
    $('#modalhome').modal('show');


    $(".pagebtn").on("click", function() {
       invalidInput.html("");
    });

    $(".material-icons").on("click", function() {
       invalidInput.html("");
    });

    
    $("#inputTitle").on("keyup", function(event) {
         if (event.keyCode === 13) {
            event.preventDefault();
            $(".submitBtn").click();
         }
    });

    $("#inputChar").on("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $(".submitBtn").click();
        }
    });
    
   $(".submitBtn").on("click", function(e) {

    if ((movieDivisEmpty && bookDivisEmpty) == false)
     {
        $("#filmapi").empty();
        $("#bookapi").empty();

        movieDivisEmpty = true;
        bookDivisEmpty = true;

     }

        var titleSearchTerm = $("#inputTitle").val().trim();
        var charSearchTerm = $("#inputChar").val().trim();

        $("#inputChar").val("");
        $("#inputTitle").val("");
           

     if (titleSearchTerm) {

        invalidInput.html("");
        var movieURL = "https://www.omdbapi.com/?t="+titleSearchTerm+"&apikey=trilogy";
        var bookURL = "https://www.googleapis.com/books/v1/volumes?q="+titleSearchTerm;


        //Returns movie
       $.ajax({
           url: movieURL,
           method: "GET"
       }).then(function(res) {
            
        console.log(res);
        var movie = res;

        var movieDiv = $("<div>");

        var moviePoster = $("<a href='"+res.Website+"' target='_blank'><img src="+movie.Poster+"></a>").css({"margin-bottom":"10px"});

        var movieTitle = $("<h5>"+movie.Title+"</h5>");
        var movieYear = $("<p class='authortext'>Released Date: "+movie.Year+"</p>");
        var movieRating = $("<p class='authortext'>Rating: "+movie.Rated+"</p>");
        var movieDirector = $("<p class='authortext'>Director: "+movie.Director+"</p>");
        var plot = $("<p class='authortext'>Plot: "+movie.Plot+"</p>");

        movieDiv.append(moviePoster, movieTitle, movieYear, movieRating, movieDirector, plot);
        $("#filmapi").append(movieDiv);

       });

       
       //Returns books
       $.ajax({
        url: bookURL,
        method: "GET"
        }).then(function(res) {
         
       console.log(res);

        for(i=0;i<res.items.length;i++) {
         var book = res.items[i];
         var bookDiv = $("<div>")

        //Put any field that references "volumenInfo" in this conditional
        if (book.volumeInfo) {
            var poster = "";
            if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                poster = book.volumeInfo.imageLinks.thumbnail;
            }
            
            var author = "No author found :(";
            if ( book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ) {
                author = book.volumeInfo.authors[0];
            }

            var title = "Title not found :(";
            if (book.volumeInfo.title) {
                title = book.volumeInfo.title;
            }

            var date = "Publish date not found :(";
            if (book.volumeInfo.publishedDate) {
                date = book.volumeInfo.publishedDate;
            }
        }

        //<a href='"+book.volumeInfo.infoLink+"'></a>

       var bookPoster = $("<img class='bookpic'>");
       bookPoster.attr("src", poster);
       bookPoster.attr("alt", "thumbnail unavailable");
       
       var bookLink = $("<a>");
       bookLink.attr("href", book.volumeInfo.infoLink);
       bookLink.attr("target", "_blank");
       bookLink.append(bookPoster);
       
       var bookTitle = $("<p class='booktext'>Title: "+title+"</p>");
       var bookAuthor = $("<p class='authortext'>Author: "+author+"</p>");
       var bookDate = $("<p class='datetext'>Date Published: "+date+"</p>");

       var summaryDiv = $("<div>").append(bookTitle, bookAuthor, bookDate);
 
       summaryDiv.css({"float":"right"});

       bookDiv.append(bookLink, summaryDiv);
        
       
       bookDiv.css({"margin-bottom":"10px"});
       $("#bookapi").append(bookDiv);
    }
    });
           movieDivisEmpty = false;
           bookDivisEmpty = false;
        }



          else if (charSearchTerm) {
            
            invalidInput.html("");
            var charURL = "https://openlibrary.org/search.json?q="+charSearchTerm;
            var bookResults = [];

            $.ajax({
                url: charURL,
                method: "GET"
            }).then(function (response) {

                console.log("I searched for: " + charSearchTerm)
            //  console.log(response)
            t = response.split("\"");
            for (var i = 0; i <t.length; i++){
                if (t[i].includes("title")){
                        bookResults.push(t[i+2]);
                    //console.log(t[i+2].trim(""));
                }
            }

            console.log(bookResults);
            var books = [];
            $.each(bookResults, function(i, e) {
                if ($.inArray(e, books) == -1) books.push(e);
            });

            console.log(books);

             //Traverse books array and return movies from OMBD api
             for (i=0;i<books.length;i++) {
                
                var movieURL = "https://www.omdbapi.com/?t="+books[i]+"&apikey=trilogy";

                $.ajax({
                    url: movieURL,
                    method: "GET"
                }).then(function(res) {
                     
                 console.log(res);
                 var movie = res;
         
                 var movieDiv = $("<div>");
         
                 var moviePoster = $("<a href='"+res.Website+"' target='_blank'><img src="+movie.Poster+"></a>").css({"margin-bottom":"10px"});

                 var movieTitle = $("<h5>"+movie.Title+"</h5>");
                 var movieYear = $("<p class='authortext'>Released Date: "+movie.Year+"</p>");
                 var movieRating = $("<p class='authortext'>Rating: "+movie.Rated+"</p>");
                 var movieDirector = $("<p class='authortext'>Director: "+movie.Director+"</p>");
                 var plot = $("<p class='authortext'>Plot: "+movie.Plot+"</p>");
         
                 if (movie.Title != undefined){
                    movieDiv.append(moviePoster, movieTitle, movieYear, movieRating, movieDirector, plot);
                    $("#filmapi").append(movieDiv);
                }
         
                });
            }

            //Traverse books array and returns books from google api
              for (i=0;i<books.length;i++) {
                var bookURL = "https://www.googleapis.com/books/v1/volumes?q="+books[i];

                $.ajax({
                    url: bookURL,
                    method: "GET"
                    }).then(function(res) {
                     
                   console.log(res);
            
                    for(i=0;i<res.items.length;i++) {
                     var book = res.items[i];
                     var bookDiv = $("<div>")
            
                    //Put any field that references "volumenInfo" in this conditional
                    if (book.volumeInfo) {
                        var poster = "";
                        if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                            poster = book.volumeInfo.imageLinks.thumbnail;
                        }
                        
                        var author = "No author found :(";
                        if ( book.volumeInfo.authors && book.volumeInfo.authors.length > 0 ) {
                            author = book.volumeInfo.authors[0];
                        }
            
                        var title = "Title not found :(";
                        if (book.volumeInfo.title) {
                            title = book.volumeInfo.title;
                        }
            
                        var date = "Publish date not found :(";
                        if (book.volumeInfo.publishedDate) {
                            date = book.volumeInfo.publishedDate;
                        }
                    }
            
                    
                   var bookPoster = $("<img class='bookpic'>");
                   bookPoster.attr("src", poster);
                   bookPoster.attr("alt", "thumbnail unavailable");
                   
                   var bookLink = $("<a>");
                   bookLink.attr("href", book.volumeInfo.infoLink);
                   bookLink.attr("target", "_blank");
                   bookLink.append(bookPoster);
                   
                   var bookTitle = $("<p class='booktext'>Title: "+title+"</p>");
                   var bookAuthor = $("<p class='authortext'>Author: "+author+"</p>");
                   var bookDate = $("<p class='datetext'>Date Published: "+date+"</p>");
            
                   var summaryDiv = $("<div>").append(bookTitle, bookAuthor, bookDate);
             
                  summaryDiv.css({"float":"right"});
            
                   bookDiv.append(bookLink, summaryDiv);
                    
                   
                   bookDiv.css({"margin-bottom":"10px"});
                   $("#bookapi").append(bookDiv);
                }
                });
              }
            });
        
            movieDivisEmpty = false;
            bookDivisEmpty = false;
        }

        else if ((charSearchTerm && titleSearchTerm) === "") {
            e.stopPropagation();
            console.log("Checks inputs");
            invalidInput.html("Please enter valid input");
        }

    });

});