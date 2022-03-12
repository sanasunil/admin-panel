const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema(
  {
    username : {
      type : String,
      required: true
    },
    password:{
      type : String,
      required: true
    },
    userType : {
      type : String,
      required: true
    },
    userToken : {
      type : String,
      required: true
    },
    
  
   
  },
  
);


module.exports = mongoose.model("cruds", crudSchema);