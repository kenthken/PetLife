import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayoutEffect } from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { useNavigation } from '@react-navigation/native'
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';
import merchantPhoto from '../../assets/homeIcon/features/merchant.png'
import { useSelector } from 'react-redux';
import { selectProduct } from '../../features/productSlice';
import MainCard from '../homeScreen/card/MainCard';


const SearchScreen = () => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const [search, setSearch] = useState("")
    const selectorProduct = useSelector(selectProduct)
    const navigation = useNavigation()
    const test = "abc"
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_500Medium,
        Poppins_600SemiBold
    });
    // console.log(selectorProduct);
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    // console.log(search)
    return (
        <SafeAreaView>
            <View style={{ width: windowWidth, height: 50, backgroundColor: "#09CEF9", borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back" size={30} color="#068BA9" style={{ marginHorizontal: 10 }} />

                </TouchableWithoutFeedback>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderRadius: 5, width: '60%', height: '70%' }}>
                    <EvilIcons name="search" size={24} color="#C4C4C4" />
                    <TextInput value={search} onChangeText={value => { setSearch(value) }} autoCorrect={false} spellCheck={false} style={{ flex: 1 }} placeholder="Search" />
                </View>
            </View>
            <ScrollView >
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                    }}>
                        {selectorProduct.map(product => {
                            if(search.length > 0){
                                if (product.judul.toLowerCase().includes(search)) {
                                    return <MainCard id={product.id} image={product.image} judul={product.judul} harga={product.harga} merchantPhoto={merchantPhoto} merchantName={product.merchantName} rating={product.rating} sold={product.sold} discount={product.discount} beforePrice={product.beforePrice} brand={product.brand} berat={product.berat} kategori={product.kategori} deskripsi={product.deskripsi} merchantProfile={product.merchantProfile} />
                                }
                            }else if(search.length == 0){
                                return <MainCard id={product.id} image={product.image} judul={product.judul} harga={product.harga} merchantPhoto={merchantPhoto} merchantName={product.merchantName} rating={product.rating} sold={product.sold} discount={product.discount} beforePrice={product.beforePrice} brand={product.brand} berat={product.berat} kategori={product.kategori} deskripsi={product.deskripsi} merchantProfile={product.merchantProfile} />
                            }
                           
                        })}
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default SearchScreen

const styles = StyleSheet.create({})