const express = require('express');
const smileIdentityCore = require('smile-identity-core');
const cors = require('cors');
require('dotenv').config();

const Signature = smileIdentityCore.Signature;
const WebApi = smileIdentityCore.WebApi;

// express setup
const app = express();
app.use(cors());
app.use(express.json({ limit: '500kb' }));
app.use(express.static('public'));

app.get('/health-check', async (req, res) => {
    res.status(200).json({
      test: "yes",
    });
});

app.get('/generate_signature', async (req, res) => {
  try {
    const partnerId = process.env.PARTNER_ID;
    const apiKey = process.env.API_KEY;

    connection = new Signature(partnerId, apiKey);
    const timestamp = new Date().toISOString();
    const signature = connection.generate_signature(timestamp);

    res.json({
      signature: signature,
      timestamp: timestamp,
    });
  } catch (error) {
    res.status(500).json({ error: `Error generating signature: ${error}` });
  }
});

app.post('/token', async (req, res, next) => {
  try {
    const { PARTNER_ID, CALLBACK_URL, API_KEY, SID_SERVER } = process.env;
    const connection = new WebApi(
      PARTNER_ID,
      CALLBACK_URL,
      API_KEY,
      SID_SERVER,
    );

    const request_params = {
      user_id: `user-${generateUniqueId()}`,
      job_id: `job-${generateUniqueId()}`,
      product: req.body.product,
      callback_url: CALLBACK_URL,
    };

    // Await the result of get_web_token
    const result = await connection.get_web_token(request_params);

    // Send the token in the response
    res.status(201).json({
      ...result,
      environment: SID_SERVER === '0' ? 'sandbox' : 'production',
      product: req.body.product,
      partner_id: PARTNER_ID,
      callback_url: CALLBACK_URL,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res
      .status(500)
      .json({ error: 'Failed to generate token', message: error.message });
  }
});

// server setup
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//utils
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
