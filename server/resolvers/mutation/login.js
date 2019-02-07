const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = async (root, args) => {
  const {email, password} = args;
  const user = await User.findOne({email});
  if(!user){
    throw "Authentication Error: Invalid Credentials";
  }
  const isAllowed = await bcrypt.compare(password, user.password);
  if(!isAllowed){
    throw "Authentication Error: Invalid Credentials";
  }
  return jwt.sign({user}, 'secretpassphrase');
}