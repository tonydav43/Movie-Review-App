<% include ../partials/header %>

<body id="newCommentPage">

<div id="newContainerComment" class="container">
	<div id="newRowComment" class="row align-items-center">
		<div class="col-12">
	
	<div id="newCardComment" class="card">
		<div class="card-body">
			<form action="/movies/<%= movie._id %>/comments" method="POST">
				
	<h2 id="newTitleComment">Enter your comments for the movie <br>" <%= movie.title %>"</h2>
									
		<div id=newComment>
			<p id="newParagraphComment">
			<label for="movieComment">Movie Comment</label></p>
			<textarea id="newTextAreaComment" name="comment[review]" required
			id="movieComment" placeholder="max 100 characters" maxlength="100">
			</textarea>
		</div>
				
		<div id="newCommentButtonCenter">
			<input id="newCommentSubmit" type="submit" class="btn btn-custom-new btn-lg">
		</div>
				
		</form>
	</div>
</div>
		</div>
	</div>
</div>

<% include ../partials/footer %>