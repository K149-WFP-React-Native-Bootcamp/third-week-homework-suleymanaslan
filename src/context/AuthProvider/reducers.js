import AsyncStorage from "@react-native-async-storage/async-storage"

//Redux yapımızda oluşturduğumuz Async storage yapısı ile gelen
// verilerimizi kayıt ederek kullanıcının tekrar girişe yönlemesini engelliyoruz.
export default function reducers(state, action) {
    switch (action.type) {
        case 'SET_USER':
            const { user } = action.payload;
            AsyncStorage.setItem("@USER", JSON.stringify(user))
            return { ...state, user };
        //Oturumdan cıkmak istediğimizde kayıtlı olan verileri silebiliyoruz. 
        case 'REMOVE_USER':
            
            AsyncStorage.removeItem('@USER')
            return { ...state, user: null };
        default:
            return state
    }
}