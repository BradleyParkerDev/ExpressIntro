// Bring in Express code
const express = require('express')

const app = express()
const port = 3000

app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
  title: "Star Wars",
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}, {
  title: "The Avengers",
  starRating: 4,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}];

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/all-movies',(req,res)=> {
    
    res.json({
        success: true,
        allMovies: favoriteMovieList
    })
})

// using titleToFind didnt work, I used title instead
app.get("/single-movie/:title", (req, res)=>{
	const singleMovie = favoriteMovieList.find((movie)=>{
		return movie.title === req.params.title
	})

	res.json({
		success: true,
		singleMovie: singleMovie
	})
})

app.post("/new-movie",(req,res)=>{
    
    // Validation code for checking that the incoming data to be created is of the proper shape and has the required fields.
	if (req.body.title === undefined || typeof(req.body.title) !== "string") {
		res.json({
			success: false,
			message: "Movie title is required and must be a string"
		})
		return
	}
	if (req.body.starRating === undefined || typeof(req.body.starRating) !== "number" || req.body.starRating <= 0 || req.body.starRating > 5){
		res.json({
			success: false,
			message: "Movie rating is required and must be a number"
		})
		return
	}
	if (req.body.isRecommended === undefined || typeof(req.body.isRecommended) !== "boolean"){
		res.json({
			success: false,
			message: "Movie recommendation is required and must be a boolean"
		})
		return
	}
    
    const newMovie = {};
    newMovie.title = req.body.title
    newMovie.starRating = req.body.starRating
    newMovie.isRecommended = req.body.isRecommended
    newMovie.createdAt = new Date()
    newMovie.lastModified = new Date()
    favoriteMovieList.push(newMovie)

    res.json({
        success: true
    })
})

app.put("/update-movie/:title", (req,res)=>{

    const titleToUpdate = req.params.title


	const originalMovie = favoriteMovieList.find((movie)=>{
		return movie.title === titleToUpdate
	})
	const originalMovieIndex = favoriteMovieList.findIndex((movie)=>{
		return movie.title === titleToUpdate
	})

	if (!originalMovie) {
		res.json({
			success: false,
			message: "Could not find movie in favorite movie list"
		})
		return
	}

	const updatedMovie = {}

	if (req.body.title !== undefined){
		updatedMovie.title = req.body.title
	} else {
		updatedMovie.title = originalMovie.title
	}

	if (req.body.starRating !== undefined){
		updatedMovie.starRating = req.body.starRating
	} else {
		updatedMovie.starRating = originalMovie.starRating
	}

	if (req.body.isRecommended !== undefined){
		updatedMovie.isRecommended = req.body.isRecommended
	} else {
		updatedMovie.isRecommended = originalMovie.isRecommended
	}
    updatedMovie.createdAt = originalMovie.createdAt;
    updatedMovie.lastModified = new Date();
	favoriteMovieList [originalMovieIndex] = updatedMovie

    res.json({
        success: true
    })
})
app.delete("/delete-movie/:title",(req,res)=>{
	const movieTitleToDelete = req.params.title

	const movieIndex = favoriteMovieList.findIndex((movie)=>{
		return movie.title === movieTitleToDelete
	})

	favoriteMovieList.splice(movieIndex, 1)

	res.json({
		success: true
	})    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})