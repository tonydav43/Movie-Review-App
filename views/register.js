<% include partials/header %>

<body id="registerPage">
  
<script>  
    $(document).ready(function () {
      $('#signUpPage').modal({
           backdrop: 'static',
           keyboard: false
      })
   });
  
$(function(){
  $('[data-toggle="popover"]').popover()
});
  
</script>
  
<form action="/register" method="post">
  <!-- Modal -->
<div class="modal" id="signUpPage" tabindex="-1" role="dialog" 
   aria-labelledby="signUpPage" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div id="registerModal" class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="signUpPage">Register</h4>
        <button type="button" class="close" data-dismiss="modal" 
     aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
<div class="modal-body">
  
    <div class="form-group">  
      <i class="fas fa-user"></i>
      <label for="username">Username</label>
        <input type="text" class="form-control" name="username"
      id="username" placeholder="Not your email address)" required
      minlength="4" maxlength="10"
      data-container="body" data-toggle="popover" data-trigger="focus"
      data-placement="right" data-content="Any characters but the length
      must be between 5 and 10 characters. (Click anywhere in the box to
      dismiss this message)">
  </div>
  <div class="form-group">
      <i class="fas fa-lock"></i> 
        <label for="password">Password</label>
        <input type="password" class="form-control" name="password"
      id="password" placeholder="Head#1235" required
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}"
      data-container="body" data-toggle="popover"  data-trigger="focus"
      data-placement="right" data-content="Password must between 6 and 20
      characters and must include at least 1 number between 1 and 9, 1 
      lowercase and 1 uppercase letter.
      (Click anywhere in the box to dismiss this message)"> 
  </div>
   <div class="form-group">
      <i class="fas fa-user-tie"></i> 
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" name="firstName"
      id="firstName" placeholder="John" required>
  </div>
  <div class="form-group">
    <i class="fas fa-user-tie"></i> 
      <label for="lastName">Last Name</label>
      <input type="text" class="form-control" name="lastName"
      id="lastName" placeholder="Smith" required>
  </div>
  <div class="form-group">
    <i class="fas fa-envelope-square"></i> 
      <label for="email">Email Address</label>
      <input type="email" class="form-control" name="email" id="email"
    placeholder="johndoe@hotmail.com" required>
  </div>
  <div class="form-group">
    <i class="fas fa-portrait"></i> 
      <label for="avatar">Avatar</label>
      <input type="image" class="form-control" name="avatar" id="avatar"
    placeholder="Avatar url" data-container="body" data-toggle="popover"
    data-trigger="focus" data-placement="right" data-content="This site is
    not setup for file uploads, so please only paste a url image link here,
    for example upload your image to postImage.org and then paste the share
    link in the avatar url box. If you dont add a image url, then a default
    profile image will be used. (Click anywhere in the box to dismiss this
    message)">
  </div>
  <div class="form-group">
    <i class="fas fa-user-cog"></i> 
      <label for="adminCode">Admin Login Code</label>
      <input type="text" class="form-control" name="adminCode" id="adminCode"
    placeholder="Admin Code" data-container="body" data-toggle="popover" 
    data-trigger="focus" data-placement="right" data-content="This section
    is to be used if you have been allocated admin rights and have the admin
    register code">
  </div>
  
</div>  
    <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-success">Register Now</button>
      </div>
    </div>
  </div>
</div>
</form>

<% include partials/footer %>

