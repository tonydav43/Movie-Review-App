const mongoose 				= require("mongoose"),
	  passportLocalMongoose	= require("passport-local-mongoose"),
	  Movie 				= require("./movie"), 
	  Comment 				= require("./comment") ;

const UserSchema = new mongoose.Schema({
	  username: {type: String, unique: true, required: true },
	  password: String,
	  avatar: {type: String, default: "/images/default-profile.jpg"},
	  firstName: String,
	  lastName: String,
	  email: {type: String, unique: true, required: true },
	  resetPasswordToken: String,
	  resetPasswordExpires: Date,
	  isAdmin: {type: Boolean, default: false}
});

UserSchema.pre("remove", async function(next) {
  try {
                  //Changed remove here to deleteMany
		  await Movie.deleteMany({ "author": this._id });
		  await Comment.deleteMany({ "author": this._id });
		  next();
  		} catch (err) {
      	console.log(err);
  	}
});
 
UserSchema.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("User", UserSchema);
