import React from "react"
import { Alert, Image, View } from "react-native"
import Input from "../../components/Input"
import Button from "../../components/Button"
import styles from "./Login.styles"
import { Formik } from "formik"
import usePost from "../../hooks/usePost/usePost"
import Config from "react-native-config"
import { useDispatch, useSelector } from "react-redux"
const Login = ({ navigation }) => {
    const user = useSelector(state => state.user)
    const { data, loading, error, post } = usePost();

    const dispatch = useDispatch()
    //Burada Config yapısı ile login sayfasına değerlerin kontrolu için usePost olarak oluşturduğumuz 
    // hook yapısına post atmakdır.
    const handleLogin = (values) => {
        post(Config.API_AUTH_URL + "/login", (values))
    }

    //Error ve verilerin gelen kullanıcıların kontrolu sağlanmaktadır burada
    if (error) {
        Alert.alert("Ali Dayı Alış-Veriş", "Bir hata oluştu")
    }
    if (data) {
        if (data.status === "Error") {
            Alert.alert("Ali Dayı Alış-Veriş", "Kullanıcı Bulunamadı")
        } else {
        //Veri sorunsuz eşleşir ise redux yapısını kullanarak async storage ile user kayıt olamaktadır.
            dispatch({ type: 'SET_USER', payload: { user: JSON.stringify(user) } })
        }
    }

    //Formik yapısını kullanılarak kullanıcı verilerinin kontrollerini yapabilirdik ama eklemedim
    //Formik yapısı bizlere verileri kolay birşekilde useStategibi değişiklik kontrollerini sağlamaktadır.
    //icon yapısı kullanarak ikonlar eklenmiştir.
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image style={styles.logo} source={require('../../assets/shopping_logo.png')} />
            </View>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.body_container}>
                        <Input
                            placeholder="Kullanıcı Adınızı giriniz..."
                            value={values.username}
                            onType={handleChange('username')}
                            iconName="account"
                        />
                        <Input
                            placeholder="Şifrenizi giriniz..."
                            value={values.password}
                            onType={handleChange('password')}
                            iconName="key"
                            isSecure
                        />

                        <Button text="Giriş yap" onPress={handleSubmit} loading={loading} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Login;

