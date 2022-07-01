<script>
export default {
  created() {
    console.log("之前",this.router)
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
    console.log("之后",this.$router)
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
