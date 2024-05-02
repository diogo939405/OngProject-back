const axios = require('axios')

async function gerarToken(parametros) {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    })
    return response.data.access_token
}

exports.createOrder = async () => {
    const acessToken = await getToken()

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + acessToken
        },
        data: Json.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    items: [
                        {

                        }
                    ]
                }
            ]
        })
    })
}
