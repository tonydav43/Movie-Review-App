<% include ../partials/header %>

<body id="editCommentPage">

<div id="editContainerComments" class="container">
	<div id="editRowComment" class="row align-items-center">
		<div class="col-12">
	
	<div id="editCardComment" class="card">
		<div class="card-body">
			<form action="/movies/<%= movie_id %>/comments/<%= comment._id%>
			?_method=PUT" method="POST">
					 	
		<h2 id="editCommentMain">Edit Comment</h2>
								
		<div id="editComment"><label for="editComment"></label>
			<input id="editCommentTextArea" type="textarea" id="editComment"
			name="comment[review]" value="<%= comment.review %>"maxlength="100">
		</div>
				
			<div id="editCommentButtonCenter">
				<input id="editCommentSubmit" type="submit" class="btn btn-custom-new btn-lg">	
			</div>
		</form>
	</div>
</div>
		</div>
	</div>
</div>

<% include ../partials/footer %>
	