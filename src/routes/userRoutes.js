import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  UpdateUserRole,
} from "../controller/userController.js";
import authorizedRoles from "../middleware/roleMiddleware.js";

const userRouter = Router();
userRouter.use(protect, authorizedRoles("Admin"));

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id/role", UpdateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
