const axios = require('axios');

module.exports = async (root,args, context) => {
  const { validateUser } = context;
  
  await validateUser();
  return await axios.get(`https://swapi.co/api/people/${args.id}/`)
    .then(res => res.data);
}