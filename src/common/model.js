/**
 * api接口
 */
import { get, post } from './axios-init.js'
// 获取菜单
export const getMenu = () => get('/back-menu/menu')