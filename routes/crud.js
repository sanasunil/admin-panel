const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/crud");

// routes
router.post("/task/create", create);
router.get("/tasks", list);
router.get("/task/:slug", read);
router.put("/task/:slug", update);
router.delete("/task/:slug", remove);

module.exports = router;