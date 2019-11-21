<% include partials/header %>

<body class="forgotPasswordPage">
	
<script>
	
     $(document).ready(function () {
      $('#forgotPasswordPage').modal({
           backdrop: 'static',
           keyboard: false
      })
   });
	
</script>

<form action="/forgot" method="POST">
	<div class="modal" id="forgotPasswordPage" tabindex="-1" role="dialog" 
	aria-labelledby="forgotPasswordPage" aria-hidden="true">
  		<div class="modal-dialog modal-dialog-centered" role="document">
    		<div id="passwordModal" class="modal-content">
      			<div class="modal-header">
        	<h4 class="modal-title" id="forgotPasswordPage">Forgot Password</h4>
			<button type="button" class="close" data-dismiss="modal" 
			aria-label="Close"> <span aria-hidden="true">&times;</span>
			</button>
      			</div>
					<div class="modal-body">
						<div class="form-group">
							 <i class="fas fa-unlock-alt"></i> 
							<label for="email">Email</label>
							<input type="email" class="form-control" name="email"
							id="email" placeholder="Email Address" required
							autofocus="autofocus">
						</div>
						<div>
							<button type="button" class="btn btn-danger" 
							data-dismiss="modal">Cancel</button>
        					<button type="submit" 
							class="btn btn-success">Submit</button>
						</div>		
				</div>
	  		</div>
		</div>
	</div>			
</form>		

<% include partials/footer %>
