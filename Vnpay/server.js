require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const crypto = require('crypto');
const config = require('./config/config');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');


const app = express();

app.use(cors());
app.use(bodyParser.json());

let transactions = {};

const generateTransactionId = () => {
  return crypto.randomBytes(4).toString('hex').substring(0, 7);
};


app.post('/create-vietqr', (req, res) => {
  const { amount, courseName } = req.body;
  const transactionId = generateTransactionId();

  const qrUrl = `https://img.vietqr.io/image/${config.bankInfo.bankId}-${config.bankInfo.bankAccount}-${config.bankInfo.template}.png?amount=${amount}&addInfo=${encodeURIComponent(courseName + ' Ma giao dich ' + transactionId)}&accountName=${encodeURIComponent(config.bankInfo.accountName)}`;
  transactions[transactionId] = { status: 'pending', amount, courseName };

  res.json({ qrUrl, transactionId });
});
app.get('/check-transaction-status/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  const transaction = transactions[transactionId];

  if (transaction) {
    try {
      const response = await axios.get(`${config.casso.apiUrl}/transactions`, {
        headers: {
          'Authorization': `Apikey ${config.casso.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data.data.records);
      const transactionsData = response.data.data.records;
      const updatedTransaction = transactionsData.find(t => t.description.includes(transactionId));
      if (updatedTransaction) {

        transactions[transactionId].status = 'success';
        res.json({ status: 'success', transaction: updatedTransaction });
      } else {
        res.json({ status: 'pending' });
      }

    } catch (error) {
      console.error('Error checking transaction status:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error checking transaction status' });
    }
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// Agora configuration
const nocache = (_, resp, next) => {
  resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  resp.header('Expires', '-1');
  resp.header('Pragma', 'no-cache');
  next();
}

const generateRTCToken = (req, resp) => {
  resp.header('Access-Control-Allow-Origin', '*');
  const channelName = req.params.channel;
  if (!channelName) {
    return resp.status(500).json({ 'error': 'channel is required' });
  }
  let uid = req.params.uid;
  if (!uid || uid === '') {
    return resp.status(500).json({ 'error': 'uid is required' });
  }
  // get role
  let role;
  if (req.params.role === 'publisher') {
    role = RtcRole.PUBLISHER;
  } else if (req.params.role === 'audience') {
    role = RtcRole.SUBSCRIBER
  } else {
    return resp.status(500).json({ 'error': 'role is incorrect' });
  }
  let expireTime = req.query.expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 360000;
  } else {
    expireTime = parseInt(expireTime, 10);
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  let token;
  if (req.params.tokentype === 'userAccount') {
    token = RtcTokenBuilder.buildTokenWithAccount(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  } else if (req.params.tokentype === 'uid') {
    token = RtcTokenBuilder.buildTokenWithUid(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
  } else {
    return resp.status(500).json({ 'error': 'token type is invalid' });
  }
  return resp.json({ 'rtcToken': token });
};

app.get('/rtc/:channel/:role/:tokentype/:uid', nocache, generateRTCToken)









const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
