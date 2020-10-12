const {user} = require('../models')
const data = require('../../data/validUsers.json')
module.exports = async () => {
  try {
    data.forEach(u => {
      user.create(u)
    })
  }catch(e){
    console.log('Something went wrong')
  }
}
