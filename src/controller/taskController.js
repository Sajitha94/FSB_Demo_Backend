import { populate } from "dotenv";
import Task from "../model/Task.js";
import User from "../model/User.js";
import sendEmail from "../utils/sendEmail.js";

export const getAllTask = async (req, res) => {
  console.log(req, "dd");

  const requestUserId = req.user.requestUserId;
  const requesrUserRole = req.user.role;
  let tasks;
  if (requesrUserRole === "Admin" || requesrUserRole === "Viewer") {
    tasks = await Task.find().populate("assignedTo createdaBy");
  } else if (requesrUserRole === "Manager") {
    tasks = await Task.find({ createdBy: requestUserId }).populate(
      "assignedTo createdBy"
    );
  } else {
    tasks = await Task.find({ assignedTo: requestUserId }).populate(
      "assignedTo createdBy"
    );
  }
  res.status(200).json({
    status: "success",
    message: "Task fetched successfully",
    tasks,
  });
};
export const createTask = async (req, res) => {
  const { title, description, dueDate, assiedTo } = req.body;
  const createrId = req.user.id;
  const assignedUser = await User.findById(assiedTo);
  if (!assignedUser) {
    return res.status(404).json({
      status: "error",
      message: "Assigned User Not Found",
    });
  }

  const newTask = await Task.creat({
    title,
    description,
    dueDate,
    assiedTo,
    createdBy: createrId,
  });
  sendEmail({
    to: assignedUser.email,
    subject: "New Task Assigned",
    text: `Hello ${assignedUser.name}
    You have been assigned with a new Task: ${title}
    For Further info ,CHECK FSD Demo app
    `,
  });
  res.status(201).json({
    status: "success",
    message: "Task Created Successfully",
    newTask,
  });
};
export const updateTask = (req, res) => {};
export const deleteTask = (req, res) => {};
