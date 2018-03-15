import { post } from "./base";

export default {
  login({ Tel, ExCode }) {//http://101.200.196.202:8888/Admin/
    return post("/Admin/AdminLogin", { Tel, ExCode });
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
  //获取地区营业信息
  getStoreBusInfoByDate(params) {
    return post("/Admin/GetStoreBusInfoByDate", params);
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
  //获取店铺信息
  getStoreInfo({ Need, StoreId,AdminId }) {
    console.log({ Need, StoreId,AdminId })
    return post("/Store/GetStoreInfoByNeed", { Need, StoreId,AdminId});
  },
  //绑定银行卡
  bindBank({ StoreId, BankName, CardNo }) {
    return post("/Store/BindBank", { StoreId, BankName, CardNo });
  },
  //获取银行卡信息
  getBankCardInfo() {
    return post("/Store/GetBankInfo");
  },
  //获取店铺列表 GetStoreUserListByDateTest
  getStoreList(loading){
    return post("/Admin/GetStoreUserListByDateTest", {},{loading});
  }
};
