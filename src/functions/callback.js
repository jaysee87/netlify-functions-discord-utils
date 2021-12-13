const axios = require('axios')
const url = require('url')

exports.handler = async function(event, context) {
  const baseUrl = `https://discord.com/api`

  const data = new url.URLSearchParams({
    grant_type: 'authorization_code',
    code: event.queryStringParameters.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: process.env.OAUTH_SCOPES,
    redirect_uri: process.env.REDIRECT_URI,
  })

  const url = `${baseUrl}/oauth2/token`

  console.log('hello');
  try {
    const response = await axios.post(url, data.toString(),{ 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data
    })

    console.log(response);
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
      body: response.data,
    }
  } catch (err) {
      console.log(err.response.config)
      console.log(err.response.data)
      return err.response
  }
}
