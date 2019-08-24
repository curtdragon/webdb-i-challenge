const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

//GET
router.get("/", (req,res) => {
    db("accounts")
    .then(accounts => {
        res.json(accounts);
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to get accounts"
        });
    });
});


//GET BY ID

router.get("/:id", (req,res) => {
    const {id} = req.params;

    db("accounts").where({id})
    .then(accounts => {
        const account = accounts[0];
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({
                message: "Invalid Account ID"
            })
            }
        })
    .catch(error => {
        res.status(500).json({
            message: "Failed to get accounts"
        })
    });

});

//POST
router.post("/", (req, res) => {
    const accountData=req.body;

    db("accounts").insert(accountData)
    .then(ids => {
        res.status(201).json({
            newAccountID: ids[0]
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to insert account",
            error: message,
        });
    });
});


//PUT
router.put("/:id", (req,res) => {
    const changes=req.body;
    const {id} =req.params;

    db("accounts").where({id}).update(changes)
    .then(count => {
        if (count) {
            res.json({
                updated: count
            });
        } else {
            res.status(400).json({
                message: "Invalid account ID"
            })
        }
    })
    .catch(error=> {
        res.status(500).json({
            message: "Failed to update account"
        });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
    const {id} =req.params;

    db("accounts").where({id}).del()
    .then(count => {
        if (count) {
            res.json({
                deleted: count
            })
        } else {
            res.status(404).json({
                message: "Invalid account ID"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to delete account"
        });
    });
});

module.exports = router;
