# Express Intro App

## Overview

- Create a simple express server capable of performing non-persisted CRUD (Create, Read, Update, Delete) operations. 
- The server should be capable of creating a movie via POST request
- The server should be capable of responding with the entire list of movies
- The server should be capable of responding with a single movie that has been looked up via title
- The server should be capable of updating a movie with new movie data
- The server should be capable of deleting a movie that has been looked up via title

## Instructions

### 1) Project Setup
- Go to github and create a new github repo
- In the Create a new repository screen, set the following options
	- Set Repository template to No template
	- Set the owner to yourself and the repository name as ExpressIntro
	- Leave the description blank
	- Set the repository to public
	- Leave Add a README file unchecked
	- Set the Add .gitignore template option to Node
	- Leave the Choose a license as None
- Click the Create repository button
- In the repository screen, click the green <> Code dropdown button, copy the url that shows under the Local -> Clone -> HTTPS tab. It should look something like 
	- 
	```
	https://github.com/your-git-username/ExpressIntro.git
	```
- Open a new terminal window on your computer, cd into the folder where you keep your CodeImmersives repositories and clone the ExpressIntro repository to your local file system with the following command:
	- 
	``` 
	git clone https://github.com/WDI-201/ExpressIntro.git
	```
- cd into the ExpressIntro folder
- Initialize the folder as an npm project with the following command
	- 
	```
	npm init -y
	```
	- _Commentary_: This command will create a package.json file in your repository. The package.json is a special file used by npm to track meta info about your project such as what libraries you have installed, the project name, start scripts you have defined, etc. The -y flag will skip the initial prompt of defining some of your project fields such as project name, version, etc.
- Install the express and nodemon npm packages with the following command
	- 
	```
	npm install express nodemon
	```
	- _Commentary_:
		- If you look inside your package.json file now, you should see express, nodemon and body-parser listed as dependencies. A project dependency is a package/library that is required for your application to run. When you install a package, all the code for that package is downloaded into the node_modules folder in your project. 
		- Node_modules tend to be very large folders/files. In web development, teams of developers will collaborate by downloading each others repository code. If every developer had to download all the node_modules every time they cloned a repository, it would take a lot of time and network bandwith to do so.
		- So in order to avoid this problem, we ignore the node_modules folder via the .gitignore file. Open the .gitignore file in your repository and skim through it. Every filename listed here will be ignored by git when you make a commit. If you see the '*' symbol, that stands for wildcard and will match any name. *.log for instance will ignore all files that end in .log. 
		- Note how in the .gitignore file node_modules is listed. Thus, when you commit your code to github, the node_modules folder and all subfolders inside of it will be ignored. So when dev teams download each others repositories, there will be no node_modules folder. The first step that developers will do when downloading a new repository is to run the 'npm install' command. This command will look at all the dependencies listed in the package.json file and download the corresponding npm package into your local file system. This pattern allows developers to add npm packages to their projects without needing to send the files through github.
- Create a new file called app.js in your ExpressIntro folder. 
	- _Optional_: The terminal command for creating a new file is touch {file-name}. So the following command would create an app.js file.
		- 
		```
		touch app.js
		```
