const connection = require('../../config/mysql')

module.exports = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },

  getPrizeName: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT name FROM prize WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE users SET ? WHERE id = ?',
        [setData, id],
        (error, _result) => {
          if (!error) {
            const newResult = {
              ...setData,
              id
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
