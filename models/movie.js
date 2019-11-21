const mongoose = require("mongoose"),
	  Comment	 = require("./comment")	;

const MovieSchema = new mongoose.Schema({
	  image: String,
	  title: String,
	  director: String,
	  review: String,
	  createdAt: { type: Date, default: Date.now },
	  author: {
			  type: mongoose.Schema.Types.ObjectId,
			  ref: "User"
			  },
	  comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
  });

MovieSchema.pre("remove", async (next) =>{
	try {
		//Delete related comments
		await Comment.deleteMany({
			"_id": {
			$in: this.comments
		}
	});
		next();
	} catch(err){
		next(err);
	}
});

module.exports = mongoose.model("Movie", MovieSchema);