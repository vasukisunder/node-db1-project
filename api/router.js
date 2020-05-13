const express = require('express');
const db = require("../data/dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
    .from("accounts")
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: err.message});
    })
})

router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first() 
      .then(account => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(404).json({ message: "No accounts by that ID" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });

  router.post("/", (req, res) => {
    const post = req.body;
  
    
    if (isValidPost(post)) {
   
      db("accounts")
        .insert(post, "id")
        .then(id => {
          res.status(201).json({ data: id });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: error.messsage });
        });
    } else {
      res
        .status(400)
        .json({ message: "please provide name and budget for the account" });
    }
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    db("accounts")
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
       
        if (count) {
          res.status(200).json({ data: count });
        } else {
          res.status(404).json({ message: "account not found for that ID" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });
  
  router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del()
      .then(count => {
        
        if (count) {
          res.status(200).json({ data: count });
        } else {
          res.status(404).json({ message: "record not found for that ID" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });
  


  function isValidPost(post) {
    return Boolean(post.name && post.budget);
  }
  


module.exports = router;