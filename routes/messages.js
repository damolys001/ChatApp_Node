const express = require("express");
const moment = require("moment");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json(messages);
// });

// router.post("/", (req, res) => {
//   const isValid = true;
//   if (isValid) {
//     messages.push({
//       message: req.body.message,
//       name: req.body.name,
//       time: moment().format("HH:mm a"),
//     });
//     res.json(messages).sendStatus(200);
//   } else {
//     res
//       .json({
//         message: req.body.message,
//         name: req.body.name,
//       })
//       .sendStatus(400);
//   }
// });

router
  .route("/:id")
  .get((req, res) => {
    console.info(req.messages);
    res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with id ${req.params.id}`);
  });

router.param("id", (req, res, next, id) => {
  req.messages = messages[id];
  next();
});

module.exports = router;
