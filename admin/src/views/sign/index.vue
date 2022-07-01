<template>
  <div>
    <center>
      <h1>
        AutoSpider数据采集工具介绍
      </h1>
    </center>

    <hr/>
    <h2>
      一、AutoSpider是什么
    </h2>
    <span style="text-indent:2em">
      <p style="line-height:200%;">
        AutoSpider是一款新一代网页采集工具，它功能强大，操作简单，是专门为有数据需求的技术人员或者无编程基础的产品、运营、销售、金融、新闻、电商和数据分析从业者，以及政府机关和学术研究等用户量身打造的一款产品。
      </p>
      <p style="line-height:200%;">
        通过使用AutoSpider，用户能够快速、准确、稳定地获取海量网页数据，从而彻底解决了人工收集数据所面临的各种难题，降低了获取信息的成本，提高了工作效率。
      </p>


    </span>

    <h2>
      二、AutoSpider能做什么
    </h2>
    <h4 style="text-indent:2em">
      1、模板采集
    </h4>

    <p style="text-indent:2em" >
      模板采集模式内置多种主流网站数据源，如电商、新闻、社交等热门采集网站，只需参照模板简单设置参数，就可以快速获取网站公开数据。
    </p>

    <h4 style="text-indent:2em">
      2、云采集
    </h4>
    <p style="text-indent:2em">
      由多台云服务器支撑的云采集，不间断运行，可实现定时采集，无需人员值守，灵活契合业务场景，帮你提升采集效率，保障数据时效性。
    </p>
    <h4 style="text-indent:2em">
      3、自定义采集
    </h4>
    <p style="text-indent:2em;line-height:200%;">
      针对不同用户的采集需求，AutoSpider可提供自动生成爬虫的自定义模式，可准确批量识别各种网页元素，还有翻页、下拉、ajax、页面滚动等多种功能，支持不同网页结构的复杂网站采集，满足多种采集应用场景。
    </p>
    <h4 style="text-indent:2em">
      4、多层级采集
    </h4>
    <p style="text-indent:2em;line-height:200%;">
      很多主流新闻、电商类的网站，里面包含一级商品列表页，也包含二级商品详情页，还有三级评论详情页面；不论网站有多少层级，AutoSpider都可以不限制层级的采集数据，满足各类业务采集需求。
    </p>
    <h4 style="text-indent:2em">
      5、支持网站登录后采集
    </h4>
    <p style="text-indent:2em;line-height:200%;">
      AutoSpider支持需要登录的网站采集，只需配置目标网站的账号密码，即可用该模块采集到登录后的数据；同时AutoSpider还具备采集Cookie自定义功能，首次登录以后，可以自动记住cookie，免去多次输入密码的繁琐，支持更多网站的采集。
    </p>
    <h2>
      三、AutoSpider使用场景
    </h2>
    <h4 style="text-indent:2em">
      1、舆情监控
    </h4>
    <h4 style="text-indent:2em">
      2、市场分析
    </h4>
    <h4 style="text-indent:2em">
      3、产品研发
    </h4>
    <h4 style="text-indent:2em">
      4、风险预测
    </h4>
    <h4 style="text-indent:2em">
      5、价格感知
    </h4>
    <h4 style="text-indent:2em">
      6、综合信用服务平台
    </h4>
    <h4 style="text-indent:2em">
      7、机器学习训练样本
    </h4>
    <h4 style="text-indent:2em">
      8、知识图谱
    </h4>
  </div>
<!--  <div style="padding:30px">-->
<!--    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">-->
<!--      <el-form-item label="密码" prop="pass">-->
<!--        <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
<!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <el-form-item label="确认密码" prop="checkPass">-->
<!--      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="年龄" prop="age">-->
<!--      <el-input v-model.number="ruleForm.age"></el-input>-->
<!--    </el-form-item>-->
<!--  </div>-->
</template>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(this.$route)
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
