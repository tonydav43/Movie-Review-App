<% include ../partials/header %>

<body id="editPage">
	
<script>
	
$(function(){
  $('[data-toggle="popover"]').popover()
});
	
</script>

<div id="editContainerMovie" class="container">
	<div id="editRowMovie" class="row align-items-center">
		<div class="col-12">
			<div id="editCardMovie" class="card">
				<div class="card-body">
					<form action="/movies/<%= movie._id %>?_method=PUT"
					method="POST">
				<h2 id="editTitleMovie">Edit <%= movie.title %></h2>
			<div>
				<p id="editParagraphMovie">
				<label for="title">Title</label></p>
				<input id="editInputMovie" type="text" name="movie[title]"
				id="title" value="<%= movie.title %>">
			</div>
			<div >
				<p id="editParagraphMovie">
				<label for="image">Image</label></p>
				<input id="editInputMovie" type="text" name="movie[image]"
				id="image" value="<%= movie.image %>" 
				required= data-container="body" data-toggle="popover" 
				data-trigger="focus" data-placement="right" 
				data-content="This site is not setup for file uploads, so please 
				only paste a url image link here, so head over to google, find
				the movie, select an image, then right click and copy the image
				address and paste it in the url box. (Click anywhere in the box
				to dismiss this message)">
			</div>
			<div >
				<p id="editParagraphMovie">
				<label for="director">Director</label></p>
				<input id="editInputMovie" type="text" name="movie[director]"
				id="director" value="<%= movie.director %>" 
				required= data-container="body" data-toggle="popover" 
				data-trigger="focus" data-placement="right" 
				data-content="Please enter only 1 directors name. (Click anywhere 
				in the box to dismiss this message)">
			</div>		
			<div>
				<p id="editParagraphMovie">
				<label for="editMovieSynopsis">Edit movie synopsis</label></p>
				<textarea id="editTextAreaReview" name="movie[review]"
				id=editMovieSynopsis" data-container="body" data-toggle="popover"				 data-trigger="focus" data-placement="right" 
			    data-content="Please head over to google to find the official
				movie synopsis and paste it here, your views can be left in the
				comments section. (Click anywhere in the box to dismiss this
				message)"><%= movie.review %>
				</textarea>
			</div>			
			<div id="editMovieButtonCenter">
					<input type="submit" class="btn btn-custom-edit btn-lg">
			</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<% include ../partials/footer %>
	
	
	
	
	