var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", function(req, res) {
  db.Product.findAll()
    .then( products => {
      res.status(200).send(JSON.stringify(products));
    })
    .catch( err => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.get("/:id", function(req, res) {
  db.Product.findByPk(req.params.id)
    .then( products => {
      res.status(200).send(JSON.stringify(products));
    })
    .catch( err => {
      res.status(500).send(JSON.stringify(err));
    });
});
router.post("/", function(req, res) {
  db.Product.create({
  name: req.body.name,
    job: req.body.job,
    id_lyon: 1,
    imageBase64:req.body.imageBase64,
    createdAt:req.body.createdAt,
    updateAt:req.body.updatedAt,
id:req.body.id
  })
    .then((product) => res.status(201).send(product))
    .catch((error) => res.status(400).send(error));
});

router.put("/:id", function (req, res, next) {
  db.Product.update(
    {name: req.body.name,
      job: req.body.job,
      id_lyon: 1,
      imageBase64:req.body.imageBase64,
      createdAt:req.body.createdAt,
      updateAt:req.body.updatedAt},
    {returning: true,where: {id:req.params.id}}
  )
    .then(function(rowsUpdated) {
      res.json(rowsUpdated)
    })
    .catch(next)
})


router.delete("/:id", function(req, res) {
  db.Product.destroy({
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
