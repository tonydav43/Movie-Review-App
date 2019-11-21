<% include ../partials/header %>

<body id="newReviewPage">
	
<script>
    
$(function(){
  $('[data-toggle="popover"]').popover()
});
	
</script>

<div id="newContainerMovie" class="container">
	<div id="newRowMovie" class="row align-items-center">
		<div class="col-12">
	
	<div id="newCardMovie" class="card">
		<div class="card-body">
			<form action="/movies/" method="POST">
				
		<h2 id="newTitleMovie">Please enter the new movie details</h2>
				
			<div>
				<p id="newParagraphMovie">
				<label for="title">Title</label></p>
				<input id="newInputMovie" type="text" name="movie[title]"
				id="title" placeholder="Movie Title" required>
			</div>	
			<div >
				<p id="newParagraphMovie">
				<label for="image">Image</label></p>
				<input id="newInputMovie" type="text" name="movie[image]"
				id="image" placeholder="Movie url" required data-container="body" 
				data-toggle="popover" data-trigger="focus" data-placement="right" 
				data-content="This site is not setup for file uploads, so please 
				only paste a url image link here, so head over to google, find
				the movie, select an image, then right click and copy the image
				address and paste it in the url box. (Click anywhere in the box
				to dismiss this message)">
			</div>
			<div>
			<p id="newParagraphMovie">
				<label for="director">Director</label></p>
				<input id="newInputMovie" type="text" name="movie[director]"
				id="director" placeholder="Director" 
				required data-container="body" data-toggle="popover" 
				data-trigger="focus" data-placement="right" 
				data-content="Please enter only 1 directors name. (Click anywhere 
				in the box to dismiss this message)">
			</div>

			<div>
				<p id="newParagraphMovie">
				<label for="movieSynopsis">Movie Synopsis</label></p>
				<textarea id="newTextAreaMovie" name="movie[review]"
				id="movieSynopsis" placeholder="Movie Synopsis" required
				data-container="body" data-toggle="popover" data-trigger="focus"
				data-placement="right" data-content="Please head over to google
				to find the official movie synopsis and paste it here, your views
				can be left in the comments section. (Click anywhere in the box
				to dismiss this message)">
				</textarea>
			</div>
			
			<div id="newMovieButtonCenter">
				<input type="submit" class="btn btn-custom-new btn-lg">
			</div>
				
		</form>
	</div>
</div>
		</div>
	</div>
</div>

<% include ../partials/footer %>
	