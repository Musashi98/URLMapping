# URL MAPPING

## Intallation

You should first install all the project dependencies. You can use the package manager you like, in my case I use npm, so my command to install the dependencies is:

    npm install

## Start the server

To run the server you need to have Node installed first. This was builded and tested with Node v15.8.0, but any other close to that one should work. Once installed, you just need to go either:

    node ./index.js

or, if you preffer:

    npm start

When the script is executed, it will first try to connect to the database, and, if succesfully, it will start the server. If any error occurs the console should display it.

## About the API

Only one endpoint was created. You just only send your url to this endpoint, short or long, the controller will determine its length assuming short urls are only 22 bytes (22 characters), and respond according to the corresponding length.

To test the endpoint you can make a request to: SERVER_ADDRESS/mapping/?url=SOME_URL, where SERVER_ADDRESS is the address (ip and port) of the server executing the app, and SOME_URL is the url, long or short, that you want to map.

    e.g. http://127.0.0.1:5000/mapping/?url=www.us.com/iwhkjsndqgwhjebwqmbqwhgkajhsdajhvjqhefwqwfekvwdkvqwe

The previous address is an example of request, using a local server and an example url.

## How the API works

The created endpoint will take the given url, classify it in short or long, separate his prefix from the rare string in his back, and take the rare string to check in the database for a correspondent pair of the other length. If the pair is found, the endpoint will return it in the response object's body, if not, depends on the url length, if it is short it will throw a 404 error saying the given url does'nt have a long match, and if it is long, a short random string is generated (watching for non existance in the database) and sended back after inserted the new mapping data to the database.

## Configuration file

A configuration file is given as an example. There, you can configure the service port, the db connection string, the expiration time of the generated short urls, and the url fixed prefixes.

These last configuration variables where created because there was no info given in the problem statement about the long and short prefix, so it was assumed they could vary. If they dont vary they should be specified within this variables, but if they do this variables should be set to empty strings. The purpose of this variables is to speed up the url separation process.

The database connection string given is completelly functional, but you can set your own connection string there and should work.

## Limitations

There are some limitations of this app to take in count when used:

- When you change the expiration time in the .env config file, the generationTime ttl index needs to be replaced in the database for the automatic document deletion to take place with this new expiration value.
- It was assumed that the url does'nt come with strange characters, it will search in the database anyways, but unexpected behavior may occur.
