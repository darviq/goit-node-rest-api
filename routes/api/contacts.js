const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model/index')

router.get('/', async (req, res, next) => {
  const data = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: data,
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const data = await contactsOperations.getContactById(contactId)
  if (data) {
    res.json({
      status: 'success',
      code: 200,
      data: data,
    })
  } else {
    res.json({
      message: 'not found',
      code: 404,
    })
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.json({
      message: 'missing required name field',
      code: 400,
    })
  } else {
    const data = await contactsOperations.addContact(req.body)
    res.json({
      code: 201,
      data: data,
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const data = await contactsOperations.removeContact(contactId)
  if (data) {
    res.json({
      message: 'contact deleted',
      code: 200,
    })
  } else {
    res.json({
      message: 'not found',
      code: 404,
    })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body
  if (name || email || phone) {
    const data = await contactsOperations.updateContact(contactId, req.body)
    if (data) {
      res.json({
        code: 200,
        data: data,
      })
    } else {
      res.json({
        message: 'not found',
        code: 404,
      })
    }
  } else {
    res.json({
      message: 'missing fields',
      code: 400,
    })
  }
})

module.exports = router
