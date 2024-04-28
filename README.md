# 📝Blog app using MERN [WIP]

## About

This is a simple react app made using MERN and a couple of additional libraries like TailwindCSS and Framer Motion for styling.

## Usage

Make sure you have npm and node installed. To use this application follow the following steps:

1. Enter both the "back-end" and "blog-app-front-end" folders and use the command ```npm install```. This will install all the necessary node packages.

2. In the "back-end" folder make a file called ```.env```. In this file you must set the ```DATABASE_URL``` environment variable to your MongoDB connection string.Teh connection string should start with ```mongodb+srv``` and has your login credentials. This file has been deliberately gitignored so you do not share your login credentials unintentionally.

3. Start the back end server using the command ```node index.js```.

4. Start the front end server using ```npm run dev``` if you want to start the front end in a development environment. 

5. If you want to build and preview use the command ```npm run build``` followed by ```npm run preview```


If you have followed the steps correctly the application should show work. Since you do not have any posts, you might want to populate the application using some sample posts. If you have any issues with getting this to work, found a bug, or have any suggestions in general, please do raise an issue! 