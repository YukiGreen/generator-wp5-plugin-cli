import { OperationType } from "custom";
import { ElForm } from "element-ui/types/form";
import { t } from '../locale';

class VueVMHelper {
  public resetForm(elForm: ElForm) {
    elForm && elForm.resetFields && elForm.resetFields();
    return true;
  }

  public operationTip(
    {
      self,
      target,
      operationType = "add"
    }: { self: any; target?: any; operationType: OperationType },
    callback
  ) {
    let operationKeyword = t('logPublic.add');
    switch (operationType) {
      case "add":
        operationKeyword = t('logPublic.add');
        break;
      case "modify":
        operationKeyword = t('logPublic.edit');
        break;
      case "del":
        operationKeyword = t('logPublic.delete');
        break;
      case "createAndEdit":
          operationKeyword = t('logPublic.createAndEdit');
          break;
    }

    target = target ? "[" + target + "]" : "";
    self
      .$confirm(
        `${t("logPublic.needImplement")} ${target} ${operationKeyword} ${t(
          "logPublic.operation"
        )}?`,
        `${t("logPublic.tip")}`,
        {
          confirmButtonText: t("logPublic.confirm"),
          cancelButtonText: t("logPublic.cancel"),
          cancelButtonClass: "messageBox-cancel",
          confirmButtonClass: "messageBox-confirm",
          type: "warning"
        }
      )
      .then(() => {
        callback &&
          callback(false, err => {
            if (err) {
              self.$message({
                type: "error",
                message: `${t("logPublic.optionFailure")} ${err}`
              });
            } else {
              self.$message({
                type: "success",
                message: t("logPublic.optionSuccess")
              });
            }
          });
      })
      .catch(() => {
        // self.$message({
        //   type: 'info',
        //   message: `${i18ns.t('canceled')} ${operationKeyword}`,
        // });
        callback(true);
      });
  }
}

export default new VueVMHelper();
