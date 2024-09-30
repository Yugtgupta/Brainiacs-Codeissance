const initialState = {
  loggedIn:
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("talentSyncToken")),
  flashMessages: [],
  user: {
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("talentSyncToken")
        : null,
    username:
      typeof window !== "undefined"
        ? localStorage.getItem("talentSyncEmail")
        : null,
  },
};

export default initialState;
