import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controller/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorizedRoles from "../middleware/roleMiddleware.js";

const taskRouter = Router();

taskRouter.get("/", protect, getAllTask);
taskRouter.post("/", protect, authorizedRoles("Admin", "Manager"), createTask);
taskRouter.put(
  "/:id",
  protect,
  authorizedRoles("Admin", "Manager", "Employee"),
  updateTask
);
taskRouter.delete("/:id", protect, authorizedRoles("Admin"), deleteTask);

export default taskRouter;
