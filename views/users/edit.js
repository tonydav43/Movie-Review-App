<% include ../partials/header %>

<body id="editProfilePage">
<script> 
	
$(function(){
  $('[data-toggle="popover"]').popover()
});	
	
</script>
	
<div id="editProfileContainer" class="container">
	<div id="editProfileRow" class="row align-items-center">
		<div class="col-md-12" id="showCardBackground4">
			<div id="editCardProfile" class="card">
				<div class="card-body">
					<form action="/users/<%= user._id %>?_method=PUT" 
					 method="POST">
					<h2 id="editProfile">Edit <%= user.username %></h2>
			<div>
				<p id="editParagraphProfile">
				<label for="avatar">Image</label>
				</p>
				<input id="editInputProfile" type="text" name="user[avatar]"
				id="avatar" value="<%=user.avatar %>" data-container="body" 
				data-toggle="popover" data-trigger="focus" data-placement="right" 
				data-content="This site is not setup for file uploads, so please
				only paste a url image link here,for example upload your image to
				postImage.org and then paste the share link in the avatar url
				box. If you dont add a image url, then a default profile image
				will be used. (Click anywhere in the box to dismiss this
				message)">
			</div>			
			<div>
				<p id="editParagraphProfile">
				<label for="userName">Username</label></p>
				<input id="editInputProfile" type="text" name="user[username]"
				id="userName" value="<%=user.username %>" required minlength="4"
				maxlength="10" data-container="body" data-toggle="popover" 
				data-trigger="focus" data-placement="right" 
				data-content="Any characters but the length must be between 5 and 
				10 characters. (Click anywhere in the box to dismiss this
				message)">
			</div>		
			<div>
				<p id="editParagraphProfile">
				<label for="firstName">First Name</label></p>
				<input id="editInputProfile" type="text" name="user[firstName]"
				id="firstName" value="<%=user.firstName %>" required>
			</div>			
			<div>
				<p id="editParagraphProfile">
				<label for="lastName">Last Name</label></p>
				<input id="editInputProfile" type="text" name="user[lastName]"
				id="lastName" value="<%=user.lastName %>" required>
			</div>			
			<div>
				<p id="editParagraphProfile">
					<label for="email">Email</label></p>
				<input id="editInputProfile" type="text" name="user[email]"
				id="email" value="<%=user.email %>" required>	
			</div>
					<div id="editProfileButtonCenter">
						<input type="submit" class="btn btn-custom-edit btn-lg">
					</div>
					</form>
				<div>
			</div>	
		</div>
	</div>
</div>			
				
<% include ../partials/footer %>
	