"use client"

import React, { useEffect, useState } from 'react';
//next redirect library from client components
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/authContext';

const Admin = () => {
  const router = useRouter()
  const { authData } = useAuth();
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (!authData.isAuthenticated) {
      alert("NOT LOGGED IN");
      router.push('/login')
    } else {
      console.log("LOGGED IN")
      setLoad(true)
    }
  }, [authData.isAuthenticated, router]);

  //currently there is a bug where the useEffect runs twice. cant figure it out.

  return (
    load ? (
      <div>
        <p>admin panel</p>
      </div>
    ) : null
  )
  
};

export default Admin;
