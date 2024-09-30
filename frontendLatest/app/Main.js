import React, { useState, useReducer, useEffect } from "react";
import { useImmerReducer } from "use-immer"; //We will using this as the replacement to reacts use reducer function
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:4000";

import DispatchContext from "./DispatchContext.js";
import StateContext from "./StateContext.js";
import { Toaster } from "react-hot-toast";
//Our components
import LockScreen from "./components/LockScreen.js";
import RegistrationForm from "./components/RegisterPage.js";
import LandingPage from "./components/forum/LandingPage.js";
import AddForum from "./components/forum/AddForum.js";
import SingleForum from "./components/forum/SingleForum.js";

function Main() {
  //<> </> this is called as a react fragment.
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("talentSyncToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("talentSyncToken"),
      username: localStorage.getItem("talentSyncEmail"),
    },
    //Now we wil have this user object that will be available in our globval or app wide state.
    //Any other component that needs to acces this data, it no longer needs to access it from the broswer, but will be avaialble from within the state.
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data.data;
        return; //Use either return or break
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      //if true
      //localStorage, has nothing to do with react, but with web browser
      localStorage.setItem("talentSyncToken", state.user.token);
      localStorage.setItem("talentSyncRole", state.user.role);
      localStorage.setItem("talentSyncId", state.user.id);

      //2 arguments. a= name for the piece of data we want to store. (We can name it anything). b == the data we want to store
    } else {
      localStorage.removeItem("talentSyncToken");
      localStorage.removeItem("talentSyncEmail");
      localStorage.removeItem("talentSyncId");
    }
  }, [state.loggedIn]);
  //Anytime state.loggedIn changes, the function here will run

  return (
    // Whatever we include in this {}, anyy child component no matter how deep the component is nested, will be able to access this value
    //In this case we are passing object
    // <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>

    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {/* <Toaster /> */}
          {/* <Header /> */}
          {/* <FlashMessages messages={state.flashMessages} /> */}

          <Toaster />

          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <div>Loged in</div> : <LockScreen />}
            />
            <Route
              path="/register"
              element={
                state.loggedIn ? <div>Logged In</div> : <RegistrationForm />
              }
            />
            <Route path="/community-forum" element={<LandingPage />} />
            <Route path="/community-forum/add" element={<AddForum />} />
            <Route path="/community-forum/:id" element={<SingleForum />} />
            {/* <Route path="/internships" element={state.loggedIn ? <InternshipCard /> : <HomeGuest />} />
            <Route path="/applied-internships" element={state.loggedIn ? <AppliedInternships /> : <HomeGuest />} /> */}

            {/* PAssing addFlashMessage() funcytion to createPost using pprops */}
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// function Main() {
//   return (
//     <div>
//       <h1>hi</h1>
//       <h1>hi</h1>
//       <h1>hi</h1>
//     </div>
//   )
// }

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
