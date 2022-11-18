import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react"
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from 'redux';
import reducers from "./reducers";

//Redux yapısının temelleri burada atılmıştır.
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthLoading, setAuthLoading] = useState(true)
    //Sistem acıldığınb async storage ile get item kullanarak @user kullanıcını getir ver burada 
    //setuser içine parse et set authloading yapısını sağlıyorsunuz
    useEffect(() => {
        AsyncStorage.getItem('@USER').then(userSession => {
            userSession && setUser(JSON.parse(userSession));
            setAuthLoading(false)
        })
    }, [])

    const store = createStore(reducers, { user, isAuthLoading })
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default AuthProvider;