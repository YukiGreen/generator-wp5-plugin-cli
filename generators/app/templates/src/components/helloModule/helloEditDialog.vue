<template>
  <el-dialog
    :visible.sync="visibleSync"
    title="编辑用户信息"
    width="1200px"
    destroy-on-close
    @close="resetForm"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="$t('edspHelloModule.date')">
        <el-input v-model="form.date"></el-input>
      </el-form-item>
      <el-form-item :label="$t('edspHelloModule.name')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('edspHelloModule.address')">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class HelloEditDialog extends Vue {
  @PropSync('visible', { type: Boolean, default: false }) visibleSync;
  @Prop({type: Object, default: {
    date: '',
    name: '',
    address: ''
  }}) form;

  onSubmit() {
    this.visibleSync = false;
  }


	resetForm() {
		this.visibleSync = false;
	}
}
</script>

