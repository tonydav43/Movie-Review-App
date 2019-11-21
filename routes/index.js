const express 		= require("express"),
	  router 		= express.Router(),
	  passport 		= require("passport"),
	  User 			= require("../models/user"),
	  Movie			= require("../models/movie"),
	  Comment		= require("../models/comment"),
	  middleware 	= require("../middleware"),
	  async 		= require("async"),
	  nodemailer	= require("nodemailer"),
	  crypto		= require("crypto");

//Home page GET
router.get("/", (req, res) => {
	res.render("landing"); 
});

//Authorisation Routes

//Show register form GET
router.get("/register", (req, res) =>{
	res.render("register");
});

//Handle register logic POST
router.post("/register", (req, res) =>{
	//Could use var newUser = new User({req.body});
	var newUser = new User({
			username: req.body.username,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			avatar: req.body.avatar
		});
	if(req.body.adminCode === process.env.USERADMIN){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, (err, user) =>{
		if(err){
			req.flash("error",  "Email or username is already taken");
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () =>{
			req.flash("success", "Welcome to the Movie Review " + user.username);
			res.redirect("/movies")
		});
//Send welcome email to the user
	const smtpTransport = nodemailer.createTransport( {
   service: "hotmail",
   auth: {
       user: "tonydav43@hotmail.co.uk",
       pass: process.env.HOTMAILPW
   }
});
smtpTransport.sendMail({  
   from: "tonydav43@hotmail.co.uk",
   to: newUser.email, 
   subject: "Welcome to the Movie Review Site", 
   html: '<p>Hi <em>' + user.username + 
'</em></p><p>Welcome to the Movie Review Site, we hope you enjoy your time here, and if you have any questions, please contact the admin department by <a href="mailto:tonydav43@hotmail.co.uk?subject=Movie Review App Question">clicking here</a></p>' + 
'<br/><img src="https://stedwardedge.com/wp-content/uploads/2017/11/Fall-Movie-Review.jpg"> <p>Thanks the Movie Review App team'
}, (err, response) =>{  
   	if(err){
       		console.log(err);
	   		} else {
			console.log("Message sent");
	   		}   
		});
	});
});

//Show login form GET
router.get("/login", (req, res) =>{
	res.render("login");
});

//Show login form GET
router.get("/login", (req, res) =>{
	res.render("login");
});

//Handle login logic POST
router.post("/login",  (req, res, next) => {
  passport.authenticate("local",
    {
		successRedirect: "/movies",
		failureRedirect: "/login",
		failureFlash: "Invalid username or password.",
		successFlash: "Welcome back to the Movie review " + req.body.username
	})(req, res);	
});

//Logout route GET
router.get("/logout", (req, res) =>{
	req.logout();
	req.flash("success", "Successfully logged you out");
	res.redirect("/movies");
});

//Forgot passsword GET
router.get("/forgot", (req, res) =>{
	res.render("forgot");
});

//Forgot password post
router.post("/forgot", (req, res, next) => {
	async.waterfall([ //This is an array of functions, called 1 after the other
		(done) => {
			crypto.randomBytes(20, (err, buf) => {
				let token = buf.toString("hex");
				done(err, token); //This is the token sent to the user
			});
		},
		//Search for users email address
		(token, done) => {
			User.findOne({email: req.body.email}, (err, user) => {
				if(!user) {
					req.flash("error", "No account with that email address exists");
					return res.redirect("/forgot");
				}
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 360000; //1 hour
				
				user.save((err) => {
					done(err, token, user);
					});
				});
			},
//Send the email to the user
//Need HOTMAILPW=yourpassword node app.js to hide password, also install dotenv npm
//Create a .gitignore file at root level, add .env to it, then add HOTMAILPW=your password.
				(token, user, done) => {
					const smtpTransport = nodemailer.createTransport({
						service: "hotmail",
						auth: {
							user: "tonydav43@hotmail.co.uk",
							pass: process.env.HOTMAILPW 						
						}
					});
const mailOptions = {
	to: user.email,
	from: "tonydav43@hotmail.co.uk",
	subject: "Movie App Password Reset",
	text: "Hi " + user.email + "\n\n" + 
	"A request to reset your Movie App password has been made. If you did not make this request then simply ignore this email, but if you did make the request then please click on the following link, or copy & paste it into your browser to complete the process \n\n" +  "http://" + req.headers.host + "/reset/" + token + "\n\n" +
"Thanks the Movie App team"
			};
				smtpTransport.sendMail(mailOptions, (err) => {
				console.log("Email Sent");
				req.flash("success", "An email has been sent to " + user.email + " with further instructions");
					done (err, "done");
				});
			}
		], (err) => {
				if(err) return next(err);
				res.redirect("/forgot");
	 });	
});

