<template>
  <div class="container ivu-p">
    <div class="dialog">
      <template v-for="(item, index) in dialogs" :key="index">
        <div class="dialog-item" :class="{ 'dialog-item-me': item.role === 'me', 'dialog-item-ai': item.role === 'ai' }">
          <div class="dialog-item-main">{{ item.text }}</div>
        </div>
      </template>
    </div>
    <div class="question ivu-mt">
      <Input v-model="question" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" placeholder="输入你的问题" />
      <Row class="ivu-mt">
        <Col>
          <Button type="primary" size="large" icon="md-send" :loading="loading" @click="handleSend">发送</Button>
        </Col>
        <Col>
          <Button size="large" class="ivu-ml" icon="md-add" :disabled="loading" @click="handleNewChat">新对话</Button>
        </Col>
      </Row>
      <Typography class="ivu-text-center ivu-m">
        Powered By <img src="src/assets/logo.png" class="logo"> <a href="https://inscode.net" target="_blank">InsCode.net</a>
      </Typography>
    </div>
  </div>
</template>
<script>
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { apiKey, apiUrl } from './api';

export default {
  data() {
    return {
      question: '',
      loading: false,
      dialogs: []
    }
  },
  methods: {
    handleSend() {
      if (this.loading || this.question === '') return;
      this.loading = true;

      const question = this.question;
      this.question = '';

      this.dialogs.push({
        id: this.dialogs.length + 1,
        role: 'me',
        text: question
      });

      const aiDialogID = this.dialogs.length + 1;

      this.dialogs.push({
        id: aiDialogID,
        role: 'ai',
        text: 'AI 思考中...'
      });

      const dialog = this.dialogs.find(item => item.id === aiDialogID);

      /**
       * 发送请求，InsCode 已经集成了 GPT 能力
       * 在 vite.config.js 中已通过环境变量写入了 apiKey（该 key 是动态写入使用者的，在 IDE 中是作者，发布到社区是运行该作品的用户）
       * 发布到社区后，将消耗运行者的额度
       * 注意：如果部署应用，任何人通过部署后的域名访问应用时，都将消耗部署者的额度
       */
      const body = {
        messages: [
          {
            role: 'user',
            content: question
          }
        ],
        apikey: apiKey
      }

      const source = fetchEventSource(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        onopen: (response) => {
          dialog.text = '';
        },
        onmessage: (msg) => {
          if (msg.data === '[DONE]') {
            this.loading = false;
            return;
          };
          const data = JSON.parse(msg.data);
          const finish_reason = data.choices[0].finish_reason;
          const finish = finish_reason === 'stop' || finish_reason === 'length';
          const content = data.choices[0].delta.content;

          if (finish) {
            this.loading = false;
          } else if (content) {
            const text = content;
            dialog.text += text;
          }
        },
        onerror: (err) => {
          console.log("error", err);
        }
      });
    },
    handleNewChat() {
      this.dialogs = [];
    }
  }
}
</script>
<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dialog {
  flex: 1;
  overflow: auto;
}

.dialog-item {
  display: flex;
}

.dialog-item-main {
  max-width: 80%;
  padding: 8px;
  word-wrap: break-word;
  margin-top: 16px;
  border-radius: 4px;
}

.dialog-item-me {
  justify-content: flex-end;
}

.dialog-item-me .dialog-item-main {
  background-color: antiquewhite;
}

.dialog-item-ai .dialog-item-main {
  background-color: #eee;
}
.logo{
  width: 16px;
  height: 16px;
  vertical-align: middle;
  position: relative;
  top: -1px;
}
</style>