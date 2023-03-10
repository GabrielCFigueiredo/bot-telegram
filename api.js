
const axios = require('axios')

const status = async () => {
    try {
        return await axios.get('https://api.sokkerpro.net/liveApi/web_d2y7n1sj5v6rqqyt', { timeout: 30000 })
    } catch(error) {
        return error
    }
}

module.exports = status