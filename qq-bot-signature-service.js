// QQ Bot Ed25519 Signature Service
// 部署到 Railway, Render 或其他 Node.js 托管服务

const express = require('express');
const nacl = require('tweetnacl');
const util = require('tweetnacl-util');

const app = express();
const PORT = process.env.PORT || 3000;

// QQ 机器人配置（从环境变量读取）
const QQ_BOT_SECRET = process.env.QQ_BOT_SECRET || 'SYfmu2AJScmx8KWjw9Nbq5Lbs9Rj1Kdx';

app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'QQ Bot Signature Service' });
});

// QQ 机器人回调验证端点
app.post('/qq-bot-callback', (req, res) => {
  console.log('=== QQ Bot Callback Request ===');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));

  const body = req.body;

  // 处理回调地址验证 (OpCode 13)
  if (body.op === 13) {
    const plainToken = body.d.plain_token;
    const eventTs = body.d.event_ts;

    console.log('Validation request detected:');
    console.log('  plain_token:', plainToken);
    console.log('  event_ts:', eventTs);
    console.log('  Bot Secret:', QQ_BOT_SECRET);

    // 生成 Ed25519 签名 - 使用 tweetnacl
    // 生成 32 字节 seed
    let seed = QQ_BOT_SECRET;
    while (seed.length < 32) {
      seed = seed + seed;
    }
    seed = seed.substring(0, 32);

    console.log('  Generated seed:', seed);
    console.log('  Seed length:', seed.length);

    // 使用 tweetnacl 生成密钥对
    const keyPair = nacl.sign.keyPair.fromSeed(util.decodeUTF8(seed));

    console.log('  Public key:', util.encodeBase64(keyPair.publicKey));
    console.log('  Secret key:', util.encodeBase64(keyPair.secretKey).substring(0, 32) + '...');

    // 签名内容: event_ts + plain_token
    const message = util.decodeUTF8(eventTs + plainToken);
    console.log('  Message to sign:', eventTs + plainToken);

    // 生成签名
    const signature = nacl.sign.detached(message, keyPair.secretKey);

    // 转换为十六进制字符串（128个字符）
    const signatureHex = Buffer.from(signature).toString('hex');

    console.log('  Generated signature:', signatureHex);
    console.log('  Signature length:', signatureHex.length);

    // 返回 QQ 要求的格式
    const response = {
      plain_token: plainToken,
      signature: signatureHex
    };

    console.log('=== Sending response ===');
    console.log('Response:', JSON.stringify(response, null, 2));

    return res.json(response);
  }

  // 常规事件处理
  console.log('Event received, op:', body.op, 'type:', body.t);

  // 转发到 n8n
  // TODO: 添加 n8n webhook URL
  res.json({
    message: 'Event received',
    op: body.op,
    type: body.t
  });
});

app.listen(PORT, () => {
  console.log(`QQ Bot Signature Service running on port ${PORT}`);
  console.log(`Webhook URL: https://your-domain.railway.app/qq-bot-callback`);
});
