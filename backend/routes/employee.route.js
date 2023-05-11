const express = require('express')
const app = express()
const employeeRoute = express.Router()

// Employee model
let Employee = require('../models/Employee')

// Add Employee
employeeRoute.route('/api/create').post((req, res, next) => {
  Employee.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Employees
employeeRoute.route('/api').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
employeeRoute.route('/api/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
employeeRoute.route('/api/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete employee
employeeRoute.route('/api/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = employeeRoute
