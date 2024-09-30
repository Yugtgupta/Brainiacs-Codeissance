"use client"

import Header from "@/components/Header"
import ourReducer from "@/reducers/ourReducer"
import { useContext, useEffect, useState } from "react"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import StateContext from "@/context/StateContext"
import DispatchContext from "@/context/DispatchContext"
import LandingPage from "@/components/LandingPage"
import VidyaSaathiLandingPage from "@/components/VidyaSaarthiLandingPage"
Axios.defaults.baseURL = "http://localhost:4000"

export default function Home() {
  const initialState = {
    loggedIn: typeof window !== "undefined" && Boolean(localStorage.getItem("talentSyncToken")),
    flashMessages: [],
    user: {
      token: typeof window !== "undefined" ? localStorage.getItem("talentSyncToken") : null,
      username: typeof window !== "undefined" ? localStorage.getItem("talentSyncEmail") : null
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("talentSyncToken", state.user.token)
      localStorage.setItem("talentSyncRole", state.user.role)
      localStorage.setItem("talentSyncId", state.user.id)
      console.log("logged in")
    } else {
      localStorage.removeItem("talentSyncToken")
      localStorage.removeItem("talentSyncEmail")
      localStorage.removeItem("talentSyncId")
      console.log("logged out")
    }
  }, [state.loggedIn])

  const loginHandler = async e => {
    e.preventDefault()
    try {
      const response = await Axios.post("/login-student", { email, password })
      console.log(response)
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "login", data: response.data })
      } else if (response.status == "400") {
        console.log("Incorrect email / Password")
      }
    } catch (e) {
      console.log("There was a problem" + e)
    }
  }

  const registerHandler = async e => {
    e.preventDefault()
    try {
      // pass the Access-Control-Allow-Origin in the request
      const response = await Axios.post("/register-student", {
        email,
        password
      })
      console.log(response)
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "register", data: response.data })
      } else if (response.status == "400") {
        console.log("Incorrect email / Password")
      }
    } catch (e) {
      console.log("There was a problem" + e)
    }
  }

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Header />
          <LandingPage />
          <VidyaSaathiLandingPage />
          <>
            {state.loggedIn ? (
              <h1>Logged in</h1>
            ) : (
              <>
                Not Logged in
                <form onSubmit={loginHandler}>
                  <input type="email" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} />
                  <input type="password" placeholder="Password..." value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="submit">Login</button>
                </form>
                <h2>Register</h2>
                <form onSubmit={registerHandler}>
                  <input type="email" placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} />
                  <input type="password" placeholder="Password..." value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="submit">Register</button>
                </form>
              </>
            )}
          </>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}
