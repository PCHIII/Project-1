
$(document).ready(function() {


    //$("#")          
    $('#modalhome').modal('show');
    
    $(".submitBtn").on("click", function() {

        var titleSearchTerm = $("#inputTitle").val().trim();
        var charSearchTerm = $("#inputChar").val().trim();
        

        console.log(titleSearchTerm);
        

        var movieURL = "https://www.omdbapi.com/?t="+titleSearchTerm+"&apikey=trilogy";
        var bookURL = "https://www.googleapis.com/books/v1/volumes?q="+titleSearchTerm;

       $.ajax({
           url: movieURL,
           method: "GET"
       }).then(function(res) {
            
        console.log(res);

        var movieDiv = $("<div>");

        var moviePoster = $("<img src="+res.Poster+">").css({"margin-bottom":"10px"});
        var movieTitle = $("<h4>"+res.Title+"</h4>");
        var movieYear = $("<p>Released Date: "+res.Year+"</p>");
        var movieRating = $("<p>Rating: "+res.Ratings[0].Value+"</p>");
        var movieDirector = $("<p>Director: "+res.Director+"</p>");
        var plot = $("<p>Plot: "+res.Plot+"</p>");

        movieDiv.append(moviePoster, movieTitle, movieYear, movieRating, movieDirector, plot);
        $("#filmapi").append(movieDiv);

       });

     
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

       var bookPoster = $("<img>");
       bookPoster.attr("src", poster);
       bookPoster.attr("alt", "thumbnail unavailable");
       var bookTitle = $("<p>Title: "+title+"</p>");
       var bookAuthor = $("<p>Author: "+author+"</p>");
       var bookDate = $("<p>Date Published: "+date+"</p>");

       var summaryDiv = $("<div>").append(bookTitle, bookAuthor, bookDate);
 
      summaryDiv.css({"float":"right"});

       bookDiv.append(bookPoster, summaryDiv);
        
       
       bookDiv.css({"margin-bottom":"10px"});
       $("#bookapi").append(bookDiv);
    }
    });



    });








});

