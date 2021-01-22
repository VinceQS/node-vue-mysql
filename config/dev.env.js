'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 获取NODE_ENV参数
const env = process.env.NODE_ENV
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"http://127.0.0.1/api"',
  LOGIN_API: '"http://190.168.0.77:8443"'
})
