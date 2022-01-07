const passport = require('passport')
const Collection = require('../schemas/collection')
const { HttpCode } = require("../constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secret = process.env.SECRET_KEY

const create = async (req, res, next) => {
     try {
    const userId = req.user._id;
        const { title, description, coll_theme } = req.body;
    if (!title || !description || !coll_theme) {
      return res.status(HttpCode.NOT_FOUND).json({
       message: "Missing required fields (title, description, theme)",
       });
    } else {
     const collection =  await Collection.create({owner: userId, ...req.body}) 
     return  res.status(HttpCode.CREATED).json({ collection });
    }
}
catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const collections = await Collection.find({ owner: userId })
     res.status(HttpCode.OK).json({
     collections
    })
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const collectionId = req.params.collectionId
    const collection = await Collection.findOne({_id: collectionId, owner: userId})
    
    if (collection) {
      return res.status(HttpCode.OK).json({
        collection 
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({message: "Not found collection"})
    }
  } catch (error) {
    next(error);
  }
} 

const update = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const id = req.params.collectionId;
    const body = req.body;
    if (body) {
      const updatedCollection = await Collection.findOneAndUpdate(
        {_id: id, owner: userId},
        {...body},
        { new: true }
      );
      if (!updatedCollection) {
        return res.status(HttpCode.NOT_FOUND).json({
         message: "Not found",
         });
      }
      return res.status(HttpCode.OK).json(updatedCollection);
    }
    return res.status(HttpCode.BAD_REQUEST).json({
       message: "Missing fields" 
    });
  } catch (error) {
    next(error);
  }
} 

const remove = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const id = req.params.collectionId;
    const deletedCollection = await Collection.findOneAndRemove(
      {_id: id,
      owner: userId,}
    );
    if (deletedCollection) {
      return res.status(HttpCode.OK).json(deletedCollection);
    }
    return res.status(HttpCode.NOT_FOUND).json({
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  remove,
  update,
  getById
}