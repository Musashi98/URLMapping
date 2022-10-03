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

## About the API(s)

There are 3 endpoints, one to get the short url given a long one (does'nt generates it if dont exist), one to get the long url given the short version, and one to generate (and stores to database) the short url given a long url. The 3 endpoints receive the corresponding url as a query param named 'url'. The following are the routes for each endpoint:

- SERVER_ADDRESS/mapping/getShort/?url=SOME_URL
- SERVER_ADDRESS/mapping/getLong/?url=SOME_URL
- SERVER_ADDRESS/mapping/generateShort/?url=SOME_URL

Here SERVER_ADDRESS is the server address (ip:port) and SOME_URL is some URL to process by the endpoint.

    e.g. http://127.0.0.1:5000/mapping/getLong/?url=www.us.com/G1uH25iwO36

In this example case the request is sended to a local server and the endpoint used is to get the long version of the url 'www.us.com/G1uH25iwO36'.

## How the API works

The created endpoints will take the given url, separate his prefix from the rare string in his back, and take the rare string to check in the database for the corresponding action:

- The getShort endpoint will search if there is a short version in the database and send it in the request body, if not is sends a 404 status code.
- The getLong endpoint will search if there is a long url match in the database and send it in the request body, if not is sends a 404 status code.
- The generateShort endpoint will search if there is a short version in the database and send a 404 status code if positive, if not it generates a new one (watching for non existing ones), stores the long-short match in the database and sends the short version in the request body.

## Configuration file

A configuration file is given as an example. There, you can configure the service port, the db connection string, the expiration time of the generated short urls, and the url fixed prefixes.

These last configuration variables where created because there was no info given in the problem statement about the long and short prefix, so it was assumed they could vary. If they dont vary they should be specified within this variables, but if they do this variables should be set to empty strings. The purpose of this variables is to speed up the url separation process.

The database connection string given is completelly functional, but you can set your own connection string there and should work.

## Limitations

There are some limitations of this app to take in count when used:

- When you change the expiration time in the .env config file, the generationTime ttl index needs to be replaced in the database for the automatic document deletion to take place with this new expiration value.
- It was assumed that the url does'nt come with strange characters, it will search in the database anyways, but unexpected behavior may occur.
