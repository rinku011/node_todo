
import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async(req,res,next)=>{

     try {
      const {title, discription} = req.body;

      await Task.create({
        title,
        discription,
        user:req.user,
      })

      res.status(201).json({
        success : true,
        message : "Task added Succesfully"
      })
      
     } catch (error) {
      next(error);
     }   
};


export const getMyTask = async(req,res,next)=>{
   try {
    const userid = req.user._id;

   const tasks = await Task.find({user : userid});

   res.status(200).json({
    success : true,
    tasks,
   })
    
   } catch (error) {
    next(error);
   }

};

export const updateTask = async(req,res,next)=>{

   try {
    const {id} = req.params;
   const task = await Task.findById(id);

   if(!task)
   return next(new ErrorHandler("Task Not Found",400));

   task.iscompleted = !task.iscompleted;
   await task.save();

  res.status(200).json({
   success : true,
   message : "Task updated",
  })
    
   } catch (error) {
     next(error);
   }
   

};

export const deleteTask = async(req,res,next)=>{
  
  try {
    const {id} = req.params;
   const task = await Task.findById(id);

   if(!task)
   return next(new ErrorHandler("Task Not Found",404));

   await task.deleteOne();

  res.status(200).json({
   success : true,
   message : "Task deleted",
  
  })
    
  } catch (error) {
    next(error);
  }

};