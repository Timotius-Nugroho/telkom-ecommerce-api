const connection = require('../../config/mysql')

module.exports = {
  checkDataByCondition: (condition) => {
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

  getUserInfo: (condition) => {
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
      connection.query('INSERT INTO product SET ?', data, (error, result) => {
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

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateData: (id, setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product SET ? WHERE product_id = ?',
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

  getAlllData: (limit, offset, keywords, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE product_name LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [keywords, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getDataCount: (keywords) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM product WHERE product_name LIKE ?',
        keywords,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
