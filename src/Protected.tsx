import React from 'react'
import { Navigate } from 'react-router-dom'
export const Protected = ({ isSignedIn, children }:{isSignedIn:any, children:any }) => {
    if (!isSignedIn) {
        return <Navigate to="/login" replace />
      }
      return children
}

