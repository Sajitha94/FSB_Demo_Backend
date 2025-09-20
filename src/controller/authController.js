import User from "../model/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User Already Exists",
    });
  }

  const newUser = await User.create({ name, email, password });
  const token = generateToken({ id: newUser._id, role: newUser.role });
  res.status(201).json({
    status: "success",
    message: "User Created Successfully",
    token,
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Credentials",
      });
    }
    const token = await generateToken({ id: user.id, role: user.role });
    res.status(200).json({
      status: "success",
      message: "Login Successfull",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    throw new Error({ status: 500, message: err.message });
  }
};
export const getMe = async (req, res) => {
  console.log("req.user", req.user);

  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    message: "User Details fetched successfully",
    user,
  });
};
