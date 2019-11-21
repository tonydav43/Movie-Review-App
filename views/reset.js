<% include partials/header %>

<body class="resetPasswordPage">
	
<script>
	
     $(document).ready(function () {
      $('#resetPasswordPage').modal({
           backdrop: 'static',
           keyboard: false
      })
   });
	
	$(function(){
  $('[data-toggle="popover"]').popover()
});
	
</script>

<form action="/reset/<%= token %>" method="POST">
	<div class="modal" id="resetPasswordPage" tabindex="-1" 
	role="dialog" aria-labelledby="resetPasswordPage" aria-hidden="true">
  		<div class="modal-dialog modal-dialog-centered" role="document">
    		<div id="passwordModal" class="modal-content">
      			<div class="modal-header">
        	<h4 class="modal-title" id="forgotPasswordPage">Reset Password</h4>
			<button type="button" class="close" data-dismiss="modal" 
			aria-label="Close"> <span aria-hidden="true">&times;</span>
			</button>
      			</div>
					<div class="modal-body">
						<div class="form-group">
						<i class="fas fa-unlock-alt"></i> 
						<label for="newPassword">New Password</label>
						<input type="password" class="form-control"
						name="password" id="newPassword" 
						placeholder="New Password"
						required autofocus="autofocus"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}"
						data-container="body" data-toggle="popover" 
						data-trigger="focus" data-placement="right" 
						data-content="Password must between 6 and 20 characters 
						and must include at least 1 number between 1 and 9, 1
						lowercase and 1 uppercase letter.(Click anywhere in the
						box to dismiss this message)">	
					
					<div class="form-group">
						 <i class="fas fa-unlock-alt"></i>
						<label for="confirmPassword">Confirm Password</label>
						<input type="password" class="form-control"
						name="confirm" id="confirmPassword"
						placeholder="Confirm Password" required
						autofocus="autofocus">
					</div>
					<div>
						<button type="button" class="btn btn-danger" 
						data-dismiss="modal">Cancel</button>
        				<button type="submit" class="btn btn-success">
						Update Password</button>
						</div>
					</div>		
				</div>
	  		</div>
		</div>
	</div>			
</form>		

<% include partials/footer %>