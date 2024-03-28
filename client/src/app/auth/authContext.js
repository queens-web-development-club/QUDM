"use client"

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(() => {

    //If there is a key in the session storage called isLoggedIn and it has the value of true then set isLoggedIn to true, else false.
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"

    //return an object with the status regarding if the user is logged in or not. (variable called isAuthenticated)
    return {
      isAuthenticated: isLoggedIn
    }
  });
  //Note: removed email and password from object. it was redundant
    
  //Login function that sets the value of this object as well as included isLoggedIn in the session storage
  const login = () => {
    setAuthData({isAuthenticated: true})
    sessionStorage.setItem("isLoggedIn", "true")
    //that looks like this "isLoggedIn": "true"
  }

  //Logout function that sets the value of everything in the object to null or false and then removed the item from the session storage.
  const logout = () => {
    setAuthData({email: null, password: null, isAuthenticated: false})
    sessionStorage.removeItem("isLoggedIn")
  }

  //Allows for the functions authData, login, and logout to be used in contents wrapped in the AuthProvider (see layout.js)
  return(
    <AuthContext.Provider value = {{authData, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

//When this function is called, it allows you to use the other functions defined in the context
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