<template>
  <el-dialog
    :show-close="true"
    :visible.sync="showDialog"
    class="login-select-dialog"
    @close="close"
    :title="selectDomain"
    width="30%"
  >
    <div class="tiny-refresh ripple domain-refresh" @click="getDomains">
      <i class="no-redirect el-icon-refresh" />
    </div>
    <el-row :gutter="24">
      <el-col v-for="(domain, index) in domains" :key="index" :span="spanSize">
        <el-card
          class="cp domains-card"
          :body-style="
            { height: 'auto'}
          "
          @click.native="enterTemplatePlatform($router, domain)"
        >
          <p>
            <i class="el-icon-monitor" />
          </p>
          <el-link :underline="false">
            <span
              v-if="domain.name.length > 30"
              :title="domain.name"
            >{{ '...' + domain.name.substr(domain.name.length - 30) }}</span>
            <span v-else>{{ domain.name }}</span>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserCenter } from '../../../examples/services';
import { Action, Getter, Mutation } from 'vuex-class';
import { urlRootPath } from '../../../examples/utils/urlHelpers';

@Component({})
export default class SelectDomainDialog extends Vue {
  @Prop({ type: Boolean, default: false }) visible;
  @Mutation('SET_DOMAINURLNAME') SET_DOMAINURLNAME: Function;

  roleName: any[] = JSON.parse(localStorage.getItem('role_name') || '');
  private selectDomain: any = '';
  private domains: any = [];

  showDialog: boolean = false;

  get spanSize() {
    const domainCount = this.domains.filter((ele) => ele.enterable).length;
    if (domainCount <= 1) {
      return 24;
    } else {
      return domainCount > 1 && domainCount % 2 === 0 ? 12 : 8;
    }
  }

  close() {
    this.$emit('closeDialog', false);
  }

  enterTemplatePlatform(router, domain) {
    this.SET_DOMAINURLNAME(domain.name);
    localStorage.setItem('domainName', domain.name);
    localStorage.setItem('isPlatformManagement', 'false');
    this.$message.success('登陆成功');
    location.href = `${urlRootPath()}/#/`;
    location.reload();
  }

  // 刷新域信息
  getDomains() {
    UserCenter.getDomain().then((res) => {
      if (res && res.code === 200) {
        this.domains = res.data;
      }
    });
  }

  mounted(): void {
    this.showDialog = this.visible;
    this.selectDomain = '选择需要进入的域';
    this.getDomains();
  }
}
</script>

<style lang="less">
.custom-dark .login-select-dialog .el-dialog,
div.custom-dark .login-select-dialog .el-dialog {
  top: 100px !important;
}

.el-card.cp.is-always-shadow .el-card__body {
  p {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
  }
}

.el-card.el-tooltip.cp .el-card__body:hover {
  background: #3b3f52 !important;
}

.el-card.el-tooltip.cp .el-card__body {
  color: gray !important;
}

.el-card.el-tooltip.cp .el-card__body a.el-link span.el-link--inner {
  color: gray;
}

.el-dialog__body {
  .domain-refresh {
    text-align: right;
    top: 9px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .domain-refresh:hover {
    color: #409eff;
  }

  .domains-card {
    cursor: pointer;
    background-color: #f0f2f5;

    i.el-icon-monitor {
      font-size: 66px;
    }
  }
  .domains-card:hover {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #dde5f3;
  }
}

.el-col .el-tooltip.cp .el-card__body {
  cursor: not-allowed;
}
</style>
