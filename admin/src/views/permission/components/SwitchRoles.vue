<template>
  <div>
<!--    <div style="margin-bottom:15px;">-->
<!--&lt;!&ndash;      Your roles: {{ roles }}&ndash;&gt;-->
<!--      您当前角色为: {{ roles }}-->
<!--    </div>-->
<!--    Switch roles:-->
    切换角色:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>
<script>
import role from "../role";

export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        console.log(this.roles)
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
