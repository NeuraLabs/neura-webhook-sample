# Neura Webhook Sample

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Requirements

- NodeJS >= 7.6.0
- Mongodb

## Develop

### Install dependencies

To install dependencies enter project folder and run then following command:

```
npm install
```

### Configuring

* Configure mongo uri:

    ```
    MONGO_URL='mongodb://....' npn run dev
    ```

### Run server

The following commands will run the server in development mode with auto-reloading when there are changes in the server files

* `npm run dev`
* `npm run dev:debug` *this will break on first line of user script*

## Deploy

### Private server

```
npm run start
```
*this will run the server in production mode*

### Heroku

* step 1
* step 2

## License
[MIT](LICENSE)
