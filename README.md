# Term 2 Final Project @CodeImmersives

## Got questions? Send me an email: <a href="mailto:nikolay.kim@codeimmersives.com?Subject=Hello" target="_top">Send Mail</a>

<hr>

[Unsplash API](https://unsplash.com/developers) - used to get random pictures

## This project consists of 2 parts:
1. [Backend](https://github.com/ignitikus/term-2-final-project-backend) - Node server with Express and MongoDB;
2. [Frontend](https://github.com/ignitikus/term-2-final-project-frontend) - React and Semantic UI

Node packages used in this project: 

Backend: 

1. [jsonwebtoken](https://jwt.io/) - secure communication between frontend and backend
2. [bcryptjs](https://www.npmjs.com/package/bcryptjs) - password encryption
3. [cors](https://www.npmjs.com/package/cors) - an Express middleware that can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
4. [mongoose](https://mongoosejs.com/) -  MongoDB object modeling tool designed to work in an asynchronous environment
5. [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js(alternative to [fetch](https://www.npmjs.com/package/fetch))

Frontend: 

1. [react-moment](https://www.npmjs.com/package/react-moment) - React component for the [moment](https://momentjs.com/) date library. Parse, validate, manipulate, and display dates and times in JavaScript
2. [react-confetti](https://www.npmjs.com/package/react-confetti) - Confetti without the cleanup
3. [react-image-puzzle](https://www.npmjs.com/package/react-image-puzzle) - React component for simple swap tile puzzle out of an image
4. [react-toastify](https://www.npmjs.com/package/react-toastify) - React-Toastify allow you to add notification to your app with ease
5. [react-webcam](https://www.npmjs.com/package/react-webcam) - Webcam component for React
6. [semantic-ui-react](https://react.semantic-ui.com/) - React version of Semantic UI framework

Available routes: \
<span style="color:orange">Token generated whenever user logins or registers. By default token doesn't have expiration date</span>
   * GET
      * `/randompic` - returns JSON of random picture from Unsplash API (Access key is required to use this API)
      * `/gallery/:token` - returns JSON with pictures from MongoDB for registered user. Token is used for validation on backend
   * POST
      * `/savepicture` - saves picture in DB and returns that picture JSON
      * `/savephoto` - saves photo from Photobooth component
      * `/login` - handles login and returns JSON Web Token and stores it in `localstorage` of the browser
      * `/register` - creates user in DB, returns JSON Web Token and stores it in `localstorage` of the browser
   * PUT
      * `/updatestatus` - changes status of a picture in DB
   * DELETE 
      * `/deletepicture/:token/:id` - deletes picture from DB

      
## How to make it work locally:
   1. Fork and clone both repos
   2. Install all dependencies (type `npm install` in respective directories)
   3. Create `.env` file in the root of backend folder
      * `.env` file holds all values that you want to hide from the user. 
      * Populate file with following: 
         >JWT_SECRET = 'any string' <br>
         >MONGODB_URI = 'path to your MongoDB storage' <br>
         >ACCESS_KEY = 'Access key from Unsplash'
   4. Now start both servers by typing `npm start` in both backend and frontend