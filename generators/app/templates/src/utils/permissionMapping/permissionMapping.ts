import { permissionKeys } from './permissionKeys';
/*
 * 获取映射的权限位值
 */
const getPermissionMapKey = perKey => {
  let perMapKey: any = '';
  for (const key in permissionKeys) {
    if (key === perKey) {
      perMapKey = permissionKeys[key];
    }
  }
  return perMapKey;
};
/*
 * 权限位判断
 */
export function hasPermission(permisKey: string) {
  // @ts-ignore
  // 获取当前用户权限位列表
  const permissionList = JSON.parse(localStorage.getItem('permissions')).map(
    item => item.name
  );
  // 获取当前权限位映射
  const permisMapKey = getPermissionMapKey(permisKey);
  if (permissionList && permissionList.includes('super')) {
    // 如果是超级管理员直接通过
    return true;
  }
  if (permissionList && permissionList.includes(permisMapKey)) {
    // 映射后的权限位是否存在用户权限位列表中
    return true;
  }
  return false;
}