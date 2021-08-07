const connection = require('../../config/mysql')

module.exports = {
  getDataByCondition: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE ?',
        condition,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
