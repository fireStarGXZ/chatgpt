<template>
  <div class="ivu-p">
    <Alert>
      当前 Vue 版本为 {{ vueVersion }}，View UI Plus 版本为 {{ version }}
    </Alert>
    <Input v-model="msg" />
    <Button class="ivu-mt" type="primary" @click="handleClick">Click Me!</Button>
  </div>
</template>
<script setup>
import { ref, version as vueVersion } from 'vue' // 从 Vue 中导入 ref 和 vueVersion
import { version, Message } from 'view-ui-plus' // 从 view-ui-plus 中导入 version 和 Message
const msg = ref('Hello View Design!') // 创建一个响应式的变量 msg，并将其初始值设置为 'Hello View Design!'

function handleClick() { // 定义一个名为 handleClick 的函数
  Message.info('Welcome to InsCode') // 在页面上显示一个提示消息
}
</script>

<style></style>