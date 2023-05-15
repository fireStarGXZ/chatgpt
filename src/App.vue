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
    </div>
  </div>
</template>
<script>
import { EventSourcePolyfill } from 'event-source-polyfill';

const token = 'Bearer ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjBkQ0k2TkN3aVlYVmtJam9pWXpkbU16WTVOMlpqTldaak5EVmpNR0l5WldFNE5UVTNaRFkxTnpnM1lXVWlMQ0pzZFNJNklrbHVjME52WkdVaUxDSmxlSEFpT2pFMk9EVTFORGczT1Rrc0luVnlJam95TENKcWRHa2lPaUpCVUVsZlZFOUxSVTVmWXpkbU16WTVOMlpqTldaak5EVmpNR0l5WldFNE5UVTNaRFkxTnpnM1lXVXROQ0o5LmlyLTJYa1A4dFhNaFVldnlzTFhkUlJsY1VBV0ZiaWE5em9ZdGN6VlpleFk=';
const api = 'https://api.ai100.ai/ai/api/ai/chat';

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

      const query = {
        prompt: '',
        question,
        stream: true
      }

      const source = new EventSourcePolyfill(
        `${api}?question=${query.question}&prompt=${query.prompt}&stream=${query.stream}`,
        {
          headers: {
            Accept: '*/*',
            Authorization: token
          }
        }
      )

      source.onopen = event => {
        console.log("onopen", event);
        const dialog = this.dialogs.find(item => item.id === aiDialogID);
        dialog.text = '';
      };
      source.onmessage = event => {
        if (event.data === "[DONE]") {
          source.close();
          this.loading = false;
        }
        if (event.data) {
          const data = JSON.parse(event.data);
          const text = data.message.content.parts.join("");
          console.log(text);
          const dialog = this.dialogs.find(item => item.id === aiDialogID);
          dialog.text += text;
        }
      };
      source.onerror = event => {
        console.log("error", event);
      };
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
</style>