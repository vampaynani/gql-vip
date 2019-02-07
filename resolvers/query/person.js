const axios = require('axios');

module.exports = async (root,args) => {
 return await axios.get(`https://swapi.co/api/people/${args.id}/`)
  .then(res => res.data); 
}