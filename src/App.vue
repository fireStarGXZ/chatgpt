<template>
  <div class="ivu-p">
    <Alert>
      当前 Vue 版本为 {{ vueVersion }}，View UI Plus 版本为 {{ version }}
    </Alert>
    <Input v-model="msg" />
    <Button class="ivu-mt" type="primary" @click="handleClick">Click</Button>
  </div>
</template>
<script setup>
import { ref, version as vueVersion } from 'vue'
import { version, Message } from 'view-ui-plus'
const msg = ref('Hello View Design!')

function handleClick() {
  Message.info('Welcome to InsCode')
}
</script>
<style></style>