//Reset password GET
router.get("/reset/:token", (req, res) => {
	User.findOne({resetPasswordToken: req.params.token, 
	resetPasswordExpires: {$gt: Date.now()}}, (err, user) => {
		if(!user) {
			req.flash("error", 
			"The password reset token is invalid or has expired, please try again");
			res.redirect("/forgot");
		}
		res.render("reset", {token: req.params.token});
	})
});

//Reset password/:token POST
router.post("/reset/:token", (req, res) => {
	async.waterfall([
		(done) => {
			User.findOne({resetPasswordToken: req.params.token, 
			resetPasswordExpires: {$gt: Date.now()}}, (err, user) => {
				if(!user) {
				req.flash("error", 
				"The password reset token is invalid or has expired, please try again");
				return res.redirect("back");
				}
				if(req.body.password === req.body.confirm) {
					user.setPassword(req.body.password, (err) => {
						user.resetPasswordToken = undefined;
            			user.resetPasswordExpires = undefined;
						
						user.save((err) => {
							req.login(user, (err) => {
								done(err, user);
							});
						});
					});
				} else {
					req.flash("error", "The passwords do not match.");
            		return res.redirect('back');
				}
			});
		},
		(user, done) => {
			const smtpTransport = nodemailer.createTransport({
				service: "hotmail",
				auth: {
						user: "tonydav43@hotmail.co.uk",
						pass: process.env.HOTMAILPW 						
					  }
				});
		const mailOptions = {
			to: user.email,
			from: "tonydav43@hotmail.co.uk",
			subject: "Your password has been changed",
			html: '<p>Hi <em>' + user.username + '</em></p>' + '\n\n' + '<img src="https://www.a3communications.com/images/easyblog_shared/August_2016/8-1-16/password_sharing_felony_400.jpg">' + '\n\n' + '<p>This is a confirmation that the password for your account registered to <strong> ' + user.email + '</strong> has just been changed.' + '\n\n' + '<p>Thanks the Movie Review App team'   
			};
			smtpTransport.sendMail(mailOptions, function(err) {
        	req.flash("success", "Your password has been changed.");
        	done(err);
			});
		}
	], (err) => {
		res.redirect("/movies");
	});			
});

//User profiles GET
router.get("/users/:id", (req, res) =>{
	User.findById(req.params.id, (err, foundUser) =>{
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/movies");
		} else {
			Movie.find().where("author").equals(foundUser._id).exec((err, reviews) =>{
				if(err){
					req.flash("error", "Something went wrong, please try again");
					res.redirect("/movies");
				} else {
					res.render("user/show", {user: foundUser, reviews: reviews});
				}
			});		
		}
	});
});

//Edit user GET
router.get("/users/:id/edit", middleware.checkProfileOwnership, (req, res) => {
	User.findById(req.params.id, (err, foundUser) =>{
		res.render("user/edit", {user: foundUser});	
	});
});
    
//Update user profile PUT
router.put("/users/:id", middleware.checkProfileOwnership, (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedProfile) => {
		if(err) {
			req.flash("error", "Something went wrong, please try again"); 
			res.redirect("/movies");
		} else {
		req.flash("success", "Your profile has been updated");	
		res.redirect("/movies/");
		}
	});
});

//Delete user profile and associated comments and reviews DELETE
router.delete("/users/:id", middleware.checkProfileOwnership, (req,res) =>{
    User.findById(req.params.id, (err, user) =>{
        if(err){
            req.flash("error", err.message);
            res.redirect("/movies/" + req.params.id);
        } else {
			user.remove();
            req.flash("success", "Your user profile and any associated reviews and  comments have been deleted. Thank you for using the Movie Review webpage, we hope you enjoyed your time here and please feel free to return, as you are always welcome here");
            res.redirect("/movies");
        }
    });
}); 

//FAQ route
router.get ("/faq", (req, res) => {
	res.render("faq");
});
		
module.exports = router;


//Delete user profile
/*router.delete("/users/:id", middleware.checkProfileOwnership, function(req, res) {
	User.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/");
		} else {
			req.flash("success", "Profile has been deleted");
			res.redirect("/movies/");
		}
	});
});*/

		

