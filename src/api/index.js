import { post } from "./base";

export default {
  login({ Tel, ExCode }) {//http://101.200.196.202:8888/Admin/
    return post("/Admin/AdminLogin", { Tel, ExCode });
  },
  rememberLogin({ Tel }) {
    return post("/Admin/AdminLoginTest", { Tel });
  },
  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel) {
    return post("/User/GetExCode", { Tel }, { loading: false });
  },
  getAdminAddressList() {
    return post("/Admin/GetAdminAddressList");
  },
  getAdminAddressInfo() {
    return post("/Admin/GetAdminAddressInfo");
  },
  //新建店铺
  addStore(params) {
    return post("/Store/SaveStore", params);
  },
  //编辑店铺
  editStore(params) {
    return post("/Store/EditStore", params);
  },
  //更新店铺
  updateStore(params) {
    const { StoreId } = params;
    const url = StoreId ? '/Store/EditStore' : 'Store/SaveStore';
    return post(url, params);
  },
  //获取地区营业信息 http://101.200.196.202:8888/Admin/GetStoreBusInfoByDate
  getStoreBusInfoByDate(params) {
    return post("/Admin/GetStoreBusInfoByDate", params, { loading: false });
  },
  //获取商铺营业统计列表http://101.200.196.202:8888/Admin/GetStoreUserListByDate
  getStoreUserListByDate(params) {
    console.log(params)
    return post("/Admin/GetStoreUserListByDate", params, { loading: false });
  },
  //获取管理员列表
  getAdminList(AdminId) {
    return post("/Admin/GetAdminInfoList", { AdminId }, { loading: false });
  },
  //获取管理员详情 
  getAdminInfo(AdminId) {
    return post("/Admin/GetAdminInfo", { AdminId });
  },
  //新建管理员
  addAdmin(params) {
    return post("/Admin/SaveAdmin", params, { handleCatch: false });
  },
  //编辑管理员
  editAdmin(params) {
    return post("/Admin/EditAdmin", params, { handleCatch: false });
  },
  //删除管理员 DeleteAdmin
  deleteAdmin(theAdminId) {
    return post("/Admin/DeleteAdmin", { theAdminId }, { handleCatch: false });
  },
  //获取店铺信息
  getStoreInfo({ Need, StoreId, AdminId }) {
    return post("/Store/GetStoreInfoByNeed", { Need, StoreId, AdminId });
  },
  //绑定银行卡
  bindBank(params) {
    return post("/Store/BindBank", params);
  },
  //获取银行卡信息
  getBankCardInfo({ StoreId }) {
    return post("/Store/GetBankInfo", { StoreId });
  },
  //获取店铺列表 GetStoreUserListByDateTest
  getStoreList(params) {
    return post("/Admin/GetStoreListBySeach", { params }, { loading: false });
  },
  //保存课程表
  saveCurriculum({ CurrJson, StoreId }) {
    return post("/Store/SaveCurriculum", { CurrJson, StoreId });
  },
  //读取课程表
  getCurriculum({ StoreId }) {
    return post("/Store/GetCurriculumList", { StoreId });
  },
  //保存设备信息
  saveStoreEquip(params) {
    return post("/Store/SaveStoreEquip", params);
  },
  //获取设备信息
  getStoreEquip(params) {
    return post("/Store/GetStoreEqui", params);
  },
};
