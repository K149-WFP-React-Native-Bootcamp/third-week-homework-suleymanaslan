import React, { useState } from "react"
import axios from "axios"
const usePost = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    //User verrilerinin kontrolleri için oluşturduğumuz hook yapısı
    const post = async (url, apiData) => {
        try {
            setLoading(true);
            const { data: responseData } = await axios.post(url, apiData)
            setData(responseData)
            setLoading(false);
        } catch (err) {
            setError(err)
            setLoading(false);
        }
    }
    //oluşabilecek tüm verileri burada gönderiyoruz ki ana yapımızda kullanabilelim 
    return { data, loading, error, post }
}

export default usePost;
