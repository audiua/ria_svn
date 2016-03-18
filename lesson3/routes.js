module.exports = {
  "get": {
    "/users": require("./controllers/usersController").getAll
  },
  "post": {
    "/users": require("./controllers/usersController").postAdd
  }
};
