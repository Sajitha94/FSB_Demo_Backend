import User from "../model/User.js";
import sendEmail from "../utils/sendEmail.js";

export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User Already Exists",
    });
  }
  const newUser = await User.create({
    name,
    email,
    password: password || "password123",
    role,
  });
  sendEmail({
    to: email,
    subject: "Welcome Maill form FSD Demo ",
    text: `Hello ${name} Welcome to Task Manager ,here is yu account details 
    Email:${email}
    Password: ${password || "password123"}
    Role: ${newUser.role}`,
  });
  res.status(201).json({
    status: "success",
    message: "User Created successfully",
    newUser,
  });
};

export const getAllUsers = async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    user,
  });
};
export const UpdateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await User.findById(id);
  user.role = role;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "User Updated Successfully",
    user,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete(id);
  if (!user) {
    return res.status(404).json({
      ststus: "error",
      message: "User Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User Deleted Successfully",
    user,
  });
};
