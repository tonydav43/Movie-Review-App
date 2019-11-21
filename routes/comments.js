const express 		= require("express"),
	  router 		= express.Router(),
	  Movie			= require("../models/movie"),
	  Comment		= require("../models/comment"),
	  User			= require("../models/user"),
	  middleware 	= require("../middleware");

//New route, takes you to a new comment form
router.get("/movies/:id/comments/new", middleware.isLoggedIn, (req, res) =>{
//find campground by id
	Movie.findById(req.params.id, (err, movie) =>{
		if(err){
			req.flash("error", "Something went wrong, please try again");
		} else {
			res.render("comments/new", {movie: movie});
		}
	});
});

router.post("/movies/:id/comments", middleware.isLoggedIn, (req, res) =>{
//Lookup review using id
	Movie.findById(req.params.id, (err, movie) =>{
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/");
		} else {
			//Create new comment
			Comment.create(req.body.comment, (err, comment) =>{
				if(err){
					req.flash("error", "Something went wrong, please try again");
				} else {
					//Add username and id to comment
					comment.author= req.user;
					//Save comment
					comment.save();
					//Connect new comment to review
					movie.comments.push(comment);
					movie.save();
					req.flash("success", "Comment successfully added");
					//Redirect to movie showpage
					res.redirect("/movies/" + movie._id);
				}
			});
		}
	});
});

//Comments edit route
router.get("/movies/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res) =>{
	Comment.findById(req.params.comment_id, (err, foundComment) =>{
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("back");
		} else {
			res.render("comments/edit", {movie_id: req.params.id, comment: foundComment});
		}
	});	
});

//Comments update route
router.put("/movies/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("back");
		} else {
			res.redirect("/movies/" + req.params.id);
		}
	});
});

//Delete route which also removes from db
router.delete("/movies/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res) =>{
	Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("back");
		} else {
			//Remove comment id from the movies db
			Movie.findByIdAndUpdate(req.params.id, {
				$pull: {comments: req.params.comment_id}
			}, (err, data) =>{
				if(err){
				req.flash("error", "Could not delete the comment");
				res.redirect("back");
			} else {
				req.flash("error", "Comment has been successfully deleted");
				res.redirect("/movies/" + req.params.id);
			}
            });
        };
    });
});

module.exports = router;

//Delete route original (does not remove from db)
/*router.delete("/movies/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("back");
		} else {
			res.redirect("/movies/" + req.params.id);
		}
	});
});*/


//Delete route which also removes from db but not the comments
/*router.delete("/movies/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("back");
		} else {
			//Remove comment id from the movies db
			Movie.findByIdAndUpdate(req.params.id, {
				$pull: {comments: req.params.comment_id}
			}, function(err, data){
				if(err){
				req.flash("error", "Could not delete the comment");
				res.redirect("back");
			} else {
				req.flash("error", "Comment has been successfully deleted");
				res.redirect("/movies/" + req.params.id);
			}
            });
        };
    });
});*/