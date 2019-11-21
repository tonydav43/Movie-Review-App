//This is where all the middleware resides

var Movie 			= require("../models/movie"),
	Comment 		= require("../models/comment"),
	User 			= require("../models/user"),
	middlewareObj 	= {};

//Function to check to see if user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that, please login and try again");
	res.redirect("/login");
}

//Function to see if the logged on user owns the profile	
   
//Function to see if the logged on user owns the review		
middlewareObj.checkReviewOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Movie.findById(req.params.id, function(err, foundReview){
			if(err || !foundReview) {
				req.flash("error", "Campground not found, please try again");
				res.redirect("back");
			} else {
	//If logged in, do they own the campground
				if(foundReview.author._id.equals(req.user._id) || req.user.isAdmin){
					next();
				} else {
					req.flash("error", 
		  			"You are not the owner of the review so you are not permitted to do that");
					res.redirect("back");
				}	
			}
		});
	} else {
	//If not then redirect
		req.flash("error", "You must be logged in to do that");
		res.redirect("/login");
	}	
}

//Function to check to see if user owns the comment
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment) {
				req.flash("error", "Comment not found, please try again");
				res.redirect("back");
			} else { 
	//If logged in, do they own the comment
				if(foundComment.author._id.equals(req.user._id)|| req.user.isAdmin ){
					next();
				} else {
					req.flash("error", 
		  			"You are not the owner of the review so you are not permitted to do that");
					res.redirect("/");
				}	
			}
		});
	} else {
	//If not then redirect
		req.flash("error", "You must be logged in to do that");
		res.redirect("/login");
	}	
}

//Function to check if the user owns the profile
middlewareObj.checkProfileOwnership = function(req, res, next){
	if(req.isAuthenticated()){
			User.findById(req.params.id, function(err, foundUser){
				if(err) {
					req.flash("error", "Something went wrong, please try again");
					res.redirect("/movies");
				} else {
//Does the user own the profile
					if(foundUser._id.equals(req.user.id) || req.user.isAdmin){
						next();
					} else {
						req.flash("error", "You do not have permission to do that");
						res.redirect("/movies");
					}
				}
			});
		} else {
//If not then redirect
		req.flash("error", "You must be logged in to do that");
		res.redirect("/login");
	}		
}

module.exports= middlewareObj;

/*Could use these 
var middlewareObject = {
	checkCampgroundOwnership = function(){	
	},	
	checkCommentOwnership = function(){	
	}	
};

or

module.exports = {
	checkCampgroundOwnership = function(){	
	},	
	checkCommentOwnership = function(){	
	}
};
*/