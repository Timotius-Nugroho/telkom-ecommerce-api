/* eslint-disable indent */
const connection = require('../../config/mysql')

module.exports = {
  checkData: (userId, productId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId],
        (error, result) => {
          !error
            ? resolve(
                result.length === 0
                  ? 0
                  : {
                      cart_id: result[0].cart_id,
                      cart_count: result[0].cart_count
                    }
              )
            : reject(new Error(error))
        }
      )
    })
  },

  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM cart WHERE cart_id = ?',
        id,
        (error, result) => {
          !error
            ? resolve(
                result.length === 0
                  ? 0
                  : {
                      cart_id: result[0].cart_id,
                      cart_count: result[0].cart_count
                    }
              )
            : reject(new Error(error))
        }
      )
    })
  },

  getAllData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM cart WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getProductInfo: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE ?',
        condition,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO cart SET ?', data, (error, result) => {
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
  },

  updateData: (id, setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE cart SET ? WHERE cart_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM cart WHERE cart_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
