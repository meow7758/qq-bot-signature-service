# QQ Bot Signature Service

一键部署到 Railway：

[![Deploy on Railway](https://railway.app/new/button.svg)](https://railway.app/new/template?template=https://github.com/your-repo/qq-bot-signature-service)

## 环境变量

部署后设置以下环境变量：

- `QQ_BOT_SECRET`: `SYfmu2AJScmx8KWjw9Nbq5Lbs9Rj1Kdx`
- `N8N_WEBHOOK_URL`: `https://n8n.meowlove.cn/webhook/qq-bot-events`

## 部署步骤

### 方法 1: Railway（最简单）

1. 访问 https://railway.app/new
2. 选择 "Deploy from GitHub"
3. 或者直接粘贴代码
4. 设置环境变量
5. 部署完成，获得 URL: `https://xxx.railway.app/qq-bot-callback`

### 方法 2: Render

1. 访问 https://render.com
2. 创建新 Web Service
3. 连接 GitHub 或粘贴代码
4. 设置环境变量
5. 部署

### 方法 3: Vercel（不支持）

Vercel 不支持 Express，需要改用 Serverless 函数。

## 部署后

1. 复制获得的 URL
2. 在 QQ 机器人平台填写回调地址: `https://xxx.railway.app/qq-bot-callback`
3. 完成！
