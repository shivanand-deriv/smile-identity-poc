const express = require('express');
const { v4: UUID } = require('uuid');
const cors = require('cors');
const SIDCore = require('smile-identity-core');
const SIDWebAPI = SIDCore.WebApi;

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '500kb' }));

app.get('/token', async (req, res, next) => {
  try {
    const { PARTNER_ID, CALLBACK_URL, API_KEY, SID_SERVER } = process.env;
    const connection = new SIDWebAPI(
      PARTNER_ID,
      CALLBACK_URL,
      API_KEY,
      SID_SERVER
    );

    const request_params = {
      user_id: `user-${UUID()}`,
      job_id: `job-${UUID()}`,
      product: 'biometric_kyc',
      callback_url: CALLBACK_URL
    };

    // Remove this line:
    // res.json(request_params);

    const result = await connection.get_web_token(request_params);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while processing your request:', message: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});