<template>
  <div>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:15pt">
      <span style="font-family:'等线'; font-weight:bold">AutoSpider使用说明</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">&#xa0;</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">主要分为四个配置版块：入口，解析器，分发器，设置</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">&#xa0;</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-indent:-21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">一、</span>
      <span style="font-family:'等线'">入口（entrance）</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <img src="../../img/entrance_new.png" width="584" height="207" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">encoding：填入页面的编码类型（utf</span>
      <span style="font-family:'等线'">-8</span>
      <span style="font-family:'等线'">，</span>
      <span style="font-family:'等线'">gbk</span>
      <span style="font-family:'等线'">等等）</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">datatype：响应的数据类型（dom，json等）</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">
        </span>
      <span style="font-family:'等线'">了解：html：</span>
      <a href="https://www.w3school.com.cn/html/index.asp" style="text-decoration:none">
        <span style="font-family:'等线'; text-decoration:underline; color:#0000ff">https://www.w3school.com.cn/html/index.asp</span>
      </a>
    </p>
    <p style="margin-top:0pt; margin-left:12pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">json：</span>

      <a href="https://www.w3cschool.cn/json/" style="text-decoration:none">
        <span style="font-family:'等线'; text-decoration:underline; color:#0000ff">https://www.w3cschool.cn/json/</span>
      </a>
    </p>
    <p style="margin-top:0pt; margin-left:63pt; margin-bottom:0pt; text-indent:12pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">xpath：</span>
      <a href="https://www.w3school.com.cn/xpath/index.asp" style="text-decoration:none">
        <span style="font-family:'等线'; text-decoration:underline; color:#0000ff">https://www.w3school.com.cn/xpath/index.asp</span>
      </a>
    </p>
    <p style="margin-top:0pt; margin-left:63pt; margin-bottom:0pt; text-indent:12pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">jsonpath：</span>
      <a href="https://www.bilibili.com/video/BV1Ja411i7tx" style="text-decoration:none">
        <span style="font-family:'等线'; text-decoration:underline; color:#0000ff">https://www.bilibili.com/video/BV1Ja411i7tx</span>
      </a>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">inherit：需要向下传递的数据</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">task：传入初始的请求url，请求方法method，请求体body，请求头headers（如下图）</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <img src="../../img/task.png" width="554" height="102" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">&#xa0;</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">二</span>
      <span style="font-family:'等线'">.</span>
      <span style="font-family:'等线'">、解析器（parser）</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">解析器主要是用来解析爬虫采集的当前页面结构，获取想要的内容</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <img src="../../img/parser_new.png" width="576" height="172" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">StepName：为必填值，例如entrance，list，detail等</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">name：字段名，自行命名</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">parseType</span>
      <span style="font-family:'等线'">：解析方式，</span>
      <span style="font-family:'等线'">xpath,json,re,str,value,any</span>
      <span style="font-family:'等线'">等几种，xpath表示解析html，xml数据，json解析json数据类型，re为正则解析，str转为字符串</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">rule：解析规则，例如传入具体xpath，/</span>
      <span style="font-family:'等线'">/h1/text()</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">out：输出类型转换，可输出</span>
      <span style="font-family:'等线'">url,html,dom,range,datetime,list,any</span>
      <span style="font-family:'等线'">，url表示提取出的结果为url链接，html表示为html格式数据，dom表示可直接使用xpath进行提取的dom结构，range为一组数值，datetime转化成时间类型，list表示输出为数组，any为默认值</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">target：解析数据目标，</span>
      <span style="font-family:'等线'">parameter,res,inherit,prev</span>
      <span style="font-family:'等线'">，无特殊要求时，默认为parameter，res表示解析响应结果，inherit表示接收上一步传下来的参数，prev解析上一步的解析结果</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">next：二次解析，有些内容在一次解析无法提出干净的结果，就需要再次解析，可以在此步实现，选择next为True，点击‘操作’键的‘下一步’</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <img src="../../img/sample1.png" width="544" height="331" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">（图1）</span>
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">图1是一个网站的主页导航栏，从这里可以获取到不同的具体分类，可以作为爬虫入口，StepName命名为entrance，解析第一步入口传入的url响应结果；</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <img src="../../img/sample2.png" width="571" height="267" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">（图2）</span>
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">图2是图1中分类点击进入后的页面，可以看到许多发布的招聘信息，并且可以翻页，StepName命名为list</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <img src="../../img/sample3.png" width="572" height="336" alt="" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:center; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">（图3）</span>
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">图3是最终一个单独招聘岗位的详细信息，就可以提取想要的字段内容了，例如岗位名称，待遇，职位描述，岗位要求等等信息，StepName可以命名为detail</span>
    </p>
    <p style="margin-top:0pt; margin-left:39pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">&#xa0;</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'; background-color:#c0c0c0">三、</span>
      <span style="font-family:'等线'">分发器（sender）</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">串联解析器的流程</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <img src="../../img/sender_new.png" width="562" height="150" alt="dbe726553af48c8c4c4ee89f49aae07" style="-aw-left-pos:0pt; -aw-rel-hpos:column; -aw-rel-vpos:paragraph; -aw-top-pos:0pt; -aw-wrap-type:inline" />
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">actKey：与解析器中StepName对应</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">source：获取对应解析器步骤中的对应位置的解析结果</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">type：分为store和req，req表示当次任务为网络请求，store表示存储最终结果</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">target：分发目标，即下一步任务的名称</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">targetType：存储store对应的文件格式，csv，bson等</span>
    </p>
    <p style="margin-top:0pt; margin-left:21pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">&#xa0;</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:'等线'">四、设置（setting）</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">taskName：任务名称</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">taskGroup：任务组</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">taskKey：任务ID</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">resource：资源类型，proxy表示使用代理ip</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">resourceKey：资源ID</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:'等线'">encoding：网站默认编码</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">interval</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">：调度间隔</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">concurrency</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">：下载器并发量，不能为</span>
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">0</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">，</span>
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">-</span>
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">1</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">为不限</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">timeout</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">：设置请求超时时间</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">retryTimes</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">：设置请求重试次数</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-indent:21pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="font-family:Helvetica; color:#606266; background-color:#f5f7fa">retryCode</span>
      <span style="font-family:'等线'; color:#606266; background-color:#f5f7fa">：设置请求重试时的响应码</span>
    </p>
    <p style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
      <span style="width:21pt; display:inline-block">&#xa0;</span>
    </p>
  </div>
</template>
