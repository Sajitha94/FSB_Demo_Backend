import User from "../model/User.js";

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
