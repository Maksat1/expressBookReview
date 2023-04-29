const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// register user
public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
      if(!isValid(username)) {
          users.push({"username":username, "password":password})
          return res.status(200).json({message: "User successfully registered"})
      } else {
        res.send(users)
          return res.status(404).json({message: "User already exists"})
      }
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  if (books[isbn]) {
    res.send(books[isbn])
  } else {
    return res.send(`ISBN ${isbn} not found`)
  } 
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author
  const booksByAuthor = []
    
  for (let key of Object.keys(books)) {
    if (books[key].author === author) {
      booksByAuthor.push(books[key])
    }
  }
  console.log(booksByAuthor)
  res.send(booksByAuthor)
})

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  for (let key of Object.keys(books)) {
      if (books[key].title === title) {
          res.send(books[key])
      }
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  res.send(books[isbn]["reviews"])
});

module.exports.general = public_users;
