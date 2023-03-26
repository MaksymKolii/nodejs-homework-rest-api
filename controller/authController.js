const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { RequestError, generateToken, sendEmail } = require("../helpers");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "..", "public", "avatars");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { BASE_URL } = process.env;

class AuthController {
  login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.verify) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, "Wrong Email or password");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    // const token = generateToken(user);
    user.token = token;
    await user.save();

    await User.findByIdAndUpdate(user._id, { token });
    console.log("Отработал login показываю user._id", user._id);

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
    console.log("Отработал logout показываю { id } = req.user;", id);
    res.status(204).json();
  };

  register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw RequestError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    // const newUser = new User({ email });
    // newUser.setPassword(password);

    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await sendEmail(mail);
    await newUser.save();

    console.log("Отработал register показываю newUser", newUser);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: { email: newUser.email, subscription: newUser.subscription },
      },
    });
  };

  verify = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw RequestError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      message: "Verification successful",
    });
  };

  resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      throw RequestError(400, "Missing required field email");
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      throw RequestError(401, "Email not found");
    }
  
    if (user.verify) {
      throw RequestError(400, "Verification has already been passed");
    }
  
    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    await sendEmail(mail);
  
    res.status(200).json({
      message: "Verification email sent",
    });
  };

  updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    //---- save with unque name
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;
    //-------------
    // resising
    const resultUpload = await Jimp.read(tempUpload);
    resultUpload.resize(250, 250).write(path.join(avatarsDir, filename));

    // was befo resising
    // const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  };
}
module.exports = new AuthController();
