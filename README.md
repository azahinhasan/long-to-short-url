# Main Technology Used

- Node js
- Express js
- MongoDB
- Jest and more.

# Instruction to run and use this app

## Prerequisites

- Node version 18.19.0 or above.
- Install nodemon in global `npm install -g nodemon`

## How to run
- Clone this repo
- Go to `server` folder.
- Run this command for test case `npm run test`. 
- Run this command for running the app `npm run dev`.
- (Optional) You can modify config data from `.env` file or `./config/config.js` file.

#### By default app will run on `http://localhost:5003`


## API instruction  

- `POST - /api/url`: Create and get short URL from Long. <br/>
  Example ful api:  `http://localhost:5003/api/url`
  Example body:
   ```
  {
    "url":"https://www.npmjs.com/package/uuid"
  }
  ```
  [Note: as successful response wil get `short_url`. User have to open it into browser. Make sure this app is running]
- `DELETE - /api/url/:id`: Can delete by long url id.

  # Some other info about the app
  - Long url must be have more then 20 characters without `protocol` type.
  - If long url already exist into db it will return previous short url.
  - Invalid API will return `invalid` message.
  - Short url will be unique.
  - Unit test is active.