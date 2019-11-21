<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  /*<meta name="viewport" content="width=device-width, initial-scale=1">*/
  
  <title>The Movie Review App</title>
  
<link href="https://fonts.googleapis.com/css?family=Srisakdi" rel="stylesheet">

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  
<link rel ="stylesheet" type="text/css" href="/stylesheet/app2.css">

<script src="https://kit.fontawesome.com/db0c1da081.js"></script>
  
<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-custom">
  
  <button class="navbar-toggler custom-toggler" type="button" 
      data-toggle="collapse" data-target="#navbarToggler" 
      aria-controls="navbarToggler" aria-expanded="false" 
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  
<div class="collapse navbar-collapse" id="navbarToggler">
    <ul class="navbar-nav ">
      <li class="nav-item">
        <a class="nav-link" href="/">Home 
    <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/movies/">All Reviews</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/movies/new">New  Review</a>
      </li>
    </ul>
  <div id="mainHeader" class="form-inline container">
    <form action="/movies" method="GET">
      <input type="text" name="search" placeholder="Movie Search" class="form-control"
      size="40">
      <input id="searchBtn" type="submit" value="search" class="btn btn-info btn-default">
    </form>
  </div>
    
  <div class="nav navbar-nav navbar-right">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <%if(!currentUser){%>
        <li class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <%} else {%>
    <div id="currentUserDiv">
        <li class="nav-item">
      <a class="nav-link" href="/users/<%= currentUser._id %>">Signed in as 
      <strong><%= currentUser.username %></strong>
      <img src="<%= currentUser.avatar %>" class="profile-image">
      <% if(currentUser && currentUser.isAdmin){ %>
        <em>(Admin)</em>
      <% } %></a>
        </li>
    </div>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Logout</a>
        </li>
        <% } %>
      </ul>     
   </div>   
</div>
</nav>
  
<div id="headerAlert" class="container">
  <% if(error && error.length > 0) { %>
    <div class="alert alert-danger" role="alert">
      <%= error %>
    </div>
  <% } %>
  <% if(success && success.length > 0) { %>
    <div class="alert alert-success" role="alert">
      <%= success %>
    </div>
  <% } %>
</div>
  
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


/*Footer from here*/
<footer class="footer">
    <div class="container">
        <p class="display-6">&copy; 2019 Antony Davenport 
          <i class="fas fa-envelope"></i>
            <a class="footerLink" href="mailto:tonydav43@hotmail.co.uk?
          subject=Question on Movie Review Site"> Contact us 
        </a>
      <i class="fas fa-question"></i>
        <a class="footerLink" href="/faq">FAQ</a>
      </p>
     </div>
</footer>

</body>
</html>