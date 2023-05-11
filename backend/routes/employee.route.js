const express = require('express')
const app = express()
const employeeRoute = express.Router()

// Employee model
let Employee = require('../models/Employee')

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
  console.log('Creation of employee called');
  // Employee.create(req.body, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })
  const empl = new Employee(req.body);
  empl.save(function(err, data){
    if (err) throw err;
     return res.json(data);
  });
})

// Get All Employees
employeeRoute.route('/test').get((req, res) => {
  console.log('Get all employees called');
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
employeeRoute.route('/test/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
employeeRoute.route('/test/update/:id').put((req, res, next) => {
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
employeeRoute.route('/test/delete/:id').delete((req, res, next) => {
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
