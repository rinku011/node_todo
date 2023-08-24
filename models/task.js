import mongoose from "mongoose";


const schema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
 },
  discription:{
     type : String,
     reuired : true,
  } ,

  iscompleted : {
    type : Boolean,
    default : false,
  },
  user : {
   type : mongoose.Schema.Types.ObjectId,
   ref : "User",
   required : true,
  }
  
});

export const Task = mongoose.model("Task", schema);
