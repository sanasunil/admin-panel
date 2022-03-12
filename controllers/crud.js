const Task = require("../models/crud");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { task } = req.body;
    console.log("task", task);
    const taskCreate = await new Task({ task, slug: slugify(task) }).save();
    console.log("taskCreate", taskCreate);
    res.json(taskCreate);
  } catch (err) {
    res.status(400).send("Create task failed");
  }
};

exports.list = async (req, res) => {
  try {
    const result = await Task.find({}).sort({ createdAt: -1 }).exec();
    res.json(result);
  } catch (err) {
    res.status(400).send("Listing task failed");
  }
};

exports.read = async (req, res) => {
  let task = await Task.findOne({ slug: req.params.slug }).exec();
  res.json(task);
};

exports.update = async (req, res) => {
  const { task } = req.body;
  try {
    const updated = await Task.findOneAndUpdate(
      { slug: req.params.slug },
      { task, slug: slugify(task) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Task update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Task delete failed");
  }
};

{/*
 const Userdb = require("../models/crud");

// create and save new user
exports.create = (req,res)=>{

  // validate request
  if(!req.body){
      res.status(400).send({ message : "Content can not be emtpy!"});
      return;
  }

  // new user
  const user = new Userdb({
      username : req.body.username,
      password : req.body.password,
      userType:  req.body.userType,
      userToken : req.body.userToken
  })

  // save user in the database
  user
      .save(user)
      .then(data => {
          //res.send(data)
          res.redirect('/add-user');
      })
      .catch(err =>{
          res.status(500).send({
              message : err.message || "Some error occurred while creating a create operation"
          });
      });

}
// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

  if(req.query.id){
      const id = req.query.id;

      Userdb.findById(id)
          .then(data =>{
              if(!data){
                  res.status(404).send({ message : "Not found user with id "+ id})
              }else{
                  res.send(data)
              }
          })
          .catch(err =>{
              res.status(500).send({ message: "Erro retrieving user with id " + id})
          })

  }else{
      Userdb.find()
          .then(user => {
              res.send(user)
          })
          .catch(err => {
              res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
          })
  }

  
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
  if(!req.body){
      return res
          .status(400)
          .send({ message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
          }else{
              res.send(data)
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error Update user information"})
      })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
          }else{
              res.send({
                  message : "User was deleted successfully!"
              })
          }
      })
      .catch(err =>{
          res.status(500).send({
              message: "Could not delete User with id=" + id
          });
      });
}
*/}


 