/**
 * 管理员列表编辑api
 */
import { get, post, put} from '../../common/axios-init'
// 获取管理员列表
export const getAdmin = (p) => get('/back-user/limit', p)
// 修改管理员状态 userid isDelete
export const delAdmin = (p) => put('/back-user/'+p.userId+'/isDelete',p)
// 删除管理员
export const deleteAdmin = (p) => post('/back-user/delete',p)
// 新增管理员
export const createAdmin = (p) => post('/back-user/', p)