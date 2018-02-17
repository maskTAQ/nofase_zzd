const NAVIGATE_GO = "NAVIGATE_GO";
const NAVIGATE_BACK = "NAVIGATE_BACK";
const NAVIGATE_TAb_GO = "NAVIGATE_TAb_GO";
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
  NAVIGATE_TAb_GO
};
export default action;
