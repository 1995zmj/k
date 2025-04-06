// panel/index.js
Editor.Panel.extend({
    style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

    template: `
    <h2>excel to json</h2>
    <h3>把表格放在项目目录下的 excel 文件夹下</h3>
    <h4>生成的json会添加到assets/JsonSrc</h4>
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
            this.$label.innerText = 'donging...';
            Editor.log(Editor.Project.path);
            const fs = require('fs');
            const xlsx = require('../xlsx/xlsx');
            const path = require('path');

            excel_root_path = path.join(Editor.Project.path, 'excel')
            save_root_path = "db://assets/DataSrc/"
            save_json_root_path = "db://assets/resources/json/"
            fs.readdir(excel_root_path, (err, files) => {
                if (err) {
                    Editor.error('读取目录出错')
                    return
                }

                filter_files_path = files.filter(file => {
                    // 过滤条件
                    const isExcel = ['.xlsx', '.xls'].includes(path.extname(file).toLowerCase());
                    const isTempFile = file.startsWith('~$');
                    return isExcel && !isTempFile;
                }).map(file => path.join(excel_root_path, file));
                completed_count = 0
                max_count = filter_files_path.length
                filter_files_path.forEach((file) => {
                    Editor.log(file)
                    completed_count = 0
                    excel_path = file
                    const workbook = xlsx.readFile(excel_path)
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = xlsx.utils.sheet_to_json(worksheet);

                    // 提取表头
                    const firstCell = worksheet['A1'] ? worksheet['A1'].v : null;
                    const nestedData = {};
                    jsonData.forEach((row) => {
                        const key = row[firstCell];
                        nestedData[key] = row;
                    });
                    base_name = path.basename(excel_path, path.extname(excel_path))
                    const tsFilePath = save_root_path + base_name + '.ts';
                    Editor.log(tsFilePath)

                    // 直接导出TS
                    // code_string = `export const ${base_name} =`
                    // tempstring = code_string + JSON.stringify(nestedData, null, 4)
                    // Editor.assetdb.createOrSave(tsFilePath, tempstring, function (err, results) {
                    //     if (err) {
                    //         Editor.error('创建资源报错')
                    //         return
                    //     }
                    //     completed_count += 1
                    //     Editor.log(completed_count + '/' + max_count);
                    // });
                    

                    const jsonFilePath = save_json_root_path + base_name + '.json';
                    Editor.assetdb.createOrSave(jsonFilePath, JSON.stringify(nestedData, null, 4), function (err, results) {
                        if (err) {
                            Editor.error('创建资源报错')
                            return
                        }
                    });
                })
            })

        });
    },
});