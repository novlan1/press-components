<template>
  <HeaderRole
    :node-name="curNodeName"
    :game-name="curGameName"
    :role-id="curRoleId"

    :login-info="loginInfo"
    :role-list="validRoleList"

    @changeRole="onChangeRole"
    @logout="onLogout"
    @login="onLogin"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { HeaderRole } from 'press-tdesign-vue-next';

const curNodeName = 'Mock Node Name';
const curGameName = 'Mock Game Name';
const curRoleId = 'curRoleId';
const loginInfo = ref({
  nick: 'novlan1',
  head: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
  isLogin: true,
});

const validRoleList = [
  {
    label: '角色A',
    value: 'role-a',
  },
  {
    label: '角色B',
    value: 'role-b',
    children: [
      {
        label: '角色B-1',
        value: 'role-b-1',
      },
      {
        label: '角色B-2',
        value: 'role-b-2',
      },
    ],
  },
];

const onLogout = () => {
  console.log('logout');
  loginInfo.value.isLogin = false;
};

const onLogin = () => {
  console.log('login');
  loginInfo.value.isLogin = true;
};

const onChangeRole = (info) => {
  console.log('changeRole', info);
};
</script>
