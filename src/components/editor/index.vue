<template>
  <div class="editor">

  <!--  <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      name="img"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload">
    </el-upload>-->


    <quill-editor class="editor"
                  ref="myQuillEditor"
                  v-model="editorContent"
                  :options="editorOption"
                  @change="onEditorChange($event)">
    </quill-editor>


  </div>
</template>

<script>
  import {quillRedefine} from 'vue-quill-editor-upload'
export default {
  name: 'editor',
  props:{
    content:String,
    required:true
  },
  data () {
      return {
        text:'',
        imageList:[],
        editorOption: {},
        editorContent:this.content,
        uploadUrl:process.env.VUE_APP_BASE_URL+'/api/upload/file'
      }

  },
  watch:{
    content(val){
      this.editorContent=val
    }

  },

  created () {
    this.editorOption = quillRedefine(
      {
        // 图片上传的设置
        uploadConfig: {
          action: this.uploadUrl,  // 必填参数 图片上传地址
          // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
          // 你必须把返回的数据中所包含的图片地址 return 回去
          res: (respnse) => {

            return respnse[0]
          },
          methods: 'POST',  // 可选参数 图片上传方式  默认为post
         /* token: sessionStorage.token,*/  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
           name: 'path',  // 可选参数 文件的参数名 默认为img
        /*  size: 500,*/  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
          accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
          // input点击事件  formData是提交的表单实体
          change: (formData) => {

          },
          // 设置请求头 xhr: 异步请求， formData: 表单对象
          header: (xhr, formData) => {
            // xhr.setRequestHeader('myHeader','myValue');
            // formData.append('token', '1234')
          },
          // start: function (){}
          start: () => {
          },  // 可选参数 接收一个函数 开始上传数据时会触发
          end: () => {
          },  // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
          success: () => {
          },  // 可选参数 接收一个函数 上传数据成功时会触发
          error: () => {
          }  // 可选参数 接收一个函数 上传数据中断时会触发
        },
        // 以下所有设置都和vue-quill-editor本身所对应
        modules: {

          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["image"] // 链接、图片、视频   /!*"link",, "video"*/
          ], //工具菜单栏配置
          handlers: {
            'image': function (value) {
              if (value) {
                // 触发input框选择图片文件
                document.querySelector('.avatar-uploader input').click()
              } else {
                this.quill.format('image', false);
              }
            }
          }
        },
        placeholder: '请在这里添加描述', //提示
        readyOnly: false, //是否只读
        theme: 'snow', //主题 snow/bubble
        syntax: true, //语法检测
      }
    )

  },



  methods: {

    /*获取字符串中图片的地址*/
    getContextImage(str){
       var imageList=[];
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = str.match(imgReg);

      for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(srcReg);
        imageList.push(src[1]);
      }
      return imageList;
    },


    // 值发生变化
    onEditorChange(editor) {
      /*this.content = editor.html;
      this.text=editor.text;
      this.imageList=[];
      this.$emit('onEditorChange',this.content,this.text,this.imageList);*/
      /*this.imageList=this.getContextImage(this.content);*/
      this.$emit('onEditorChange',editor);

    },

// 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myTextEditor.quill
      // 如果上传成功
      if (res.code === '200' && res.info !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.info)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },

    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }




  },


}
</script>

<style lang="scss" scoped>
  .editor {
    line-height: normal !important;
    height: 500px;

  }
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }

</style>
