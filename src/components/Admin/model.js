/**
 * 管理员列表编辑api
 */
import { get, post } from '../../common/axios-init'
// 获取菜单
export const getAdmin = () => get('/back-user/list')