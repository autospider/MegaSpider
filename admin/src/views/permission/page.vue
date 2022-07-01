<template>
  <div>
<!--    <div class="app-container" v-if="checkPermission(['admin'])">-->
<!--      <switch-roles @change="handleRolesChange" />-->
<!--    </div>-->
    <div  class="dashboard-editor-container">
<!--      <div style="margin-bottom:15px;">-->
        <!--      Your roles: {{ roles }}-->
<!--        您当前角色为: editor-->
<!--      </div>-->
      <div class="clearfix">
        <pan-thumb :image="avatar" style="float: left">
          Your roles:
          <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>
        </pan-thumb>
        <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
        <div class="info-container">
          <span class="display_name">{{ name }}</span>
          <span v-if="checkPermission(['editor'])" style="font-size:20px;padding-top:20px;display:inline-block;">您可以提交采集任务，请移步爬虫菜单</span>
          <span v-if="checkPermission(['admin'])" style="font-size:20px;padding-top:20px;display:inline-block;">您可自行编写爬虫，如有需要，请移步爬虫菜单</span>
<!--          <div class="app-container">-->
            <switch-roles v-if="checkPermission(['admin'])" @change="handleRolesChange" />
<!--          </div>-->
        </div>
      </div>
      <div>
        <img :src="emptyGif" class="emptyGif">
      </div>
    </div>

  </div>

</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import checkPermission from "../../utils/permission";
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'
export default {

  name: 'PagePermission',
  components: { SwitchRoles , PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
