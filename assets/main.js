
$(document).ready(function() {


    //$("#")          
    $('#modalhome').modal('show');
    
    $(".submitBtn").on("click", function() {

        var titleSearchTerm = $("#inputTitle").val().trim();


        
        var charSearchTerm = $("#inputChar").val().trim()
        

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
       var bookDiv = $("<div>")

       
        var poster = res.items[i].volumeInfo.imageLinks.thumbnail;
       //console.log(poster);
         //if (res.items[i].volumeInfo.imageLinks.thumbnail ===undefined) {
           // var bookPoster = $("<img>");
         //}

        // else {
              
             //console.log("EXISTS!!!!")
        // }

       var bookPoster = $("<img class='bookpic' src="+poster+">");
       var bookTitle = $("<p id='title'>Title: "+res.items[i].volumeInfo.title+"</p>");
       var bookAuthor = $("<p>Author: "+res.items[i].volumeInfo.authors[0]+"</p>");
       var bookDate = $("<p>Date Published: "+res.items[i].volumeInfo.publishedDate+"</p>");

       var summaryDiv = $("<div>").append(bookTitle, bookAuthor, bookDate);
 
     summaryDiv.css({"float":"right"});

       bookDiv.append(bookPoster, summaryDiv);
        
       
       bookDiv.css({"margin-bottom":"10px"});
       $("#bookapi").append(bookDiv);
    }
    });



    });








});

