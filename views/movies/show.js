<% include ../partials/header %>

<body id="showPage">
	
<div id="showContainer" class="container">
	<div id="showRow" class="row align-items-center">
		<div class="col-md-12">
			
<div class="card-block ">
	<div id="showCardBackground1" class="card">
		<img id="showImage" 
		class="img-thumbnail mx-auto d-block" 
		img src=" <%= movie.image %>">
					
		<div class="card-body text-center">
			<div class="titleTagShow">
				<h2><%= movie.title %></a></h2>
			</div>	
				
			<ul class="list-group list-group-flush">
    			<li class="list-group-item">
				Director - <%= 	movie.director %>
				</li>
    			<li class="list-group-item">
					Movie added by - <a href="/users/<%= movie.author._id %>">
					<%= movie.author.username %>
					<img src="<%= movie.author.avatar %>" 
					class="profileImageMovieShow"></a>
				</li>
  			</ul>
			<p><%= movie.review %></p>
			<span>Added on - <%= moment(movie.createdAt).format("DD:MM:YYYY"); %></span>
		</div>
			<form id="show" action="/movies/<%= movie._id %>
				?_method=DELETE" method="POST">
					<a href="/movies/<%= movie._id %>/comments/new"
					class="btn btn-custom-show">Add a comment</a>
				<% if(currentUser && movie.author._id.equals(currentUser._id) 
				|| currentUser && currentUser.isAdmin){%> 
					<a href="/movies/<%= movie._id %>/edit"
					class="btn btn-custom-show">Edit</a>
					<button class="btn btn-custom-show">Delete</button>	
			</form>
		<% } %>
	</div>
</div>
		</div>
	</div>
</div>

<div class="container">
	<div id="showCardBackground2" class="card">	
		<h5 id="showComments">Comments for the movie "<a><%= movie.title %>"</a></h5>
			<hr>
		<% movie.comments.forEach(function(comment){ %>
		<div class="row">
			<div class="col-md-12">
			Comment submitted by - <a href="/users/<%= comment.author._id %>">
			<strong><%= comment.author.username %></strong>
<img src="<%= movie.author.avatar %>" class="profileImageCommentShow">
			</a>
<span 
	  class="float-right">Added - <%= moment(comment.createdAt).fromNow() %></span>
				<p id="showCommentText">
					<%= comment.review %>
				</p>
				
				<% if(currentUser && comment.author._id.equals(currentUser._id) 
				|| currentUser && currentUser.isAdmin){%>
					<a class="btn btn-xs btn-success" 
				href="/movies/<%= movie._id %>/comments/<%= comment._id %>/edit">
						Edit
					</a>
				<form id="deleteCommentButton" action="/movies/<%=movie._id
				%>/comments/<%=comment._id %>?_method=DELETE" method="POST">
            		<input type="submit" class="btn btn-xs btn-danger" value="Delete">	
				</form>
				<% } %>
				<hr>
			</div>
		</div>				
		<% }); %>
	</div>
</div>

<% include ../partials/footer %>

	



