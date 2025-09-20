import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  UpdateUserRole,
} from "../controller/userController.js";
import authorizedRoles from "../middleware/roleMiddleware.js";

const userRouter = Router();

userRouter.use(protect, authorizedRoles("Admin"));
userRouter.get("/", getAllUsers);
userRouter.put("/:id/role", UpdateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
