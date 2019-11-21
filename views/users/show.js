<% include ../partials/header %>

<body id="profilePage">
	
<div id="profileContainer" class="container">
	<div id="profileRow" class="row align-items-center">
		<div class="col-md-12" id="cardProfile" class="card">
			<div class="card-body profilePage">	
				<div>
					<img id="profileImage" class="img-thumbnail mx-auto d-block" 
					img src=" <%= user.avatar %>" alt="User Profile Image">
				</div>
					<hr>
				<i class="fas fa-user"></i> 
				<h5 class="card-title">Username - <%= user.username %></h5>
					<hr>
			<div class ="card-text">
    			<i class="fas fa-user-tie"></i> <h5>First Name - <%= user.firstName %></h5>
  					<hr>
				<i class="fas fa-user-tie"></i> <h5>Last Name - <%= user.lastName %></h5>
  					<hr>
				<i class="fas fa-envelope-square" ></i> <h5>Email Address - 
				<a href="mailto:<%= user.email %>"><%= user.email %><a/></h5>
					<hr>
				<i class="fas fa-ticket-alt"></i> 
				<h5>Reviews added by - <%= user.username %>
					<% reviews.forEach(function(movie){  %>
					<li class="profileReviews">
					<a href="/movies/<%= movie.id %>"><%= movie.title %></a>
					</li>
					<% }); %>
				</h5>
					<hr>
				<form id="show" action="/users/<%= user._id %>?_method=DELETE"
					  method="POST">
				<% if(currentUser && user._id.equals(currentUser._id)){%> 
					<a href="/users/<%= user._id %>/edit"
					 class="btn btn-xs btn-success">Edit Profile
					</a>
					<button class="btn btn-xs btn-danger">Delete Profile</button>	
				</form>
				<% } %>
				</div>
			</div>
		</div>
	</div>
</div>

<% include ../partials/footer %>
	
	