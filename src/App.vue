<template>
  <div class="container ivu-p">
    <div class="dialog">
      <template v-for="(item, index) in dialogs" :key="index">
        <div class="dialog-item" :class="{ 'dialog-item-me': item.role === 'me', 'dialog-item-ai': item.role === 'ai' }">
          <div class="dialog-item-main">{{ item.text }}</div>
        </div>
      </template>
    </div>
    <div class="prompt ivu-mt">
      <Input
       v-model="prompt" 
       type="textarea" 
       :autosize="{ minRows: 4, maxRows: 6 }" 
       placeholder="输入你的问题" 
      />
      <Button class="ivu-mt" type="primary" size="large" :loading="loading" @click="handleSend">发送</Button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        prompt: '',
        loading: false,
        dialogs: [
          {
            role: 'me',
            text: 'vscode 的'
          },
          {
            role: 'ai',
            text: 'dshjfjksdhfkjsdhkjfdsjkhfksdhdfjkjkdsfjkhsdkjfhsddshjfjksdhfkjsdhkjfdsjkhfksdhdfjkjkdsfjkhsdkjfhsddshjfjksdhfkjsdhkjfdsjkhfksdhdfjkjkdsfjkhsdkjfhsd'
          }
        ]
      }
    },
    methods: {
      handleSend () {
        if (this.loading) return;
        this.loading = true;
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