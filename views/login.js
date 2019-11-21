<% include partials/header %>

<body class="loginPage">
  
<script>
  
     $(document).ready(function () {
      $('#loginPage').modal({
           backdrop: 'static',
           keyboard: false
      })
   });
  
</script>
  
<form action="/login" method="post">
  
  <!-- Modal -->
<div class="modal" id="loginPage" tabindex="-1" role="dialog" 
   aria-labelledby="loginPage" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div id="loginModal" class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="loginPage">Please login to continue</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
<div class="modal-body">
     <div class="form-group">
    <i class="fas fa-user"></i> 
    <label for="userName">User Name</label>
    <input type="text" class="form-control" name="username" 
    placeholder="User Name" id="userName" required>
    </div>
  <div class="form-group">
    <i class="fas fa-lock"></i> 
    <label for="password">Password</label>
    <input type="password" class="form-control" name="password" id="password"
    placeholder="Password" required>
  </div>
  </div>  
      <div class="modal-footer">
    <a href="/forgot">Forgot Password</a>
        <button type="button" class="btn btn-danger" 
    data dismiss="modal">Cancel</button>
      <button type="submit" class="btn btn-success">Login</button>
      </div>
    </div>
  </div>
</div>
</form>
  

<% include partials/footer %>