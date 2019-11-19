# Anthology - Book Collector
Anthology Book Collector React application that integrates with
Google Books API to fetch book information.  It also keeps track of
which books have been loaned out and allows a user to update
book information to be stored on their local DB.  It currently
uses [My JSON Server](https://my-json-server.typicode.com/) as a 
temporary backend, and would require a permenant storage solution
for production build.

* [Instructions](#instructions)
* [Prerequisites](#prerequisites)
* [Built With](#built-with)
* [Contributing](#contributing)
* [Example](#example)
* [Authors](#authors)

## Instructions

1. Clone Anthology repo.
2. Modify .env.development for 'json-server' URL location (for development build)
3. Modify .env.production for your GitHub JSON data location (for production build)
4. Create a .env.local file that includes your own Google Books API key:  ```REACT_APP_API_KEY=<Your key here>```
5. Install NPM Packages using ```npm install```
6. If running development, start json-server.  Ex.  ```json-server db.json --port 5000```
7. Run with ```npm start```

## Prerequisites
1. To run as a development build, it requires an instance of 
the NPM package *json-server* to serve book data.  
2. To run as a production build, it 
requires a public GitHb repository with the books JSON data
available.
See setup at [MY JSON Server](https://my-json-server.typicode.com/).
3. A valid Google Books API key.  See [Google Books API](https://developers.google.com/books)

## Built With
[React](https://reactjs.org/)
and other great NPM packages.  See package.json for full list.

## Contributing
Feel free to fork into your own repo to add additional features.

## Example
As of this writing an example of the application can be located at:

https://anthology.watersjournal.com/

## Authors
[Daniel Waters](https://www.watersjournal.com)
