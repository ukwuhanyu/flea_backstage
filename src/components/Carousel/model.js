/**
 * 轮播图管理编辑api
 */
import { get, post, put } from '../../common/axios-init'
// 获取轮播图列表
export const getCarousel = (p) => get('/wx-carousel/limit', p)
// 修改轮播图状态
export const changeCarousel = (p) => put('/wx-carousel/'+p.carouselId+'/isDeleted',p)
// 删除轮播图
export const delCarousel = (p) => post('/wx-carousel/delete',p)
// 上传轮播图
export const uploadCarousel = (p) => post('/wx-carousel/',p)