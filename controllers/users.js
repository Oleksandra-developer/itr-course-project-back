const passport = require('passport')
const User = require('../schemas/user')
const { HttpCode } = require("../constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY

const auth = (req, res, next) => {
 passport.authenticate('jwt', { session: false }, (error, user) => {
      const headerAuth = req.get("Authorization");
    let token = null;
    if (headerAuth) {
      token = headerAuth.split(" ")[1];
    }
    if (error || !user || token !== user?.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: "Not authorized",
      });
    }
   req.user = user;
   next()
  })(req, res, next)
  }

  const updateToken = async  (id, token) => {
    return await User.updateOne({ _id: id }, { token });
  };

  const register =async (req, res, next) => {
    try { const { username, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
       message: 'Email is already in use',
      })
    }
   
      const newUser = new User({ username, email })
      newUser.setPassword(password)
      await newUser.save()
      res.status(HttpCode.OK).json({
        newUser,
      })
    } catch (error) {
      next(error)
    }
  }

  const login =  async (req, res, next) => {
   try{
      const { email, password } = req.body
    const user = await User.findOne({ email })
  
    if (!user || !user.validPassword(password)) {
      return res.status(HttpCode.BAD_REQUEST).json({
        message: 'Incorrect login or password',
        })
    }
     const payload = {
        id: user._id,
      }
      const id = user._id
      const token = jwt.sign(payload, secret, { expiresIn: '1d' })
      await User.updateOne({_id: id}, {token});
      res.status(HttpCode.OK).json({
   token,
    user
  })
  } catch (error) {
      next(error)
  }
  }

  const logout = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(HttpCode.UNAUTHORIZED).json({
          message: "Not authorized",
        });
      }
      await updateToken(req.user._id, null);
      res.status(HttpCode.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    auth,
    register,
    login,
    logout,
     };