<template>
  <div class="hello-edsp-hello-module">
    <div v-loading="loading" class="user-header">
      <span>User Number:</span>
      <span>{{ getUserNum }}</span>
    </div>
    <el-table :data="getList" style="width: 100%">
      <el-table-column prop="date" :label="$t('edspHelloModule.date')" width="180"></el-table-column>
      <el-table-column prop="name" :label="$t('edspHelloModule.name')" width="180"></el-table-column>
      <el-table-column prop="address" :label="$t('edspHelloModule.address')"></el-table-column>
      <el-table-column fixed="right" :label="$t('edspHelloModule.option')" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="showEditHello(scope.row)">{{ $t('edspHelloModule.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hello-edit-dialog
      v-if="showHelloEditDialog"
      :visible.sync="showHelloEditDialog"
      :form="rowInfo"
    />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import { EdspHelloModuleService } from 'plugin/services';
import HelloEditDialog from 'plugin/components/helloModule/helloEditDialog.vue';
import { HelloRow } from 'plugin/types/hello';

@Component({
  name: 'EdspHelloModule',
  components: {
    HelloEditDialog
  }
})
export default class EdspHelloModule extends Vue {
  @State('<%= name.replace(/-(\w)/g, function ($0, $1) {return $1.toUpperCase();}) %>Store/loading') private loading;
  @Getter('<%= name.replace(/-(\w)/g, function ($0, $1) {return $1.toUpperCase();}) %>Store/getList') getList;
  @Getter('<%= name.replace(/-(\w)/g, function ($0, $1) {return $1.toUpperCase();}) %>Store/getUserNum') getUserNum;
  @Action('<%= name.replace(/-(\w)/g, function ($0, $1) {return $1.toUpperCase();}) %>Store/getUsers') getUsers!: any;
  rowInfo: HelloRow = {
    date: '',
    name: '',
    address: ''
  };
  showHelloEditDialog: boolean = false;

  mounted() {
    // 查询列表数据
    this.getUsers();
    // console.log(this.listData, 'ttttt');
  }

  // getUsers() {
  //   this.loading = true;
  //   EdspHelloModuleService.getList()
  //     .then((res) => {
  //       if (res && res.code === 200) {
  //         this.listData = res.data;
  //       }
  //     })
  //     .finally(() => {
  //       this.loading = false;
  //     });
  // }

  // 打开测试弹窗
  showEditHello(row: any) {
		this.rowInfo = row;
		this.showHelloEditDialog = true;
  }
}
</script>
