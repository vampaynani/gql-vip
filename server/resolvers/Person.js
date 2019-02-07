const axios = require('axios');

module.exports = {
  homeworld: async (person) => {
    console.log(person);
    return await axios.get(person.homeworld)
    .then(res => res.data);
  }
}