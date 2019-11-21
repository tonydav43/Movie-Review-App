const express 		= require("express"),
	  router  		= express.Router(),
	  Movie	  		= require("../models/movie"),
	  User	  		= require("../models/user"),
	  Comment 		= require("../models/comment"),
	  middleware 	= require("../middleware");
	
//Index Route, show all movies reviews
router.get("/movies", (req, res) => {
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
	//Find movies based on the search query
	Movie.find({title: regex}).populate("author").exec((err, allMovies) => {
		if(err) {
			req.flash("error", "Something went wrong, please try again");
		} else {
			if (allMovies.length === 0) {
            req.flash("error", "Sorry, there are no movies that match your query. Please try again or better still, why not add it to the movie site yourself.");
				return res.redirect("/movies/");
			}
			res.render("movies/index", {movies: allMovies});
		}
	});	
} else {
	//Get all movies from db
		Movie.find({}).populate("author").exec((err, allMovies) => {
			if(err) {
				req.flash("error", "Something went wrong, please try again");
			} else {
				res.render("movies/index", {movies: allMovies});
			}
		});
	}
});

//Create route, to create a new review
router.post("/movies", middleware.isLoggedIn, (req, res) => {
	//Create the review
	req.body.movie.review = req.sanitize(req.body.movie.review);
	Movie.create(req.body.movie, (err, newReview) => {
		if(err) {
			res.render("new");
		} else {
			newReview.author = req.user;
			//newReview.author.id = req.user._id;
			//newReview.author.username = req.user.username;
			newReview.save();
			req.flash("success", "Review successfully added");
			res.redirect("/movies");
		}
	});
});

//New route, takes you to a new review form
router.get("/movies/new", middleware.isLoggedIn, (req, res) => {
	res.render("movies/new");
});

//New route, takes you to a new review form
router.get("/movies/new", middleware.isLoggedIn, (req, res) => {
	res.render("movies/new");
});

//Show route, show more info on 1 review
router.get("/movies/:id", (req, res) =>{
	Movie.findById(req.params.id)
	.populate("author")
	.populate({path: "comments", populate: {path: "author", model:"User"}})
	.exec(function (err, foundReview) {
		if(err) {
			console.log(err);
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/");
		} else {
			res.render("movies/show", {movie: foundReview});
		}
	});
});


//Edit route, show 1 review to edit
router.get("/movies/:id/edit", middleware.checkReviewOwnership, (req, res) => {	
	Movie.findById(req.params.id, function(err, foundReview) {
		if(err){
			req.flash("error", "Something went wrong, please try again");
		} else {
			res.render("movies/edit", {movie: foundReview});
		}					
	});
});

//Update route, sends the edited data
router.put("/movies/:id", middleware.checkReviewOwnership, (req, res) => {
	req.body.movie.review = req.sanitize(req.body.movie.review);
	Movie.findByIdAndUpdate(req.params.id, req.body.movie, (err, updatedReview) => {
		if(err) {
			req.flash("error", "Something went wrong, please try again"); 
			res.redirect("/");
		} else {
		req.flash("success", "Review has been updated");	
		res.redirect("/movies");
		}
	});
});

//Delete review which also removes from db
router.delete("/movies/:id", middleware.checkReviewOwnership, (req, res, next) => {
	Movie.findById(req.params.id, (err, foundReview) => {
		if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/movies");
		} else {
			foundReview.deleteOne();
				req.flash("success", "Review has been deleted");
				res.redirect("/movies/");
			}
		});
    });

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;


	

//Delete review which also removes from db
/*router.delete("/movies/:id", middleware.checkReviewOwnership, function(req, res) {
	Movie.findById(req.params.id, function(err, foundReview) {
		if(err) {
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/movies");
		} else {
			//Delete related comments
		Comment.deleteMany({"_id": {$in: foundReview.comments}}, function(err){
                if(err){
			req.flash("error", "Something went wrong, please try again");
			res.redirect("/movies");
			}
			
		//Delete review
				foundReview.remove();
				req.flash("success", "Review has been deleted");
				res.redirect("/movies/");
				
            });
        }
    });
});*/