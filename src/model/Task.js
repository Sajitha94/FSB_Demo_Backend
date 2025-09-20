import { model, Schema } from "mongoose";

const taskSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [3, "Titile should atleast have 3 chars"],
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description should be added"],
    },
    status: {
      type: String,
      enum: ["pending", "in_process", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assign user is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creater  is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);
export default Task;
