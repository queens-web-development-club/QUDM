"use client"

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"
    //this code check if the value for "isLoggedIn" === "true"
    //i have to use quotes around true because sessionStorage only stores strings
    return {
      email: null,
      password: null,
      isAuthenticated: isLoggedIn
    }
  });
    


  const login = (email, password) => {
    setAuthData({email, password, isAuthenticated: true})
    sessionStorage.setItem("isLoggedIn", "true")
    //when the login function is used creates an item in the local storage
    //that looks like this "isLoggedIn": "true"
  }

  const logout = () => {
    setAuthData({email: null, password: null, isAuthenticated: false})
    sessionStorage.removeItem("isLoggedIn")
  }

  return(
    <AuthContext.Provider value = {{authData, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

/* How does this boy work :)
  1. AuthProvider Component is created which carries the state of an object called authData containing 3 properties: email, pwrod, 
  and isAuth.. isAuth carries the state of another variable called isLoggedIn which is true if there is a key value pair that looks like "isLoggedIn": "true"
  This component also carries 2 functions: login and logout which can be called in other function. These function alter the state data

  2. The AuthContext.Provider is a custom react component that is created when you use the useContext hook through createContext. 
  The values passes through this component are then able to be used globally in any components its wrapped around as well as the children
  components, which in this case is the AuthProvider function which is exported. Instead of using AuthConext.Container you can use the useContext hook to create the useAuth hook

  3. Then a useAuth hook is created and also exported which allows all other functions to use the the AuthContext function and its values 
  by created a useAuth object such as const auth = useAuth()
*/