- Add the following starter code to the app.js file
	- 
	```
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

		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`)
		})
	```
- Open your package.json file and find the object listed under "scripts", it should look like this:
	- 
	```
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	}
	```
- Add a new script called "start" and set the value as "nodemon app.js"
	-
	```
	"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
		"start": "nodemon app.js"
  }
	``` 
	- _Commentary_: In a repository that has been initialized by npm, we can run predefined commands listed in the "scripts" of our package.json file by running the terminal command "npm {command-name}". Usually the command that is most often used is the "start" command which is used to start the project. In this case, we have defined the start command to run the terminal commands "nodemon app.js". Therefore, when we run the terminal command "npm start" it will run "nodemon app.js" and start our server.
- To test that all of this is working, run the "npm start" command in your terminal. You should see some nodemon output as well as the line "Example app listening on port 3000". This means your server is running and you can verify it by visiting localhost:3000 in your web browser. You should see the text "Hello World!" on it.
- Press control-c in the terminal to stop the server. Control-c can be used at any time in a terminal window to stop a process. 
	- _Note_: Avoid exiting out of a terminal before a process has been stopped. Exiting out of the terminal closes the terminal window but does not necessarily stop the process itself. Use control-c to stop a process before exiting out of a terminal window. 
- Commit your code and push your changes to github with the following commands
	- 
	```
		git add .
		git commit -m "Initial Commit"
		git push
	```
	- _Commentary_: 
		- The command "git add ." will stage all modified files in the current directory so that they can be committed to git. You can verify that the files had been added by running the "git status" command. Green files are the files that will be included in the commit, red files are files that will not be included in the commit. 
		- The "git commit -m" command will create a new git commit. Git commits require a message be given to the commit. The -m flag allows you to add a message as a string to the commit. 
		- Git push will push the commit from your local file system to your repository on github.
		- It is good practice to commit and push often, think of it as if you were saving a file except now your code is saved on github as well as your computer.
- Start your server again by running "npm start"
- Create a new postman collection called ExpressIntro	
- Create a new request in the ExpressIntro collection that makes a request to "localhost:3000/", title this request "index route". Send the request and verify that "Hello World!" is recieved in the response. 

- _Approach_: For all the following routes, we will using the following approach to develop them.
	1. Create a Postman request that can send a HTTP request to the new route.
	2. Create a new route in the app.js file. These new routes should go below the "/" route:
		- 
		```
		app.get('/', (req, res) => {
			res.send('Hello World!')
		})
		```
	 and above the app.listen() function:
	 - 
	 ```
	 app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
	 ```
	- _Note_: When coding in a route, it is useful to test the variables and code you write with console.logs as you go. 
		- To do this, make sure that at the end of the route you have either res.json({}) or res.send(''). This will ensure that you can make a request to the route without having the request hang (getting no response from the server). 
		- Then send a request to the route with Postman. If you see a 404 Not Found error, that means your route was unable to be found. In that case, check that the route name in express and the route name in the url are both correct.
		- Once you have the above setup, you should be able to add console.logs in the route handler function, make a request to that particular route, and see the console.log output appear in the server terminal.

## High Level Instructions

### 2) Read Routes

- Create a new Postman request in the ExpressIntro collection called "all-movies". This request should make a GET request to localhost:3000/all-movies.
- Create a new GET route that has the path "/all-movies". Inside the route handler function, implement the following:
	- Respond to the request by sending the favoriteMovieList array.
- Test this route by sending the "all-movies" postman request and verifying that the favoriteMovieList array is returned in the response.

- Create a new Postman request in the ExpressIntro collection called "single-movie". This request should make a GET request to localhost:3000/single-movie/Star Wars.
- Create a new GET route that has the path "/single-movie/:titleToFind". Inside the route handler function, implement the following:
	- Get the titleToFind property from the request route params.
	- Iterate through the favoriteMovieList array and find the movie object that has the title matching the titleToFind from the route params. 
		- _Hint_: There are many ways to accomplish this functionality. You can use a for loop to loop through favoriteMovieList and assign the matching movie to a variable. You can also use an array method such as .findIndex() to find the index of the matching movie and assign the movie to a new variable with square bracket notation.
	- Respond to the request with the found movie.

### 3) Create Routes

- Create a new Postman request in the ExpressIntro collection called "new-movie". This request should make a POST request to localhost:3000/new-movie. In the Body section of the request set the input type dropdown to raw and then set the format type to JSON. Write a new JSON object in the body of one of your favorite movies with the following format:
	- 
	```
		{
			"title": {String},
			"starRating": {Number},
			"isRecommended": {Boolean}
		}
	```
	- _Commentary_: This POST request will send the JSON movie object to the server inside the request body. When it comes to creating new data in the server, typically the data is sent in the body of a POST request. Once the data is received by the server, it is processed and then saved to a database.
- Create a new POST route that has the path "/new-movie". Inside the route handler function, implement the following:
	- Create a new object that has the following properties representing a new movie:
		- title: {String}. Set this property equal to the title property being sent through the POST request body. 
		- starRating: {Number}. Set this property equal to the starRating property being sent through the POST request body. 
		- isRecommended: {Boolean}. Set this property equal to the isRecommended property being sent through the POST request body. 
		- createdAt: {Date}. Set this property equal to a new date object.
		- lastModified: {Date}. Set this property equal to a new date object.
		- _Commentary_: When we save objects to a database (which we will eventually do), it is good practice to keep track of when a particular object was created and when it was last modified. In the case of creating a totally new object, we're setting both fields to be the current date and time.		
	- Push the new movie object into the favoriteMovieList.
	- Respond to the request at the end of the route with an object that has the property "success" set to true
		- _Commentary_: When sending a response that performed some sort of operation that either created or updated data, we want to indicate whether or not the operation was a success. There are many reasons for why a data update operation was unsuccessful, maybe the data was invalid or maybe the database failed to properly update. By responding with success: true or success: false, we are letting the client that made the request know if their data was saved or not. Typically, after a client receives a successful or unsuccessful request, it will display a message to the user informing them of their request status.
- Test that this route is working properly by sending the "new-movie" POST request with Postman with a new movie in the request body. Then send a GET request to the "all-movies" route to see if your new movie made it into the favoriteMovieList array.	

### 4) Update Routes

- Create a new Postman request in the ExpressIntro collection called "update-movie". This request should make a PUT request to localhost:3000/update-movie/{your-movie-title} (replace {your-movie-title} with the title of the movie you created in the "new-movie" request). In the Body section of the request set the input type dropdown to raw and then set the format type to JSON. Write a new JSON object in the body with the following format. The values for title, starRating and isRecommended should be different than the ones you had for "new-movie".
	- 
	```
		{
			"title": {String},
			"starRating": {Number},
			"isRecommended": {Boolean}
		}
	```
- Create a new PUT route that has the path "/update-movie/:titleToUpdate". Inside the route handler function, implement the following:
	- Get the title of the movie to update from the request route params.
	- Iterate through the favoriteMovieList array to find the object representing the original version of the movie and assign it to a variable.
		- _Hint_: Use the .findIndex() method to find the index of the original movie by looking for an object whose title matches the title coming from the route params. Then get the object by using square bracket notation.
	- Create a new object representing the updated version of the movie. 
	- For the fields title, starRating and isRecommended, check to see if the value is defined on the request body. If it is, set that value on the updated movie object. If it isn't, set the original value of the field on the updated movie object.
		- _Commentary_: The idea here is to create an object that has either the original value for the movie or the updated value. If the value has been provided in the request body, then we take that as the updated value. If the value has not been provided in the request body, then we want to keep the original value.
	- For the field createdAt, set this to the original value of createdAt in the updated movie object. 
		- _Commentary_: Since createdAt represents the datetime when we created the movie, we do not want to override this value on an update.
	- For the field lastModified, set this to a new date object.
		- _Commentary_: Since lastModified represents the datetime when we last modified the object, we want to update this field with a new datetime.
	- Overwrite the original movie object in the favoriteMovieList array with the updated movie object.
	- Respond to the request at the end of the route with an object that has the property "success" set to true.
- Test that this route is working properly by sending the "update-movie" PUT request with Postman with the updated movie values in the request body. Then send a GET request to the "all-movies" route to see if your movie was updated in the favoriteMovieList array.	

### 5) Delete Routes

- Create a new Postman request in the ExpressIntro collection called "delete-movie". This request should make a DELETE request to localhost:3000/{your-movie-title} (replace {your-movie-title} with the title of the movie you created in the "new-movie" request or the new title you gave that movie in the "update-movie" request).
- Create a new DELETE route that has the path "/delete-movie/:titleToDelete". Inside the route handler function, implement the following:
	- Get the title of the movie to delete from the request route params.
	- Iterate through the favoriteMovieList array to find the index of the object whose title matches the title to delete.
	- Remove the movie at the found movie index.
	- Respond to the request at the end of the route with an object that has the property "success" set to true.
- Test that this route is working properly by sending the "delete-movie" DELETE request with Postman. Then send a GET request to the "all-movies" route to see if your movie was updated in the favoriteMovieList array.	

## Expanded Instructions

### 2) Read Routes

- Create a new Postman request in the ExpressIntro collection called "all-movies". This request should make a GET request to localhost:3000/all-movies.
- Create a new GET route that has the path "/all-movies". Inside the route handler function, implement the following:
	- Pass favoriteMovieList into the res.json() method to send the current favoriteMovieList as a response.
- Test this route by sending the "all-movies" postman request and verifying that the favoriteMovieList array is returned in the response.

- Create a new Postman request in the ExpressIntro collection called "single-movie". This request should make a GET request to localhost:3000/single-movie/Star Wars. 
- Create a new GET route that has the path "/single-movie/:titleToFind". Inside the route handler function, implement the following:
	- Use the titleToFind property on the req.params object to get the movie title and assign it to a variable titleToFind.
	- Create a new variable called foundMovie. Set foundMovie equal to favoriteMovieList.find(). 
		- _Commentary_: The .find() method works by looping over the array that you call it upon and running the callback function on every item in the array. The callback function must return either true or false. If the callback function returns true for an item, it means the item has been found and .find() will return the found item. If the callback function returns false, then the item will be skipped and .find() will continue looking through the array for a match.
	- Pass a callback function into favoriteMovieList.find(). The callback function should have movie as its first parameter. [1]
	- Inside the callback function, add a condition that checks to see if movie.title is equal to titleToFind. If they are equal, return true. Else return false. [2]
	- Respond with the found movie using the res.json() method. [3]

### 3) Create Routes

- Create a new Postman request in the ExpressIntro collection called "new-movie". This request should make a POST request to localhost:3000/new-movie. In the Body section of the request set the input type dropdown to raw and then set the format type to JSON. Write a new JSON object in the body of one of your favorite movies with the following format:
	- 
	```
		{
			"title": {String},
			"starRating": {Number},
			"isRecommended": {Boolean}
		}
	```
	- _Commentary_: This POST request will send the JSON movie object to the server inside the request body. When it comes to creating new data in the server, typically the data is sent in the body of a POST request. Once the data is received by the server, it is processed and then saved to a database.
- Create a new POST route that has the path "/new-movie". Inside the route handler function, implement the following:
	- Create a new variable called newMovie that is an object. 
	- Set the title, starRating and isRecommended properties on newMovie to the corresponding values coming from the request body using the req.body object. [4]
	- Set the createdAt and lastModified properties to a new date timestamp using new Date(). The method new Date() will create a new date object that will resolve to be a timestamp of the current date and time. [5]
		- _Commentary_: When we save objects to a database (which we will eventually do), it is good practice to keep track of when a particular object was created and when it was last modified. In the case of creating a totally new object, we're setting both fields to be the current date and time.
	- Push the new movie object into the favoriteMovieList.
	- Send a response at the end of the route indicating successful creation of a new movie. To do this, pass an object with the property "success" set to true into the res.json() method. [6]
		- _Commentary_: When sending a response that performed some sort of operation that either created or updated data, we want to indicate whether or not the operation was a success. There are many reasons for why a data update operation was unsuccessful, maybe the data was invalid or maybe the database failed to properly update. By responding with success: true or success: false, we are letting the client that made the request know if their data was saved or not. Typically, after a client receives a successful or unsuccessful request, it will display a message to the user informing them of their request status.
- Test that this route is working properly by sending the "new-movie" POST request with Postman with a new movie in the request body. Then send a GET request to the "all-movies" route to see if your new movie made it into the favoriteMovieList array.	

### 4) Update Routes

- Create a new Postman request in the ExpressIntro collection called "update-movie". This request should make a PUT request to localhost:3000/update-movie/{your-movie-title} (replace {your-movie-title} with the title of the movie you created in the "new-movie" request). In the Body section of the request set the input type dropdown to raw and then set the format type to JSON. Write a new JSON object in the body with the following format. The values for title, starRating and isRecommended should be different than the ones you had for "new-movie".
	- 
	```
		{
			"title": {String},
			"starRating": {Number},
			"isRecommended": {Boolean}
		}
	```
- Create a new PUT route that has the path "/update-movie". Inside the route handler function, implement the following:
	- Get the title of the movie to update from the req.params and assign it to a variable titleToUpdate.
	- Use the .findIndex() method on favoriteMovieList to find the index of the movie object whose title matches titleToUpdate and store that in a variable called originalMovieIndex. 
	- Create a new variable originalMovie and assign it the value of the object at the originalMovieIndex position in the favoriteMovieList array.
	- Create a new variable called updatedMovie and set it equal to an object.
	- Add an if condition that checks to see if title on the req.body object not equal to undefined. If it is not equal to undefined, then set the title property on updatedMovie equal to req.body.title. Else, set the title property on updatedMovie equal to originalMovie.title. [7]
	- Add an if condition that checks to see if starRating on the req.body object not equal to undefined. If it is not equal to undefined, then set the starRating property on updatedMovie equal to req.body.starRating. Else, set the starRating property on updatedMovie equal to originalMovie.starRating.
	- Add an if condition that checks to see if isRecommended on the req.body object not equal to undefined. If it is not equal to undefined, then set the isRecommended property on updatedMovie equal to req.body.isRecommended. Else, set the isRecommended property on updatedMovie equal to originalMovie.isRecommended.
	- _Commentary_: The idea here is to create an object that has either the original value for the movie or the updated value. If the value has been provided in the request body, then we take that as the updated value. If the value has not been provided in the request body, then we want to keep the original value.
	- Set the createdAt property of updatedMovie to be equal to originalMovie.createdAt.
		- _Commentary_: Since createdAt represents the datetime when we created the movie, we do not want to override this value on an update.
	- Set the lastModified property of updatedMovie to be equal to a new date object using new Date().
		- _Commentary_: Since lastModified represents the datetime when we last modified the object, we want to update this field with a new datetime.
	- Overwrite the original movie object in the favoriteMovieList array with updatedMovie using originalMovieIndex in square bracket notation.[8]
	- Respond to the request at the end of the route with a success object by passing an object with the property success equal to true into the res.json() method.
- Test that this route is working properly by sending the "update-movie" PUT request with Postman with the updated movie values in the request body. Then send a GET request to the "all-movies" route to see if your movie was updated in the favoriteMovieList array.	

### 5) Delete Routes

- Create a new Postman request in the ExpressIntro collection called "delete-movie". This request should make a DELETE request to localhost:3000/{your-movie-title} (replace {your-movie-title} with the title of the movie you created in the "new-movie" request or the new title you gave that movie in the "update-movie" request).
- Create a new DELETE route that has the path "/delete-movie/:titleToDelete". Inside the route handler function, implement the following:
	- Get the title of the movie to delete from the req.params and assign it to a variable titleToDelete.
	- Use the .findIndex() method on favoriteMovieList to find the index of the movie object whose title matches titleToDelete and store that in a variable called deleteMovieIndex. 
	- Use the .splice() method on favoriteMovieList to remove the object at the deleteMovieIndex index.
	- Respond to the request at the end of the route with an object that has the property "success" set to true.
- Test that this route is working properly by sending the "delete-movie" DELETE request with Postman. Then send a GET request to the "all-movies" route to see if your movie was updated in the favoriteMovieList array.	
	

**********STRETCH_GOALS**********
1. Add validation code to the /new-movie route. This code should perform the following checks on the new movie data coming from the request body object.
	- title is defined and is a string
	- starRating is defined and is a number greater than 0 and less than 5
	- isRecommended is defined and is a boolean
If any of the above checks fail, respond to the request with an object containing success: false and a message indicating what went wrong. I.E. if starRating is a string, the route should respond with a message stating "starRating is required and must be a number"

2. Add a query param to the /all-movies request. The key should be starRating and the value should be a number between 0 and 5. Add code in the /all-movies route that filters any movie whose starRating is below the value entered for the query param.


## Code References
- [1]:
```
const foundMovie = favoriteMovieList.find((movie)=>{})
```
- [2]:
```
const foundMovie = favoriteMovieList.find((movie)=>{
	if (movie.title === titleToFind) {
		return true
	} else {
		return false
	}
})
```
- [3]:
```
res.json(foundMovie)
```
- [4]:
```
const newMovie = {}
newMovie.title = req.body.title
newMovie.starRating = req.body.starRating
newMovie.isRecommended = req.body.isRecommended
```
- [5]:
```
newMovie.createdAt = new Date()
newMovie.lastModified = new Date()
```
- [6]:
```
res.json({
	success: true
})
```
- [7]:
```
if (req.body.title !== undefined) {
	updatedMovie.title = req.body.title
}
```
- [8]:
```
favoriteMovieList[originalMovieIndex] = updatedMovie;
```