const { Contact } = require("../models");
const { RequestError } = require("../helpers");

class ContactsController {
  add = async (req, res) => {
    const body = req.body;
    const { id } = req.user;

    const data = await Contact.create({ ...body, owner: id });
    res.status(201).json({ status: "success", code: 201, data });
  };

  getAll = async (req, res) => {
    const { id } = req.user;
    const { page = 1, limit = 10, favorite: reqFavorite = null } = req.query;

    const favorite = reqFavorite === null ? { $exists: true } : reqFavorite;

    const skip = (page - 1) * limit;
    const data = await Contact.find({ owner: id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email subscription");

    res.status(200).json({ status: "success", code: 200, data });
  };

  getById = async (req, res) => {
    const { contactId } = req.params;
    const { id: userId } = req.user;
    const data = await Contact.findOne({ _id: contactId, owner: userId });
    if (!data) {
      throw RequestError(404, `id:${contactId} not found`);
    }
    res.status(200).json({ status: "success", code: 200, data });
  };

  remove = async (req, res) => {
    const { contactId } = req.params;
    const { id: userId } = req.user;
    const data = await Contact.findOneAndDelete({
      _id: contactId,
      owner: userId,
    });

    if (!data) {
      throw RequestError(404, `id:${contactId} not found`);
    }

    res
      .status(200)
      .json({ status: "success", code: 200, message: "contact deleted" });
  };

  update = async (req, res) => {
    const { contactId } = req.params;
    const body = req.body;
    const { id: userId } = req.user;
    const data = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      body,
      {
        new: true,
      }
    );

    if (!data) {
      throw RequestError(404, `id:${contactId} not found`);
    }

    res.status(200).json({ status: "success", code: 200, data });
  };

  patch = async (req, res) => {
    const { contactId } = req.params;
    const body = req.body;
    const { id: userId } = req.user;
    const data = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      body,
      {
        new: true,
      }
    );

    if (!data) {
      throw RequestError(404, `id:${contactId} not found`);
    }

    res.status(200).json({ status: "success", code: 200, data });
  };
}
module.exports = new ContactsController();
