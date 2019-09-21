/**
 * 菜单列表编辑api
 */
import { get, post } from '../../common/axios-init'
// 获取菜单
export const getMenu = () => get('/back-menu')
