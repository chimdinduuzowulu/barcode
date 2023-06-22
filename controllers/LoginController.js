const { Login } = require('../models');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//
const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};
const createLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const createDetails = await Login.create({
      username,
      password: hashedPassword,
    });
    createDetails
      ? res.status(200).json({ message: 'login details created' })
      : res.status(401).json({ message: 'Login details not created' });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
//
const checkLogin = async (req, res) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    return res.status(404).json({ message: "Fields can't be empty**" });
  }
  try {
    const findUser = await Login.findOne({
      where: {
        username,
      },
    });
    if (!findUser) {
      return res.status(400).json({ message: 'Incorrect login credentials' });
    }
    //
    const pass = await bcrypt.compare(password, findUser.password);
    if (pass) {
      const dataStoredInToken = {
        id: findUser.id,
        username: findUser.username,
      };
      const token = jwt.sign(
        { ...dataStoredInToken },
        process.env.JWT_SECRETE_KEY,
        { expiresIn: '1d' }
      );
      res.setHeader('token', token);
      console.log({ message: 'Login successful', token });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(400).json({ message: 'Incorrect login credentials' });
    }
  } catch (error) {
    res.status(4001).json({ error: error, message: 'Internal server error**' });
  }
};
//
const updateLogin = async (req, res) => {
  try {
    const { username, newPassword, oldPassword } = req.body;
    const checkusername = await Login.findOne({
      where: { username: username },
    });
    if (checkusername === null) {
      return res.status(400).json({ message: 'Incorrect login details!!' });
    }
    //
    const passcheck = await bcrypt.compare(oldPassword, checkusername.password);
    const newHashedPassword = await hashPassword(newPassword);
    if (passcheck) {
      const check = await Login.update(
        {
          password: newHashedPassword,
        },
        {
          where: {
            username: username,
          },
        }
      );
      check
        ? res.status(200).json({ message: 'Password updated successfully' })
        : res.status(401).json({ message: 'Update failed' });
      return;
    }
    //
    res.status(401).json({ message: 'incorrect credentials' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Internal server error!' });
  }
};

module.exports = {
  createLogin,
  checkLogin,
  updateLogin,
};
