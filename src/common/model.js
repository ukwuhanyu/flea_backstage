/**
 * api接口
 */
import { get, post } from './axios-init.js'
// 获取菜单
export const getMenu = () => get('/back-menu/')
// 用户退出登录
export const loginOut = () => get('/back-user/logout')