# QQ 机器人 n8n 工作流导入配置指南

## 📥 第一步：导入工作流

1. 登录 n8n：https://n8n.meowlove.cn

2. 点击右上角的 **「+」** 按钮，选择 **「Import from File」**

3. 选择文件：
   ```
   C:\Users\Administrator\.craft-agent\workspaces\my-workspace\sessions\260206-fit-wolf\qq-bot-wallabag-workflow.json
   ```

4. 点击 **「Import」** 导入

---

## 🔧 第二步：配置签名验证节点

导入后，您会看到工作流编辑器，里面有多个节点。请找到并配置以下节点：

### 📌 签名验证节点位置

```
┌─────────────────┐
│ QQ Bot Webhook  │  ← 第1个节点：Webhook 触发器
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify Signature│  ← ⭐ 第2个节点：签名验证（需要配置！）
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Check Verified │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Parse Intent  │
└────────┬────────┘
         │
         ▼
    ... 其他节点
```

### ⭐ 配置签名验证节点

1. **双击** 名为 **「Verify Signature」** 的节点

2. 在 **「Function Code」** 文本框中，找到这一行：
   ```javascript
   const QQ_BOT_TOKEN = 'your-qq-bot-token';
   ```

3. **修改为**您在 QQ 机器人平台设置的 Token：
   ```javascript
   const QQ_BOT_TOKEN = 'meowlove-qq-bot-2026';
   ```

   > 💡 提示：这个 Token 是您在 QQ 机器人开放平台配置回调地址时设置的

4. 点击 **「Done」** 保存

---

## 🚀 第三步：激活工作流

1. 点击工作流右上角的 **「Inactive」** 开关，变为 **「Active」**

2. 看到 **「Production」** 标签变为绿色，表示已激活

---

## 🎯 第四步：配置 QQ 机器人平台

### 登录 QQ 机器人开放平台

1. 访问：https://bot.q.qq.com

2. 进入您的机器人管理页面（AppID: 102838256）

### 配置回调地址

在 **「开发设置」** → **「事件推送」** 中配置：

| 配置项 | 值 |
|--------|-----|
| **回调地址** | `https://n8n.meowlove.cn/webhook/qq-bot-wallabag` |
| **Token** | `meowlove-qq-bot-2026` |

> ⚠️ **重要**：这里的 Token 必须和 n8n 签名验证节点中设置的 Token 完全一致！

---

## ✅ 配置完成后的测试

在 QQ 中向机器人发送消息：

### 保存文章
```
保存 https://example.com/article
```

### 搜索文章
```
搜索 人工智能
```

---

## 📊 工作流节点说明

| 节点名称 | 功能 | 需要配置 |
|----------|------|----------|
| **QQ Bot Webhook** | 接收 QQ 机器人事件 | ❌ 无需配置 |
| **Verify Signature** | 验证签名 | ✅ **需要修改 Token** |
| **Check Verified** | 检查验证结果 | ❌ 无需配置 |
| **Parse Intent** | 解析用户意图 | ❌ 无需配置 |
| **Route Intent** | 路由到不同操作 | ❌ 无需配置 |
| **Save to Wallabag** | 保存到 Wallabag | ❌ 已配置凭证 |
| **Search Wallabag** | 搜索 Wallabag | ❌ 已配置凭证 |
| **Respond Success** | 返回成功响应 | ❌ 无需配置 |
| **Respond Error** | 返回错误响应 | ❌ 无需配置 |

---

## 🔍 节点识别帮助

如果您不确定哪个是签名验证节点，请查看：

1. **节点名称**：`Verify Signature`
2. **节点类型**：`Function`
3. **节点位置**：Webhook 节点后面的第一个节点

双击任何节点都可以查看其名称和内容。

---

## ❓ 常见问题

### Q1: 找不到「Verify Signature」节点？
**A**: 导入后的节点名称可能与预期不同，请寻找包含 `signature` 或 `签名` 关键词的 Function 节点。

### Q2: Token 应该设置为什么？
**A**: 这是您自己定义的密钥，建议格式：`项目名-qq-bot-年月`，如 `meowlove-qq-bot-2026`

### Q3: 不配置签名验证可以吗？
**A**: 可以，但不安全。任何人知道您的 Webhook 地址都可以伪造请求。建议保留签名验证。

---

## 📞 需要帮助？

如果遇到问题，请检查：
1. n8n 工作流是否已激活（Active 状态）
2. QQ 平台的 Token 是否与 n8n 中设置的完全一致
3. 回调地址是否正确（包含 `/webhook/qq-bot-wallabag`）
