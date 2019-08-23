# SPICE-O-RAMA - the spices collection

## Description:

Imageboard for a variety of spices used in culinary recipes and medical preparations around the world, with photos and detailed descriptions. 

## Developed with:

- PostgreSQL for database management
- Express / Node-js for server functions
- AWS S3 for storaging pictures
- VueJS for modular page building
- Moment-JS for processing time tags on comments
- CSS for page styling

## Features

Users are welcomed to an imageboard of all spices put onto the webpage. Upon hovering with the mouse, they can see the name of each spice displayed. At first, 20 spices are loaded on the page, but the user has the option to load 20 more at the end of the page:

<img src="./welcome.gif" />

By clicking on a chosen spice, users see a modal page with more information on that spice. On this page it is possible to make comments and to read comments from other users. 

<img src='./modal.gif' />

Uses can also upload pictures of new spices, which are immediately displayed into the list of spices

<img src='./upload.gif' />

## Features to be added:

- Login and registration 
- Upload pictures only for registered users
- Media Queries