<template>
  <div v-if="checkPermission(['editor'])">
    <div style="margin-bottom:15px;">
      <!--      Your roles: {{ roles }}-->
      您当前角色为: editor
    </div>

  </div>
</template>
<script>

  import checkPermission from "../../utils/permission";

  export default {
    methods: {
      checkPermission
    }
  }

</script>
