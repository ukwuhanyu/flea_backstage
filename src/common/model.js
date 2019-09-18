/**
 * api接口
 */
import { get, post } from './axios-init.js'
// p是参数
export const getApi = p => get('/top/playlist', p)