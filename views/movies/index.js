<% include ../partials/header %>

<body id="indexPage">
	
<div id="indexContainer" class="container">
	<div class="row">
		
	<% movies.forEach(function(movie) { %>
<div class="col-md-6 col-lg-4">	
	<div class="card-deck">
		<div id="cardBackground" class="card">
			<img class="img-thumbnail card-img-top"
			src=" <%= movie.image %>">
					
			<div class="card-body text-center">
				<div class="titleTagIndex">
					<a class="anchorTitle" href="/movies/<%= movie._id%>">
					<h2><%= movie.title %></h2></a>
				</div>	
				
				<ul class="list-group list-group-flush">
    				<li class="list-group-item">
					Director: <%= movie.director %>
					</li>
    				<li class="list-group-item">
					Movie added by:<br> <a href="/users/<%= movie.author._id %>">
						<%= movie.author.username %>
						<img src="<%= movie.author.avatar %>" 
						class="profile-imageIndex"></a>
					</li>
					<li class="list-group-item">
					Added on - <%= moment(movie.createdAt).format("DD:MM:YYYY"); %>
					</li>
  				</ul>
					<p id="reviewText" class="card-text">
					<%- movie.review.substring
					(0, 100) %>.....</p>
				
					<a id="anchorReadMore" href="/movies/<%= movie._id %>"
					class="btn btn-custom">Read More
					<i class="fas fa-chevron-right"></i>
					</a>
			</div>
		</div>
	</div>
</div>
	<% }); %>
	</div>	
</div>
					
<% include ../partials/footer %>