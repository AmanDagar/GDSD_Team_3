const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    console.log(req.query);
    if (!req.query.username) {
      res.status(400).send({
        message: "User name can not be empty!"
      });
      return;
    }
  
    // Create a User
    const user = {
        username: req.query.username,
        password: hashSync(req.query.password, genSaltSync(10)),
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        email: req.query.email,
        city: req.query.city,
        state: req.query.state,
        zip: req.query.zip,
        description: req.query.description,
        image: req.query.image,
        rolId: req.query.rolId
    };
  
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const name = req.query.username;
    var condition = name ? { username: { [Op.like]: `%${name}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// // Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;

    User.update(req.query, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.query is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// // Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

// // Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };


  exports.findUserByEmail = (req, res) => {
    const email = req.query.email;
    User.findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({
                    message: `Cannot find User with email=${email}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
      };

  exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ where: { email: email } })
        .then(user => {
            console.log(password);
            const result = compareSync(password, user.password);

            if (result) {
                user.password = undefined;
                const jsonToken = sign({ result: user}, "qwe1234", {expiresIn: "1h"});
                res.json({
                    message: "Login successful",
                    token: jsonToken
                });

            } else {
                res.status(404).send({
                    message: `Cannot find User with email=${email} or password is not correct.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
    };    
  


