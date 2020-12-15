const express = require('express');
const router = express.Router();
const db = require('../database.js');

router.get("/all", function(req, res) {
  db.Order.findAll()
    .then( orders => {
      res.status(200).send(JSON.stringify(orders));
    })
    .catch( err => {
      res.status(500).send(JSON.stringify(err));
    });
});
router.get("/getMaxId", function(req, res) {
  db.Order.findAll()
    .then( orders => {
      res.status(200).send(JSON.stringify(orders));
    })
    .catch( err => {
      res.status(500).send(JSON.stringify(err));
    });
});
router.get("/:id", function(req, res) {
  db.Order.findByPk(req.params.id)
    .then( order => {
      res.status(200).send(JSON.stringify(order));
    })
    .catch( err => {
      res.status(500).send(JSON.stringify(err));
    });
});
router.post("/", function(req, res) {
  db.Order.create({
    id:req.body.id,
  id_Product: req.body.id_Product,
    quantity: req.body.quantity,
    state:req.body.state,
    updated_at:req.body.updated_at,
    finish_at:req.body.finish_at

  })
    .then((order) => res.status(201).send(order))
    .catch((error) => res.status(400).send(error));
});

router.put("/:id", function (req, res, next) {
  db.Order.update(
    {id_Product: req.body.id_Product,
      quantity: req.body.quantity,
      state:req.body.state,
      updated_at:req.body.updated_at,
      finish_at:req.body.finish_at},
    {returning: true,where: {id:req.params.id}}
  )
    .then(function(rowsUpdated) {
      res.json(rowsUpdated)
    })
    .catch(next)
})


router.delete("/:id", function(req, res) {
  db.Order.destroy({
    where: {
      id: req.params.id
    }
  })
    .then( () => {
      res.status(200).send();
    })
    .catch( err => {
      res.status(500).send(JSON.stringify(err));
    });
});

module.exports = router;
