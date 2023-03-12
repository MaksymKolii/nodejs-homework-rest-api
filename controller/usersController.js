const { User } = require("../models");

class UsersController {
  getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    console.log('Отработал getCurrent');
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  };

  updateSubscription = async (req, res) => {
    const { id } = req.user;
    const data = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    console.log('Отработал updateSubscription показываю { id } = req.user', id);
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: data.email,
          subscription: data.subscription,
        },
      },
    });
  };
}
module.exports = new UsersController();
