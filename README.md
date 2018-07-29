# MyReads Project

This project expands upon the static webpage provided in the starter files to create a React Book Lending App. The prebuilt backend API is used to deliver a unique experience to each user, allowing them to view books on their shelves, search for and recategorize books from a library. the available search terms are somewhat limited but still provide a good assortment of books to work with.

## TL;DR

To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Using the app

To begin with, start up the development server by following the instructions above in a command line interface while in the top level directory of the project. This directory should contain folders named 'src' and 'node_modules'.

When the server is up and running it will launch a webpage, or you can manually open one using the web address [localhost:3000]("http://localhost:3000")

## Main functions of the App

### Bookshelves

The App consists of three bookshelves, **"Currently Reading"**, **"Want To Read"** and **"Read"**. Some pre-selected books will appear on these shelves on your first visit to the site, but changes you make will be saved to the Udacity BooksAPI. The arrow button in the bottom right of each book cover will allow you to select which shelf you wish to move a book to, plus the option of **"None"** for removing the book entirely.

### Search

The **"+"** button in the bottom right of the main page will take you to the [search page](http://localhost:3000/search). Using the search field at the top of the search page will allow you to check for books either by *Title* or *Author*. The results of your search will appear below and behave as they do on your own shelves. The maximum number of results visible is capped at 20.
You can use the arrow selector to move a book onto one of your saved shelves.

(It should be noted that the BooksAPI that the search form uses has a limited number of applicable search terms)

## Custom functionality

### Disabled selectors

When selecting a shelf to move a book to, the current shelf the book occupies is disabled, providing a reminder to the user and preventing unnecessary calls to the API.

### Book Detail view

Clicking on the cover or title of a book will open a modal with a brief overview of the book including its publisher and publish date and a description of the book. There is a selector available here also to move the book to a different shelf. Clicking outside of this modal or its close button will return you to your page.

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
