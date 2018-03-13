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
    return post("/Admin/GetStoreBusInfoByDate",params);
  },
  //新建店铺
  addStore(params){
    return post("/Store/SaveStore",params);
  },
  //编辑店铺
  editStore(params){
    return post("/Store/EditStore",params);
  },
  //绑定银行卡
  bindBank({StoreId,BankName,CardNo}){
    return post("/Store/BindBank",{StoreId,BankName,CardNo});
  }
};
