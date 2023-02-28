const service = require("../services");
const validateContacts = require("../middleWares")

const get = async (req, res, next) => {
    try {
      const results = await service.listContacts()
      res.json({
        status: 'success',
        code: 200,
        data: {
            contacts: results,
        },
      }) 
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  const getById = async (req, res, next) => {
    const { id } = req.params
    try {
      const result = await service.getContactById(id)
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  const create = async (req, res, next) => {
    const { name,email, phone, favorite } = req.body
    try {
      const result = await service.addContact({  name,email, phone, favorite })
  
      res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact: result },
      })
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  const update = async (req, res, next) => {
    const { id } = req.params
    const {  name,email, phone, favorite } = req.body
    try {
      const result = await service.updateContact(id, {  name,email, phone, favorite })
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  const updateStatus = async (req, res, next) => {
    const { id } = req.params
    const { isDone = false } = req.body
  
    try {
      const result = await service.updateStatusContact(id, { isDone })
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  const remove = async (req, res, next) => {
    const { id } = req.params
  
    try {
      const result = await service.removeContact(id)
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found task id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
  }
  
