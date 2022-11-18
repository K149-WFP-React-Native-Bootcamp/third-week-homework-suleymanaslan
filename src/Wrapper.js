import React from 'react'
import Router from './Router'
import AuthProvider from './context/AuthProvider'
//redux yapısındaki authprovide yapısı ile sarmallaması için kullanıyoruz.
export default () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}