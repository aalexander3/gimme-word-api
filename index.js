const express = require('express')
const https = require('https');
require('dotenv').config();
const axios = require('axios');

const app = express()

app.use(function(req, res, next) {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma'
  )

  next()
})

const makeRequest = async (query, req, res) => {
  const url = `${process.env.THES_URL}${query}?key=${process.env.THES_KEY}`

  axios.get(url)
    .then(response => {
      res.status(200).send(response.data)
    })
    .catch(error => {
      console.log(error);
    })
}

app.get('/api/v1/:query', async (req, res) => {
  const response = await makeRequest(req.params.query, req, res)
})


const PORT = 5000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
