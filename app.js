require('dotenv').config();

const express 			= require("express"),
	  expressSanitizer 	= require("express-sanitizer"),
	  methodOverride 	= require("method-override"),
	  app				= express(),
	  bodyParser 		= require("body-parser"),
	  mongoose  		= require("mongoose"),
	  flash				= require("connect-flash"),
	  passport			= require("passport"),
	  LocalStrategy		= require("passport-local"),
	  User				= require("./models/user"),
	  Movie				= require("./models/movie"),
	  Comment 			= require("./models/comment"),
	  movieRoutes 		= require("./routes/movies"),
	  indexRoutes		= require("./routes/index"),
	  commentRoutes		= require("./routes/comments");
	
let url = process.env.DATABASEURL || "mongodb://localhost:27017/movie_camp";
mongoose.connect(url, 
	{ useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
	});

app.set("view engine", "ejs"); 
mongoose.set("useFindAndModify", false);
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); 
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

//Passport Configuration
app.use(require("express-session")({ 
	secret: "My cats name is Jensen", //Can be anything
	resave: false,  //Need to have
	saveUninitialized: false  //Need to have
})); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //Part of passport local mongoose package
passport.serializeUser(User.serializeUser()); //Part of passport local mongoose package
passport.deserializeUser(User.deserializeUser()); //Part of passport local mongoose package

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);  
app.use(movieRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on Movie Review App " + process.env.PORT);
});

/*app.listen(3000, function() {
	console.log("Server is running Movies App on port 3000");
});*/