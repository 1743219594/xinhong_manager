<!-- 推文管理 -->
<script setup>

import {ref ,inject, onMounted} from "vue";
import * as XLSX from 'xlsx'
    const api=inject('api')
    let dialogFormVisible=ref(false)
    let timelimit=ref('')
    let title=ref('')
    let type=ref("a")
    let Aselection=ref('')
    let Bselection=ref('')
    let Cselection=ref('')
    let Dselection=ref('')
    let result=ref('')
    let theme=ref('')
    let formdata=new FormData()
    let datalist=ref([]);
    let Registration=ref(false)
    let Byresult=ref('')
    let Dateutil=(s)=>{
    const dateObject = new Date(s)
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
}
    let typeInto=(s)=>{
        if(s=='a')
        {
            return '单选题'
        }
        else if(s=='b')
        {
            return '多选题'
        }
    }
    let questionlist=ref([])
    onMounted(()=>{
        api.getQuestion((res)=>{
            if(res.data.status==200)
            {
                questionlist.value=res.data.data
            }
            else{
                ElMessage('获取失败')
            }
        })
    })
    let upload=()=>{
      formdata.append('title',title.value)
      formdata.append('timelimit',timelimit.value)
      formdata.append('type',type.value)
      formdata.append('result',result.value)
      formdata.append('Aselection',Aselection.value)
      formdata.append('Bselection',Bselection.value)
      formdata.append('Cselection',Cselection.value)
      formdata.append('Dselection',Dselection.value)
      formdata.append('theme',theme.value)
      api.upload_question(formdata,(res)=>{
        formdata=new FormData()
        timelimit.value=''
        title.value=''
        type.value=''
        result.value=''
        Aselection.value=''
        Bselection.value=''
        Cselection.value=''
        Dselection.value=''
        theme.value=''
        dialogFormVisible.value=false
        if(res.data.status==200)
        {
            ElMessage({ type: 'success',message: '发布成功' })
            api.getQuestion((res)=>{
            if(res.data.status==200)
            {
                questionlist.value=res.data.data
            }
            else{
                ElMessage('获取失败')
            }
        })
        }
        else{
            ElMessage('发布失败')
        }
      })
    }
    let checklist=(id,result)=>{
        Byresult.value=result
        api.getaquestion(id,(res)=>{
            if(res.data.status==200)
            {
                Registration.value=true
                datalist.value=res.data.data
            }
            else{
                ElMessage('获取失败')
            }
        })
    }
    let compare=(content,result)=>{
          // 将字符串转化为数组并按字符排序
            const sortedStr1 = content.split('').sort().join('');
            const sortedStr2 = result.split('').sort().join('');

            // 比较排序后的字符串是否相同
           if(sortedStr1 === sortedStr2)
           {
            return true
        }
            else{
                return false
            }
    }
    let logout=()=>{
        const filteredData = datalist.value.map(item => {
            item.compare=compare(item.content,Byresult.value)
            return item
        });
       
        const ws = XLSX.utils.json_to_sheet(filteredData);
        ws['A1'].v='学号'
        ws['B1'].v='回答情况'
        ws['C1'].v='题号'
        ws['D1'].v='结果'
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); 
        XLSX.writeFile(wb, '答题情况表.xlsx');
    }
</script>
<template>
    <div class="main">
       
      <div class="center">
        <el-button type="primary" @click="dialogFormVisible = true" size="large" style="font-size: medium;"><el-icon><CirclePlusFilled /></el-icon>&nbsp;&nbsp;发布答题</el-button>
        <el-dialog v-model="dialogFormVisible" title="发布答题" center align-center>
            <el-form class="content" label-position="left" label-width="70" >
                <el-form-item label="主题" >
                        <el-input   v-model="theme"></el-input>
                    </el-form-item>
                <el-form-item label="题目" >
                        <el-input   v-model="title" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
                    </el-form-item>
                    <el-form-item label="题目类型" >
                        <el-select v-model="type" placeholder="请选择题目类型">
                            <el-option label="单项选择" value="a"/>
                            <el-option label="多项选择" value="b"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="A选项" >
                        <el-input   v-model="Aselection"></el-input>
                    </el-form-item>
                    <el-form-item label="B选项" >
                        <el-input   v-model="Bselection"></el-input>
                    </el-form-item>
                    <el-form-item label="C选项" >
                        <el-input   v-model="Cselection"></el-input>
                    </el-form-item>
                    <el-form-item label="D选项" >
                        <el-input   v-model="Dselection"></el-input>
                    </el-form-item>
                    <el-form-item label="答案" >
                        <el-input   v-model="result" placeholder="格式为a(单选),abc(多选)"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="截止时间" >
                    <el-date-picker
                        v-model="timelimit"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                      </el-form-item>
                    <el-button @click="upload" type="primary" size="large">发布</el-button>
                </el-form>
        </el-dialog>
        <el-dialog v-model="Registration" title="答题列表" center align-center>
            <el-button type="primary" size="large" @click="logout"><el-icon><Download /></el-icon>导出</el-button>
            <el-table :data="datalist" style="margin-top: 20px;width: auto;" stripe border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }" height="100%"
        fit="false">
        <el-table-column type="index" label="序号" width="150"/>
 
        <el-table-column prop="studentid" label="学号" width="190"/>
        <el-table-column prop="content" label="回答情况" width="180"/>
        <el-table-column prop="content" label="回答情况" width="180">
            <template v-slot="{ row }">
                    <el-text>{{ compare(row.content,Byresult)}}</el-text>
                </template>
        </el-table-column>
            </el-table>
            
        </el-dialog>
        <el-table :data="questionlist" style="width: 100%;margin-top: 20px;;" stripe border :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }" height="100%"
        fit="true">
        <el-table-column type="index" label="序号" width="150">
      </el-table-column>
      <el-table-column prop="theme" label="主题" width="150">
            </el-table-column>
             <el-table-column prop="title" label="题目" width="150">
            </el-table-column>
            <el-table-column prop="type" label="题目类型" width="160">
                <template v-slot="{ row }">
                    <el-text>{{ typeInto(row.type) }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="Aselection" label="A选项" width="120">
            </el-table-column>
            <el-table-column prop="Bselection" label="B选项" width="120"/>
            <el-table-column prop="Cselection" label="C选项" width="160" />
            <el-table-column prop="Dselection" label="D选项" width="160" />
            <el-table-column prop="time" label="活动截止时间" width="160">
                <template v-slot="{ row }">
                    <el-text>{{ Dateutil(row.time) }}</el-text>
                </template>
                </el-table-column>
                <el-table-column prop="result" label="答案" width="160" />  
                <el-table-column prop="timelimit" label="操作" width="160" fixed="right">
                <template v-slot="{ row }">
                    <el-button link type="primary" @click="checklist(row.id,row.result)">查看答题情况</el-button>
                </template>
                </el-table-column>
          
            </el-table>
      </div>
    </div>
</template>
<style scoped>
    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .center{
        width: 90%;
        margin-top: 30px;
    }
   
</style>