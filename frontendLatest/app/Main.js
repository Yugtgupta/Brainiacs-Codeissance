import React, { useState, useReducer, useEffect } from "react";
import { useImmerReducer } from "use-immer"; //We will using this as the replacement to reacts use reducer function
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:4000";

import DispatchContext from "./DispatchContext.js";
import StateContext from "./StateContext.js";
import { Toaster } from "react-hot-toast";
//Our components
import LockScreen from "./components/LockScreen.js";
import RegistrationPage from "./components/RegistrationPage.js";
import LoginPage from "./components/LoginPage.js";
import Hero from "./components/Hero.js";
import Dashboard from "./components/Dashboard.js";
import ScholarshipPortal from "./components/ScholarshipPortal.js";
import LandingPage from "./components/forum/LandingPage.js";
import AddForum from "./components/forum/AddForum.js";
import SingleForum from "./components/forum/SingleForum.js";
import ScholarshipList from "./components/scholarshipList.js";
import Quiz from "./components/Quiz.js";
import Recorder from "./components/Recorder.js";
import VoiceComp from "./components/ChatUi.js";
import ChatUi from "./components/ChatUi.js";
import RegistrationPageMentor from "./components/RegistrationPageMentor.js";
import RoutesPage from "./components/RoutesPage.js";
import RegistrationPageTutor from "./components/RegistrationPageTutor.js";
import LoginPageTutor from "./components/LoginPageTutor.js";
import LoginPageMentor from "./components/LoginPageMentor.js";
import ScheduleMeetTutor from "./components/ScheduleMeetTutor.js";
import StreamVideoProvider from "./provider/StreamProvider.js";

function Main() {
  //<> </> this is called as a react fragment.
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("talentSyncToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("talentSyncToken"),
      username: localStorage.getItem("talentSyncEmail"),
      role: localStorage.getItem("talentSyncRole"),
      id: localStorage.getItem("talentSyncId"),
    },
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
      localStorage.setItem("talentSyncToken", state.user.token);
      localStorage.setItem("talentSyncRole", state.user.role);
      localStorage.setItem("talentSyncId", state.user.id);
      localStorage.setItem("talentSyncEmail", state.user.email);
      console.log("LOGGED IN");
      console.log("STATE USER", state.user);
    } else {
      localStorage.removeItem("talentSyncToken");
      localStorage.removeItem("talentSyncEmail");
      localStorage.removeItem("talentSyncId");
      console.log("LOGGED OUT");
    }
  }, [state.loggedIn, state.user]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <StreamVideoProvider>
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
                  state.loggedIn ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <RegistrationPage />
                  )
                }
              />

              <Route
                path="/register-mentor"
                element={
                  state.loggedIn ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <RegistrationPageMentor />
                  )
                }
              />

              <Route
                path="/register-tutor"
                element={
                  state.loggedIn ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <RegistrationPageTutor />
                  )
                }
              />

              <Route
                path="/login"
                element={
                  state.loggedIn ? <Navigate to="/dashboard" /> : <LoginPage />
                }
              />

              <Route
                path="/login-mentor"
                element={
                  state.loggedIn ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <LoginPageMentor />
                  )
                }
              />

              <Route
                path="/login-tutor"
                element={
                  state.loggedIn ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <LoginPageTutor />
                  )
                }
              />

              <Route
                path="/dashboard/schedule-meet"
                element={
                  state.loggedIn && state?.user?.role === "tutor" ? (
                    <ScheduleMeetTutor />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />

              <Route
                path="/hero"
                element={state.loggedIn ? console.log("LOGGED IN") : <Hero />}
              />

              <Route
                path="/dashboard"
                element={state.loggedIn ? <Dashboard /> : <LockScreen />}
              />

              <Route
                path="/scholarship"
                element={state.loggedIn ? <Dashboard /> : <ScholarshipPortal />}
              />

              <Route path="/community-forum" element={<LandingPage />} />

              <Route path="/community-forum/add" element={<AddForum />} />

              <Route path="/community-forum/:id" element={<SingleForum />} />
              {/* <Route path="/internships" element={state.loggedIn ? <InternshipCard /> : <HomeGuest />} />
            <Route path="/applied-internships" element={state.loggedIn ? <AppliedInternships /> : <HomeGuest />} /> */}

              {/* PAssing addFlashMessage() funcytion to createPost using pprops */}

              {/* //Kush Section ---> Dont touch */}
              <Route
                path="/quiz"
                element={state.loggedIn ? <div>Loged in</div> : <Quiz />}
              />
              <Route
                path="/testAudio"
                element={state.loggedIn ? <div>Loged in</div> : <ChatUi />}
              />
            </Routes>
            {/* <RoutesPage /> */}
            {/* <Footer /> */}
          </BrowserRouter>
        </StreamVideoProvider>
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
