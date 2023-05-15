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
      <Input
       v-model="question" 
       type="textarea" 
       :autosize="{ minRows: 4, maxRows: 6 }" 
       placeholder="输入你的问题" 
      />
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
  const token = 'Bearer ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjBkQ0k2TkN3aVlYVmtJam9pTmpZME56QTNaR016TUdabU5ETTRNRGs1WkRBek9EWTFPRFV5T0RsaE0yWWlMQ0pzZFNJNklubGhibWgxYVNJc0ltVjRjQ0k2TVRZNE5UVTBPRGM1T1N3aWRYSWlPaklzSW1wMGFTSTZJa0ZRU1Y5VVQwdEZUbDgyTmpRM01EZGtZek13Wm1ZME16Z3dPVGxrTURNNE5qVTROVEk0T1dFelppMDBJbjAuejRNWE4xOHVoQmI0Y29WbHd1dm4tNzA1eG1RRHBsRE43cHA3cUxURzN0NA==';
  const api = 'https://api.ai100.ai/ai/api/ai/chat';

  export default {
    data () {
      return {
        question: '',
        loading: false,
        dialogs: [
          {
            role: 'me',
            text: '你好'
          },
          {
            role: 'ai',
            text: '你也好'
          }
        ]
      }
    },
    methods: {
      async handleSend () {
        if (this.loading || this.question === '') return;
        this.loading = true;
        // todo
        const response = await fetch(api, this.getParams());
        console.log(response)
      },
      getParams () {
        const headers = {
          "Accept": "*/*",
				  "Authorization": token,
				  "Content-Type": "application/json"
        }

        const payload = {
          prompt: '',
          question: this.question,
          stream: false
        }

        return {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        }
      },
      handleNewChat () {
        this.dialogs = [];
      }
    }
  }
</script>
<style>
  .container{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .dialog{
    flex: 1;
    overflow: auto;
  }
  .dialog-item{
    display: flex;
  }
  .dialog-item-main{
    max-width: 80%;
    padding: 8px;
    word-wrap: break-word;
    margin-top: 16px;
    border-radius: 4px;
  }
  .dialog-item-me{
    justify-content: flex-end;
  }
  .dialog-item-me .dialog-item-main{
    background-color: antiquewhite;
  }
  .dialog-item-ai .dialog-item-main{
    background-color: #eee;
  }
</style>