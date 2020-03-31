<template>
  <div>
    <br>
    <Row>
      <i-col :span="1"><br></i-col>
      <i-col span="8">
        <div>
        <textarea
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 50}"
          placeholder="请输入备忘录内容"
          v-model="textarea2"
          style="width: 468px">
        </textarea>
          <i-table height="280" :columns="columns1" :data="data2"></i-table>
          <br>
          <i-button @click="addContent">保存修改</i-button>
          <i-button @click="deleteGesture">删除手势</i-button>
        </div>
      </i-col>
      <i-col :span="1"><br></i-col>
      <i-col :span="13">
        <div class="recognize">
          <div class="add">
            <h2>新增手势</h2>
            <input id="gestureName" placeholder="手势名称" v-model="newGestureName" style="width: 100px"></input>
            <i-button id="btn" @click="addNewGesture">ADD</i-button>
          </div>
          <div class="result">
            <h2>识别结果</h2>
            <p>匹配结果: <span style="font-weight: bold; color: #2b5;" id="result">{{gestureResult}}</span></p>
            <p>滑动方向的结果: <span style="font-weight: bold; color: #2b5;" id="result0">{{swipeResult}}</span></p>
          </div>
          <div class="stage" v-smart-gesture="options"></div>
        </div>
      </i-col>
      <i-col :span="1"><br></i-col>
    </Row>
  </div>

</template>

<script>
  import smartGesture from '../lib/smart-gesture';
  var gesture_id;
  export default {
    data() {
      return {
        columns1: [{
          title: '手势名称',
          key: 'name'
        }, {
          title: '内容',
          key: 'context'
        }],
        data2: [{
          name: 'W',
          context: '王凡是渣男！'
        }],
        options: {
          enablePath: true,
          timeDelay: 100,
          lineColor: '#666',
          lineWidth: 4,
          triggerMouseKey: 'left',
          activeColor: 'rgba(0, 0, 0, .05)',
        },
        swipeResult: '',
        gestureResult: '',
        lastPoints: [],
        newGestureName: '',
        textarea2: ''
      };
    },
    ready() {
      this.loadGestures();
    },
    directives: {
      smartGesture
    },
    methods: {
      loadGestures() {
        var this_ = this
        this.$axios.get('/memos',{params: { 'userId': 1 }}).then(function (data) {
          var temp = data.data;
          for (let i = 0; i < temp.length; i++) {
            this_.data2.push({name: temp[i].title, context: temp[i].content});
          }
        })
      },
      addNewGesture() {
        if (!this.newGestureName) {
          alert('给我起个名字啊！');
          return;
        }
        this.$smartGesture.addGesture({
          name: this.newGestureName,
          points: this.lastPoints,
        });
        let gesture_name = this.newGestureName;
        let gesture_content = this.textarea2;
        let cur_s = '';
        for(let i = 0;i<this.swipeResult.length;i++){
          cur_s = cur_s+this.swipeResult[i];
        }
        this.$axios.post('/memo',{
          userId:1,
          key:cur_s,
          title:gesture_name,
          content:gesture_content
        }).then(function (data) {
          location.reload();
          alert("添加手势成功！");
        })
        this.textarea2 = '';
      },
      addContent() {
        let new_content = this.textarea2;
        let ser_name = this.newGestureName;
        let cur_s = '';
        for(let i = 0;i<this.swipeResult.length;i++){
          cur_s = cur_s+this.swipeResult[i];
        }
          this.$axios.post('/memo',{
            id:gesture_id,
            title:ser_name,
            content:new_content
          }).then(function (data) {
            location.reload();
            alert('修改成功！');
          })

      },
      deleteGesture(){
       this.$axios.delete('/memo',{params: { 'id': gesture_id }}).then(function (data) {
         location.reload();
         alert('删除成功！');
       })

      },
      'smart-gesture-onswipe': function (list) {
        this.swipeResult = list;
      },
      'smart-gesture-ongesture': function (res, points) {
        this.gestureResult = res.score > 2 ? res.name : '未识别';
        this.lastPoints = points;
        this.newGestureName = res.name;
      },
    },
    events: {
      'smart-gesture-onswipe': function (list) {
        this.swipeResult = list;
        let cur_s = '';
        for(let i = 0;i<this.swipeResult.length;i++){
          cur_s = cur_s+this.swipeResult[i];
        }
        var this_ = this;
        this.$axios.get('/memo',{params: { 'userId': 1,'key': cur_s }}).then(function (data) {
          var temp = data.data;
          gesture_id = temp.id;
          if(temp.length==0){
            this_.gestureResult = '未识别！新手势！';
          }else{
            this_.textarea2 = temp.content;
            this_.gestureResult = temp.title;
            this_.newGestureName = temp.title;
          }
        })
      },
      'smart-gesture-ongesture': function (res, points) {
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .i-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .i-button {
    margin-top: 5px;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .recognize {
    border: 5px solid #ccc;
    border-radius: 4px;
    padding: 0 15px;
    margin-top: 0px;
  }

  .add,
  .result {
    display: inline-block;
    vertical-align: top;
  }

  .result {
    margin-left: 100px;
    padding-left: 100px;
    border-left: 1px dashed #ccc;
  }

  .config-title {
    display: inline-block;
    width: 200px;
  }

  .option-tip {
    margin-left: 10px;
    font-size: 12px;
    vertical-align: middle;
  }

  .stage {
    height: 400px;
    background: #f5f7f9;
    position: relative;
    margin: 15px 0;
  }

  .stage:before {
    content: '手势输入';
    color: #c3cbd6;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
