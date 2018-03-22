const NAVIGATE_GO = "NAVIGATE_GO";
const NAVIGATE_BACK = "NAVIGATE_BACK";
const NAVIGATE_TAb_GO = "NAVIGATE_TAb_GO";

const LOGIN = 'LOGIN';
const EDIT_STORE_INFO = 'EDIT_STORE_INFO';
const RESET_STORE_INFO = 'RESET_STORE_INFO';
const action = {
  navigate: {
    go({ routeName, params = {} }) {
      return {
        type: NAVIGATE_GO,
        payload: {
          routeName,
          params
        }
      };
    },
    tabGo({ routeName, params = {} }) {
      return {
        type: NAVIGATE_TAb_GO,
        payload: {
          routeName,
          params
        }
      };
    },
    back({ params = {} } = {}) {
      return {
        type: NAVIGATE_BACK,
        payload: {
          params
        }
      };
    }
  },
  NAVIGATE_GO,
  NAVIGATE_BACK,
  NAVIGATE_TAb_GO,
  editStoreInfo(payload) {
    return {
      type: EDIT_STORE_INFO,
      payload
    };
  },
  resetStoreInfo() {
    return {
      type: RESET_STORE_INFO
    };
  },
  RESET_STORE_INFO,
  EDIT_STORE_INFO,
  login(payload){
    return {
      type: LOGIN,
      payload
    };
  },
  LOGIN
};
export default action;
