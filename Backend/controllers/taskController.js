const Task = require("../models/Task");

const getTasks = async (req, res) => {

  try {

    const tasks =
      await Task.find({
        userId: req.user._id
      });

    res.json({
      tasks
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch tasks"
    });

  }

};

const getTask = async (req, res) => {

  try {

    const task =
      await Task.findOne({
        _id: req.params.id,
        userId: req.user._id
      });

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    res.json({
      task
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch task"
    });

  }

};

const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      status,
      dueDate
    } = req.body;

    if (
      !title ||
      !description
    ) {

      return res.status(400).json({
        message:
          "Title and description are required"
      });

    }

    const task =
      await Task.create({
        title,
        description,
        priority,
        status,
        dueDate,
        userId: req.user._id
      });

    res.status(201).json({
      message: "Task created",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to create task"
    });

  }

};

const updateTask = async (req, res) => {

  try {

    const task =
      await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user._id
        },
        req.body
      );

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    res.json({
      message: "Task updated",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update task"
    });

  }

};

const deleteTask = async (req, res) => {

  try {

    const task =
      await Task.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete task"
    });

  }

};

const updateTaskStatus = async (req, res) => {

  try {

    const {
      status
    } = req.body;

    const task =
      await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user._id
        },
        {
          status
        }
      );

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    res.json({
      message: "Task status updated",
      task
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update status"
    });

  }

};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus
};
