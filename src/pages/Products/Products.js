import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import Config from "react-native-config"
import ProductCard from '../../components/ProductCard';
import useFetch from "../../hooks/useFetch"
import Loading from "../../components/Loading"
import Error from "../../components/Error"
import SearchBar from '../../components/SearchBar';

const Products = ({ navigation }) => {
    const [text, setText] = React.useState("");

    const { data, error, loading } = useFetch(Config.API_PRODUCT_URL)
    const handleProductSelect = (id) => {
        navigation.navigate("DetailPage", { id })
    }
    //burada herhangi bir flatliste tıklandığın ne yapacağını burada yapıyoruz. 
    const renderProduct = ({ item }) => (
        <ProductCard product={item} onSelect={() => handleProductSelect(item.id)} />
    )

    //filtre ile producta gelen verilerin süzülmesini sağlayan yapımız buradadırdır product taki başlığın içindeki verilere göre süzmektedir.
    const filteredProduct = data.filter((product) => `${product.title}`.toLowerCase().includes(text.toLowerCase()))

    // burada loading ve error durumlarına göre component ekranlarının yenilenmesini kontrol ediyoruz
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error />
    }
    return (
        <SafeAreaView >
            <View>
                <SearchBar setText={setText} />
                <FlatList
                    data={filteredProduct}
                    renderItem={renderProduct}

                />
            </View>

        </SafeAreaView>
    );
};


export default Products;