var mysql = require('mysql')
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
/* if (= 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
} */

const config = {
  all: {
    env: 'development',
    root: path.join(__dirname, '..'),
    port: 3000,
    ip:'localhost',
    apiRoot: '',
    mysql: {
      host: '34.95.173.134',
      user: 'tallersowa',
      password:'sowa',
      database:'TALLERSOWA'
    }
  },
  test: {},
  development: {},
  production: {}
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
