const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { RequestError, generateToken } = require("../helpers");

class AuthController {
  login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw RequestError(401, "Wrong Email or password");
    }
    

    const token = generateToken(user);
    user.token = token;
    await user.save();

    await User.findByIdAndUpdate(user._id, { token });
    console.log('Отработал login показываю user._id', user._id);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  };

  logout = async (req, res) => {
    const { id } = req.user;

    await User.findByIdAndUpdate(id, { token: null });
    console.log('Отработал logout показываю { id } = req.user;', id);
    res.status(204).json();
  };

  register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw RequestError(409, "Email in use");
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    console.log('Отработал register показываю newUser', newUser);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: { email: newUser.email, subscription: newUser.subscription },
      },
    });
  };
}
module.exports = new AuthController();
