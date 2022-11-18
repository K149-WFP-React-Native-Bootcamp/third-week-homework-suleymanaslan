import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from "./Detail.styles"
import Config from "react-native-config"
import useFetch from "../../hooks/useFetch"
import Loading from "../../components/Loading"
import Error from "../../components/Error"

const Detail = ({ route }) => {
    //navigasyon yapısından gelen navigation ve route parametresinde gelen id yi buradan alıyoruz
    const { id } = route.params
    //burada herhangi bir flatliste tıklandığın ne yapacağını burada yapıyoruz. 
    const { loading, error, data } = useFetch(`${Config.API_PRODUCT_URL}/${id}`)
    // burada loading ve error durumlarına göre component ekranlarının yenilenmesini kontrol ediyoruz
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error />
    }
    return (
        <View style={styles.container}> 
            <Image style={styles.image} source={{ uri: data.image }} />
            <View style={styles.body_container}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.desc}>{data.description}</Text>
                <Text style={styles.price}>{data.price} TL</Text>
            </View>
        </View>


    );
};


export default Detail;