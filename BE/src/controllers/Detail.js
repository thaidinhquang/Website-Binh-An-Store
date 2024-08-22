import Detail from "../models/Detail.js";

export const addNewDetail = async (req, res) => {
  try {
    if (!req.body.isSelectedInputType && req.body.values.length > 1) {
      return res.status(400).json({
        message:
          "Type of detail value is the  input type and just one value is allowed",
      });
    }
    const detail = await Detail.create(req.body);
    res.status(201).json(detail);
  } catch (error) {
    console.log(error);
  }
};

export const getAllDetail = async (req, res) => {
  try {
    const details = await Detail.find();
    res.status(200).json(details);
  } catch (error) {
    console.log(error);
  }
};

export const getDetail = async (req, res) => {
  try {
    const detail = await Detail.findById(req.params.id);
    res.status(200).json(detail);
  } catch (error) {
    console.log(error);
  }
};

export const updateDetail = async (req, res) => {
  try {
    const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(detail);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDetail = async (req, res) => {
  try {
    await Detail.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};
