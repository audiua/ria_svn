module.exports = {
  "get": {
    "/api/users": require("./controllers/usersController").getAll
  },
  "post": {
    "/api/add": require("./controllers/usersController").postAdd
  }
};
