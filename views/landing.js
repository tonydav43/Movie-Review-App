<% include partials/header %>

<!DOCTYPE html>
<html>

<head>
    <title>The Movie Review App</title>
  
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="stylesheet/app2.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript" async></script>/
</head>

<body id="landingPage">
  
<div class="jumbotron">
    <h1 class="display-3">Welcome to the Movie Review Page</h1>
  
      <p class="lead">This is a page where you can read someone elses personal movie review or even make your own. Please feel free to search for a movie in the search bar, however, to be able to create, 
        edit or delete reviews, you must be a registered user, so go ahead and join, it is free and easy.
        <br>
         I hope you enjoy this site as much as I enjoyed making it.
    </p>

  <h6>Note: You can view all reviews and comments, but you can only edit or delete reviews or   comments that you have created</h6>

        <hr class="my-2">

    <p class="paraText">
        Use the links below or at the top to navigate the site.
    </p>
 
    <p class="lead">
        <a class="btn btn-custom-landing btn-lg" href="/movies/" role="button">All Reviews</a>
        <a class="btn btn-custom-landing btn-lg" href="/movies/new" role="button">New Review</a>
  </p>
</div>
  
    <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    
<% include partials/footer %>

