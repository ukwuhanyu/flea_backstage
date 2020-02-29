/**
 * 分类管理编辑api
 */
import { get, post, put } from '../../common/axios-init'
// 返回一级分类详细信息
export const getMoreCategory = (p) => get('/wx-category/'+p)
// 返回分类列表
export const getCategory = (p) => get('/wx-category/limit', p)
