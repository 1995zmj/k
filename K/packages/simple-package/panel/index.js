Editor.Panel.extend({
  style: `
      :host { margin: 5px; }
      h2 { color: #f90; }
    `,

  template: `
      <h2>标准面板</h2>
      <ui-button id="btn">点击</ui-button>
      <hr />
      <div>状态: <span id="label">--</span></div>
    `,

  $: {
    btn: '#btn',
    label: '#label',
  },

  ready() {
    this.$btn.addEventListener('confirm', () => {

      // let fs = require('fs');
      let fs = require("fs-extra");

      let path = require('path');
      // 插件加载后在项目根目录自动创建指定文件夹
      let srcPath = Editor.Project.path + '/' + 'assets/zmj';
      let targePath = Editor.url('packages://simple-package/zmj');

      // Editor.assetdb.move(srcPath, targePath);
      // fs.mkdirSync(path.join(Editor.Project.path + '/' + 'assets', 'zmj'));


      Editor.assetdb.import([targePath], 'db://assets', function (err, results) {
        results.forEach(function (result) {
          // result.uuid
          // result.parentUuid
          // result.url
          // result.path
          // result.type
        });
      });

      Editor.assetdb.refresh('db://assets/', function (err, results) { });
      this.$label.innerText = '你好';
      setTimeout(() => {
        this.$label.innerText = '--';
      }, 500);
    });
  },
});