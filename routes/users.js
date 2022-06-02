const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query.name);
  //http://localhost:3000/users?name=damola
  res.send(`Users List; u are parsing name query: ${req.query.name}`);
});

router.get("/new", (req, res) => {
  //res.send("Users new form");
  res.render("./users/new");
});

router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ name: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.error("error");
    res.render("users/new", { firstName: req.body.firstName });
  }
  // res.send("Create new user");
});

router
  .route("/:id")
  .get((req, res) => {
    console.info(req.user);
    res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with id ${req.params.id}`);
  });

const users = [{ name: "kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

// router.get('/:id', (req,res)=>{
//     res.send(`Get user with id ${req.params.id}`)
// })

// router.put('/:id', (req,res)=>{
//     res.send(`Update user with id ${req.params.id}`)
// })

// router.delete('/:id', (req,res)=>{
//     res.send(`Delete user with id ${req.params.id}`)
// })

module.exports = router;
