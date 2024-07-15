# Chat-Bot-for-Image-and-Text-Analysis

This is a simple chat bot application designed using the MERN stack that can take an image and text as inputs and analyze the image using an OCR library to recognize and extract content.

## Please read the documentation and understand how the application works, Thank You.

## Table of Contents

- [Testing](#testing)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Endpoints](#endpoints)
- [Usage](#usage)

## Testing

## Summary of the chat bot application for testing purposes:
## For testing you can use deployed url of client : https://digital-domi-chat-bot.netlify.app/
   - Backend is intergrated with frontend already you need to setup repository manually but still below have all the intructions for setting up the repository manually.
   - Please wait untill the history data gets loaded in left sidebar or History bar if it is showing Loading history... then please wait for 1-2 minutes because as backend is deployed on render using free services so that the reason it is slow so initially it takes time start the backed server on render.
## Backend deployed URL : https://chat-bot-for-image-and-text-analysis.onrender.com/
   - You can hit above url also once for running the server on render in browser just hit above url and after few minutes you get the below response :
   ## Hello Digital Domi!
   - Once you get the response means server has started now you can use frontend url and use chat application.

## Features

- Upload an image and input text.
- Basic file validation for image uploads.
- Image analysis using Tesseract.js (OCR).
- Store image analysis results in MongoDB.
- Display results on the frontend.

## Tech Stack

- **Frontend:** React.js, TailwindCSS
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **OCR:** Tesseract.js

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- MongoDB
- Git

### Installation

1. **Clone the repository:**

  git clone https://github.com/taruntailor7/Chat-Bot-for-Image-and-Text-Analysis
  cd your-repo-name

Backend: (PORT : 5000) 
  - cd server
  - npm install
  - make .env file
  - copy .env_example to .env
  - npm start

Frontend: (PORT : 3000)
  - cd client 
  - npm install
  - npm start


## Endpoints

POST /api/analyze
  - Description: Receives image and text data, processes the image using OCR, and stores the results.
  - Request Body: {
      "text": "string",
      "image": "file"
    }
  - Response: {
    "text": "string",
    "analyses": "string"
  }

GET /api/analyses
  - For getting history of all analyses

## Usage

  - It accepts an image(required) and text(optional) and based on the image it will return the response if image is having text or content then it will extract the content from the image and return the response because in server we are using Tesseract library (OCR) which has capabilities to extract the content only from the image and if you send any image then it wont be able to extract the content then it will show some useful message to you and you can proceed further accordingly.
  - It shows the history of all analyses images in left sidebar you can see the history of all analyses and timeline information.


## I have deployed both backend and frontend backend deployed on render using free account so so it might take sometime to load history data or analyze the image from frontend as it is free account so it is very slow for first time when we load once backend is loaded you can verify backend is loaded from left sidebar history there you can see Loading history... once you get the data then you cna start using chat bot, then it wont take much time for second time and etc... and frontend deployed on netlify adding host url for frontend here you can use that to test chat bot application you don't need to setup manually for testing but if still want to setup manually then instructions are available above here just replace the deployed backend url from client with localhost:5000 for running it in local.

## Frontend deployed url : https://digital-domi-chat-bot.netlify.app/
## Backend deployed url  : https://chat-bot-for-image-and-text-analysis.onrender.com/

## Please reach out to me for any help or questions if you are unable to test this using deployed url or setup this repository am always here to help you out, Thanks!

Mobile No : +91-7737233212
Email : taruntailor7@gmail.com