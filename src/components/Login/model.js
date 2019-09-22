import { get, post } from '../../common/axios-init'
//登录验证接口
export const getu = p => get('/back-user/login',p)