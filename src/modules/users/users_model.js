const connection = require('../../config/mysql')
const https = require('https')

module.exports = {
  checkByCondition: (condition) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE ?',
        condition,
        (error, result) => {
          !error
            ? resolve(result.length === 0 ? 0 : 1)
            : reject(new Error(error))
        }
      )
    })
  },

  getUserInfo: (userId) => {
    return new Promise((resolve, reject) => {
      https
        .get(
          `https://us-central1-silicon-airlock-153323.cloudfunctions.net/rg-package-dummy?userId=${userId}`,
          (res) => {
            let data = ''
            res.on('data', (chunk) => {
              data += chunk
            })
            res.on('end', () => {
              resolve(JSON.parse(data))
            })
          }
        )
        .on('error', (err) => {
          reject(err)
        })
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
  },

  addPrize: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO prize SET ?', data, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
