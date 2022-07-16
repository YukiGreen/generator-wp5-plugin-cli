/* 权限位映射表 */
export const permissionKeys = {
  // 平台管理仪表盘
  platManageDashboard_getDashboardDomains: 'getDashboardDomains',
  platManageDashboard_getDashboardServiceResources:
    'getDashboardServiceResources',
  platManageDashboard_getDashboardInsInfo: 'getDashboardInsInfo',
  // 仪表盘应用
  // 'appDashboard_getSystemsInfo': 'getSystemsInfo',
  // 'appDashboard_getComponentsInfo': 'getComponentsInfo',
  appDashboard_getAppDashboard: 'getAppDashboard',
  // 应用管理
  resourceManage_getSystem: 'getSystem',
  resourceManage_addSystem: 'addSystem',
  resourceManage_editSystem: 'editSystem',
  resourceManage_delSystem: 'delSystem',
  resourceManage_addApp: 'addApp',
  resourceManage_editApp: 'editApp',
  resourceManage_deleteApp: 'deleteApp',
  resourceManage_getApp: 'getApp',
  resourceManage_addCluster: 'addCluster',
  resourceManage_editCluster: 'editCluster',
  resourceManage_delCluster: 'delCluster',
  resourceManage_verifyToken: 'verifyToken',
  resourceManage_getClusterConfig: 'getClusterConfig',
  resourceManage_clusterGovern: 'clusterGovern',
  resourceManage_editCostomConfig: 'editCostomConfig',
  resourceManage_addDegradeRule: 'addDegradeRule',
  resourceManage_editDegradeRule: 'editDegradeRule',
  resourceManage_delDegradeRule: 'delDegradeRule',
  resourceManage_getDegradeRules: 'getDegradeRules',
  resourceManage_getFlowRules: 'getFlowRules',
  resourceManage_addFlowRule: 'addFlowRule',
  resourceManage_editFlowRule: 'editFlowRule',
  resourceManage_delFlowRule: 'delFlowRule',
  resourceManage_bindResource: 'bindResource',
  resourceManage_getInsList: 'getInsList',
  resourceManage_showActuator: 'showActuator',
  resourceManage_delInstance: 'delInstance',
  resourceManage_batchDelInstance: 'batchDelInstance',
  resourceManage_queryApiList: 'queryApiList',
  resourceManage_exportApiList: 'exportApiList',
  resourceManage_getApiInfo: 'getApiInfo',
  resourceManage_getInstancesEvent: 'getInstancesEvent',
  resourceManage_getOverallView: 'getOverallView',
  resourceManage_batchDeleteSystem: 'batchDeleteSystem',
  resourceManage_batchDeleteApp: 'batchDeleteApp',
  resourceManage_batchBindResources: 'batchBindResources',
  resourceManage_batchAddGroup: 'batchAddGroup',
  resourceManage_batchDeleteResource: 'batchDeleteResource',
  resourceManage_batchEditToken: 'batchEditToken',
  resourceManage_batchDeleteGroup: 'batchDeleteGroup',
  // 应用治理
  appGovern_getGovernList: 'getGovernList',
  appGovern_autoRefreshList: 'autoRefreshList',
  appGovern_queryAlarm: 'queryAlarm',
  appGovern_queryApiInfo: 'queryApiInfo',
  appGovern_queryTraceInfo: 'queryTraceInfo',
  appGovern_queryLogInfo: 'queryLogInfo',
  appGovern_queryInstanceInfo: 'queryInstanceInfo',
  appGovern_queryConfigInfo: 'queryConfigInfo',
  appGovern_queryLinkInfo: 'queryLinkInfo',
  appGovern_queryInsDependency: 'queryInsDependency',
  appGovern_nodeClusterGovern: 'nodeClusterGovern',
  // 性能仪表
  // 'perforDashboard_getClusterGlobalBoard': 'getClusterGlobalBoard',
  perforDashboard_availableDetection: 'availableDetection',
  perforDashboard_getClusterBoard: 'getClusterBoard',
  // 'perforDashboard_getApiBoard': 'getApiBoard',
  // 'perforDashboard_getInstanceBoard': 'getInstanceBoard',
  perforDashboard_getDatabaseBoard: 'getDatabaseBoard',
  perforDashboard_boardToTrace: 'boardToTrace',
  perforDashboard_boardToLog: 'boardToLog',
  // 链路分析
  trace_getTraceList: 'getTraceList',
  trace_queryLogInfo: 'traceQueryLogInfo',
  trace_exportTraceList: 'exportTraceList',
  // 日志查询
  log_getLogList: 'getLogList',
  log_downloadLog: 'downloadLog',
  // 指标对比
  comparison_getComparisonList: 'getComparisonList',
  // 性能剖析
  profile_getProfileList: 'getProfileList',
  profile_createTask: 'createTask',
  // 应用列表
  serviceList_getRegistryList: 'getRegistryList',
  serviceList_getRegistryInfo: 'getRegistryInfo',
  serviceList_instanceOffline: 'instanceOffline',
  // 配置模板
  configTemplate_getConfigTemplates: 'getConfigTemplates',
  configTemplate_addConfigTemplate: 'addConfigTemplate',
  configTemplate_viewConfigTemplate: 'viewConfigTemplate',
  configTemplate_editConfigTemplate: 'editConfigTemplate',
  configTemplate_delConfigTemplate: 'delConfigTemplate',
  // 配置列表
  configList_getConfigList: 'getConfigList',
  configList_addConfig: 'addConfig',
  configList_editConfig: 'editConfig',
  configList_deleteConfig: 'deleteConfig',
  // 配置监听
  listenQuery_getConfiguredMonitor: 'getConfiguredMonitor',
  // 'configList_hasEditor': 'hasEditor',
  configList_getConfigInfo: 'getConfigInfo',
  configList_queryHistoryList: 'queryHistoryList',
  configList_rollbackConfig: 'rollbackConfig',
  // 告警规则
  warnRules_getPerforRules: 'getPerforRules',
  warnRules_addPerforRule: 'addPerforRule',
  warnRules_editPerforRule: 'editPerforRule',
  warnRules_checkPerforRule: 'checkPerforRule',
  warnRules_deletePerforRule: 'deletePerforRule',
  warnRules_getPerforWebHooks: 'getPerforWebHooks',
  warnRules_addPerforWebHook: 'addPerforWebHook',
  warnRules_editPerforWebHook: 'editPerforWebHook',
  warnRules_deletePerforWebHook: 'deletePerforWebHook',
  warnRules_getLogRules: 'getLogRules',
  warnRules_addLogRule: 'addLogRule',
  warnRules_editLogRule: 'editLogRule',
  warnRules_deleteLogRule: 'deleteLogRule',
  // 告警编辑
  // 'warnEdit_submitPerforRule': 'submitPerforRule',
  // 'warnEdit_toPerforRules': 'toPerforRules',
  // 告警执行器编辑
  // 'webhookEdit_submitPerforWebHook': 'submitPerforWebHook',
  // 'webhookEdit_toPerforWebHook': 'toPerforWebHook',
  // 告警信息
  warnInfor_getPerforInfor: 'getPerforInfor',
  warnInfor_signPerforInfor: 'signPerforInfor',
  warnInfor_getLogInfor: 'getLogInfor',
  warnInfor_signLogInfor: 'signLogInfor',
  warnInfor_checkLogInfor: 'checkLogInfor',
  // gls统计首页
  countHome_getCountData: 'getCountData',
  // 数据查询
  // 'dataQuery_getCustNamespaces': 'getCustNamespaces',
  // 'dataQuery_getCustType': 'getCustType',
  dataQuery_queryCustNamespace: 'queryCustNamespace',
  // 系统配置
  sysConfig_querySysConfig: 'querySysConfig',
  sysConfig_getSysNamespaces: 'getSysNamespaces',
  sysConfig_submitSysConfig: 'submitSysConfig',
  // 参数映射
  mappingRelation_getMappingRelation: 'getMappingRelation',
  mappingRelation_getUnitShardRelation: 'getUnitShardRelation',
  mappingRelation_editMappingRelation: 'editMappingRelation',
  // 单元管理
  unitManage_getUnits: 'getUnits',
  unitManage_createUnit: 'createUnit',
  unitManage_editUnit: 'editUnit',
  unitManage_deleteUnit: 'deleteUnit',
  // 单元互备
  unitBackup_getUnitBackups: 'getUnitBackups',
  unitBackup_createUnitBackups: 'createUnitBackups',
  unitBackup_editUnitBackups: 'editUnitBackups',
  unitBackup_deleteUnitBackups: 'deleteUnitBackups',
  // 域管理
  domain_getDomains: 'getDomains',
  domain_editDomain: 'editDomain',
  domain_auditSettings: 'doubleAuditSettings',
  domain_deleteDomains: 'deleteDomain',
  domain_enterDomains: 'enterDomain',
  domain_getServiceResourceList: 'getServiceResourceList',
  domain_createServiceResource: 'createServiceResource',
  domain_editServiceResource: 'editServiceResource',
  domain_checkServiceResource: 'checkServiceResource',
  domain_deleteServiceResource: 'deleteServiceResource',
  domain_getInstanceClean: 'getInstanceClean',
  domain_editInstanceClean: 'editInstanceClean',
  domain_cleanInstance: 'cleanInstance',

  // 域盒子
  domainBox_getDomainBoxs: 'getDomainBoxs',
  domainBox_editDomainBox: 'editDomainBox',
  domainBox_checkDomainBox: 'checkDomainBox',
  domainBox_appDomainBox: 'appDomainBox',
  domainBox_exportDomainBox: 'exportDomainBox',
  domainBox_importDomainBox: 'importDomainBox',
  domainBox_addDomainBox: 'addDomainBox',
  domainBox_deleteDomainBox: 'deleteDomainBox',
  // 组件管理
  servicesTemplate_getServicesTemplate: 'getServicesTemplate',
  servicesTemplate_createServicesTemplate: 'createServicesTemplate',
  servicesTemplate_editServicesTemplate: 'editServicesTemplate',
  servicesTemplate_checkServicesTemplate: 'checkServicesTemplate',
  servicesTemplate_getServicesTemplateType: 'getServicesTemplateType',
  servicesTemplate_addServicesTemplateType: 'addServicesTemplateType',
  servicesTemplate_deleteServicesTemplateType: 'deleteServicesTemplateType',
  servicesTemplate_deleteServicesTemplate: 'deleteServicesTemplate',
  // 许可管理
  licenseManage_getLicense: 'getLicense',
  licenseManage_updateLicense: 'updateLicense',
  // 系统定制
  systemCustom_getSystemCustom: 'getSystemCustom',
  systemCustom_updateSystemCustom: 'updateSystemCustom',
  // 操作审计
  operationAudit_getOperationAudit: 'getOperationAudit',
  operationAudit_getAuditClean: 'getAuditClean',
  operationAudit_editAuditClean: 'editAuditClean',
  operationAudit_cleanAudit: 'cleanAudit',

  // 实例管理
  // 'instanceManage_getInstanceManage': 'getInstanceManage',
  instanceManage_getInstancesByCode: 'getInstancesByCode',
  instanceManage_getActuator: 'getActuator',
  // 'instanceManage_getMetric': 'getMetric', // 未使用
  // 'instanceManage_getInstancesInfo': 'getInstancesInfo', // 未使用
  // 'instanceManage_getInstancesHealth': 'getInstancesHealth', // 未使用
  // 'instanceManage_getInstancesPID': 'getInstancesPID', // 未使用
  // 'instanceManage_getInstancesBEANS': 'getInstancesBEANS', // 未使用
  // 'instanceManage_getInstancesConfigProp': 'getInstancesConfigProp', // 未使用
  instanceManage_getInstancesEnv: 'getInstancesEnv', // 未使用
  instanceManage_getAvailableMetrics: 'getAvailableMetrics', // 未使用
  instanceManage_getJVMHeapDump: 'getJVMHeapDump', // 未使用
  instanceManage_getInstancesLoggers: 'getInstancesLoggers', // 未使用
  instanceManage_getInstancesThreadDump: 'getInstancesThreadDump', // 未使用
  instanceManage_setInstancesLoggers: 'setInstancesLoggers', // 未使用
  instanceManage_getInstancesMappings: 'getInstancesMappings', // 未使用
  instanceManage_getClusterList: 'getClusterList',
  instanceManage_deleteInstances: 'deleteInstances',
  instanceManage_batchDeleteInstances: 'batchDeleteInstances',
  instanceManage_getGatewayInstancesEvent: 'getGatewayInstancesEvent',
  instanceManage_deleteErrorInstances: 'deleteErrorInstances',
  // 租户管理
  tenantManage_getTenantManageList: 'getTenantManageList',
  tenantManage_addTenant: 'addTenant',
  tenantManage_updateTenant: 'updateTenant',
  tenantManage_getTenantToken: 'getTenantToken',
  tenantManage_getTenantFlushToken: 'getTenantFlushToken',
  tenantManage_batchDeleteTenant: 'batchDeleteTenant',
  tenantManage_deleteTenant: 'deleteTenant',
  // 黑白名单
  blackWhiteList_getBlackWhiteList: 'getBlackWhiteList',
  // 'blackWhiteList_queryModuleList': 'queryModuleList',
  blackWhiteList_saveBlackWhite: 'saveBlackWhite',
  blackWhiteList_updateBlackWhite: 'updateBlackWhite',
  blackWhiteList_deleteBlackWhite: 'deleteBlackWhite',
  blackWhiteList_batchDeleteBlackWhite: 'batchDeleteBlackWhite',
  // 访问控制
  accessControl_getAccessControlList: 'getAccessControlList',
  accessControl_saveAccess: 'saveAccess',
  accessControl_updateAccess: 'updateAccess',
  // 'accessControl_garyApiGroup': 'garyApiGroup',
  // 'accessControl_garyApi': 'garyApi',
  // 'accessControl_queryApiStatus': 'queryApiStatus',
  accessControl_deleteAccess: 'deleteAccess',
  accessControl_batchDeleteAccess: 'batchDeleteAccess',
  // 密钥管理
  keyManage_getKeyManageList: 'getKeyManageList',
  keyManage_addKey: 'addKey',
  keyManage_updateKey: 'updateKey',
  keyManage_deleteKey: 'deleteKey',
  keyManage_batchDeleteKey: 'batchDeleteKey',
  // 'keyManage_getKeyList': 'getKeyList',
  // 渠道权限
  channelPermit_getChannelPermitList: 'getChannelPermitList',
  // 'channelPermit_allPermission': 'allPermission',
  channelPermit_createAccess: 'createAccess',
  channelPermit_setAccess: 'setAccess',
  channelPermit_deletePermission: 'deletePermission',
  // 渠道管理
  channelManage_getChannelManageList: 'getChannelManageList',
  // 'channelManage_allPermission': 'allPermission',
  // 'channelManage_queryKeyComParam': 'queryKeyComParam',
  channelManage_saveChannelManage: 'saveChannelManage',
  channelManage_updateChannelManage: 'updateChannelManage',
  channelManage_deletePermission: 'deletePermission',
  channelManage_batchDeletePermission: 'batchDeletePermission',
  // 集群配置
  clusterConfig_getClusterConfigList: 'getClusterConfigList',
  clusterConfig_saveQuerySysConf: 'saveQuerySysConf',
  // 'clusterConfig_getServiceResources': 'getServiceResources',
  // 'clusterConfig_bindResourceCluster': 'bindResourceCluster',
  // 'clusterConfig_queryAppName': 'queryAppName',
  // 'clusterConfig_queryFunList': 'queryFunList',
  // 'clusterConfig_getBindResourceCluster': 'getBindResourceCluster',
  // 错误码
  errorCode_getErrorCode: 'getErrorCode',
  errorCode_deleteErrorCode: 'deleteErrorCode',
  errorCode_saveErrorCode: 'saveErrorCode',
  errorCode_updateErrorCode: 'updateErrorCode',
  // api市场
  apiMarket_getApiList: 'getApiList',
  apiMarket_searchApiList: 'searchApiList',
  apiMarket_addApiList: 'addApiList',
  apiMarket_batchDeleteApi: 'batchDeleteApi',
  apiMarket_batchAddApi: 'batchAddApi',
  apiMarket_batchExportApi: 'batchExportApi',
  apiMarket_allExportApi: 'allExportApi',
  apiMarket_batchPublishApi: 'batchPublishApi',
  apiMarket_batchDownLineApi: 'batchDownLineApi',
  apiMarket_viewApi: 'viewApi',
  apiMarket_editApi: 'editApi',
  apiMarket_testApi: 'testApi',
  apiMarket_publishApi: 'publishApi',
  apiMarket_downLineApi: 'downLineApi',
  apiMarket_deleteApi: 'deleteApi',
  // apiMarket_excelImportApi:'excelImportApi',
  // apiMarket_swaggerImportApi:'swaggerImportApi',
  // API测试
  // 'apiTest_testApiRequestHeader': 'testApiRequestHeader',
  // 'apiTest_testSuccessApi': 'testSuccessApi',
  // 限流规则
  limitRules_getLimitRulesList: 'getLimitRulesList',
  limitRules_addLimitRules: 'addLimitRules',
  limitRules_batchDeleteLimitRules: 'batchDeleteLimitRules',
  limitRules_editLimitRules: 'editLimitRules',
  limitRules_deleteLimitRules: 'deleteLimitRules',
  // 参数映射
  parameterMap_getLimitRulesList: 'getParameterMapList',
  parameterMap_addParameterMap: 'addParameterMap',
  parameterMap_batchDeleteParameterMap: 'batchDeleteParameterMap',
  parameterMap_viewParameterMap: 'viewParameterMap',
  parameterMap_editParameterMap: 'editParameterMap',
  parameterMap_deleteParameterMap: 'deleteParameterMap',
  // 参数过滤
  paramFilter_getParamFilterList: 'getParamFilterList',
  paramFilter_addParamFilter: 'addParamFilter',
  paramFilter_batchDeleteParamFilter: 'batchDeleteParamFilter',
  paramFilter_editParamFilter: 'editParamFilter',
  paramFilter_deleteParamFilter: 'deleteParamFilter',
  // 熔断降级
  fuseDegrade_getFuseDegradeList: 'getFuseDegradeList',
  fuseDegrade_addFuseDegrade: 'addFuseDegrade',
  fuseDegrade_batchDeleteFuseDegrade: 'batchDeleteFuseDegrade',
  fuseDegrade_editFuseDegrade: 'editFuseDegrade',
  fuseDegrade_deleteFuseDegrade: 'deleteFuseDegrade',
  // 灰度路由
  garyRouter_getGaryRouterList: 'getGaryRouterList',
  garyRouter_addGaryRouter: 'addGaryRouter',
  garyRouter_batchDeleteGaryRouter: 'batchDeleteGaryRouter',
  garyRouter_editGaryRouter: 'editGaryRouter',
  garyRoutere_deleteGaryRouter: 'deleteGaryRouter',
  // 超时控制
  timeoutControl_getTimeoutControlList: 'getTimeoutControlList',
  timeoutControl_addTimeoutControl: 'addTimeoutControl',
  timeoutControl_batchDeleteTimeoutControl: 'batchDeleteTimeoutControl',
  timeoutControl_editTimeoutControl: 'editTimeoutControl',
  timeoutControl_deleteTimeoutControl: 'deleteTimeoutControl',
  // 并发控制
  concurrencyControl_getConcurrencyControlList: 'getConcurrencyControlList',
  concurrencyControl_addConcurrencyControl: 'addConcurrencyControl',
  concurrencyControl_batchDeleteConcurrencyControl:
    'batchDeleteConcurrencyControl',
  concurrencyControl_editConcurrencyControl: 'editConcurrencyControl',
  concurrencyControl_deleteConcurrencyControl: 'deleteConcurrencyControl',
  // 访问时段控制
  accessPeriodControl_getAccessPeriodControlList: 'getAccessPeriodControlList',
  accessPeriodControl_addAccessPeriodControl: 'addAccessPeriodControl',
  accessPeriodControl_batchDeleteAccessPeriodControl:
    'batchDeleteAccessPeriodControl',
  accessPeriodControl_editAccessPeriodControl: 'editAccessPeriodControl',
  accessPeriodControl_deleteAccessPeriodControl: 'deleteAccessPeriodControl',
  // 权限管理
  permissionManage_getPermissionGroupList: 'getPermissionGroupList',
  permissionManage_checkPermissionGroup: 'checkPermissionGroup',
  // 'permissionManage_addPermissionGroup': 'addPermissionGroup',
  // 'permissionManage_editPermissionGroup': 'editPermissionGroup',
  // 'permissionManage_deletePermissionGroup': 'deletePermissionGroup',
  // 角色管理
  roleManage_getRoleList: 'getRoleList',
  roleManage_addRole: 'addRole',
  roleManage_editRole: 'editRole',
  roleManage_deleteRole: 'deleteRole',
  // 用户管理
  userManage_getUsertList: 'getUsertList',
  userManage_addUser: 'addUser',
  userManage_editUser: 'editUser',
  userManage_deleteUser: 'deleteUser',
  userManage_changeUserPassword: 'changeUserPassword',
  userManage_getApiKey: 'getApiKey',
  userManage_reloadApiKey: 'reloadApiKey',
  userManage_deleteApiKey: 'deleteApiKey',
  userManage_checkApiKey: 'checkApiKey',
  // 集群管理
  clusterManage_getClusterManagementList: 'getClusterManagementList',
  clusterManage_addCluster: 'addCluster',
  clusterManage_delCluster: 'delCluster',
  // 单元治理
  // 蓝绿发布
  blueGreenRelease_getBlueGreenReleaseList: 'getBlueGreenReleaseList',
  blueGreenRelease_addBlueGreenReleaseUnit: 'addBlueGreenReleasUnit',
  blueGreenRelease_editBlueGreenReleaseUnit: 'editBlueGreenReleasUnit',
  blueGreenRelease_deleteBlueGreenReleaseUnit: 'deleteBlueGreenReleasUnit',
  // 并发控制
  unitConcurrencyControl_getUnitConcurrencyControlList:
    'getUnitConcurrencyControlList',
  unitConcurrencyControl_addUnitConcurrencyControl: 'addUnitConcurrencyControl',
  unitConcurrencyControl_batchDeleteUnitConcurrencyControl:
    'batchDeleteUnitConcurrencyControl',
  unitConcurrencyControl_editUnitConcurrencyControl:
    'editUnitConcurrencyControl',
  unitConcurrencyControl_deleteUnitConcurrencyControl:
    'deleteUnitConcurrencyControl',
  // 熔断降级
  unitFuseDegradation_getUnitFuseDegradeList: 'getUnitFuseDegradeList',
  unitFuseDegradation_addUnitFuseDegrade: 'addUnitFuseDegrade',
  unitFuseDegradation_batchDeleteUnitFuseDegrade: 'batchDeleteUnitFuseDegrade',
  unitFuseDegradation_editUnitFuseDegrade: 'editUnitFuseDegrade',
  unitFuseDegradation_deleteUnitFuseDegrade: 'deleteUnitFuseDegrade',
  // 限流规则
  unitLimitRules_getUnitLimitRulesList: 'getUnitLimitRulesList',
  unitLimitRules_addUnitLimitRules: 'addUnitLimitRules',
  unitLimitRuless_batchDeleteUnitLimitRules: 'batchDeleteUnitLimitRules',
  unitLimitRules_editUnitLimitRules: 'editUnitLimitRules',
  unitLimitRules_deleteUnitLimitRules: 'deleteUnitLimitRules',
  // 日志脱敏
  desensitizationRules_getDesRules: 'getDesRules',
  desensitizationRules_addDesRules: 'addDesRules',
  desensitizationRules_updateDesRules: 'updateDesRules',
  desensitizationRules_testDesRules: 'testDesRules',
  desensitizationRules_delDesRules: 'delDesRules',
  // 失败统计
  failStatistics_getFailStatistics: 'getFailStatistics',
  // 性能指标
  performanceIndex_getPerfIndex: 'getPerfIndex',
};
