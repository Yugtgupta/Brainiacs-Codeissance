"use client";

function ourReducer(draft, action) {
  switch (action.type) {
    case "login":
      draft.loggedIn = true;
      draft.user = action.data.data;
      return; // Use either return or break
    case "logout":
      draft.loggedIn = false;
      return;
    case "flashMessage":
      draft.flashMessages.push(action.value);
      return;
    // Add default case for safety
    default:
      return;
  }
}

export default ourReducer;
