import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import sidebarIcon from '../../assets/homeIcon/accesoriesScreen/sidebar.png'
// import ImageCrousel from '../homeScreen/ImageCrousel';
import b1 from '../../assets/homeIcon/accesoriesScreen/b1.png'
import b2 from '../../assets/homeIcon/accesoriesScreen/b2.png'
import b3 from '../../assets/homeIcon/accesoriesScreen/b3.png'
import b4 from '../../assets/homeIcon/accesoriesScreen/b4.png'
import b5 from '../../assets/homeIcon/accesoriesScreen/b5.png'
import { LinearGradient } from 'expo-linear-gradient';
import vector1 from '../../assets/homeIcon/accesoriesScreen/Vector-17.png'
import vector2 from '../../assets/homeIcon/accesoriesScreen/Vector-18.png'
import firstcard from '../../assets/homeIcon/features/first-card1.png'
import dogfood1 from '../../assets/homeIcon/features/dogfood1.png'
import dogfood2 from '../../assets/homeIcon/features/dogfood2.png'
import dogfood3 from '../../assets/homeIcon/features/dogfood3.png'
import Card from '../homeScreen/card/Card';
import CardDiscount from '../homeScreen/card/CardDiscount';
import merchantPhoto from '../../assets/homeIcon/features/merchant.png'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MainCard from '../homeScreen/card/MainCard';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SeeAllScreen = () => {
    const navigation = useNavigation()

    const { params: { title } } = useRoute()

    const [products, setProduct] = useState([]);

    const getData = () => {
        axios.get("http://10.0.2.2:3000/product", { params: { kategori: title } })
            .then(res => {
                console.log('res: ', res)
                setProduct(res.data)
            })
            .catch(error => console.log(error));

    }
    useEffect(() => {
        console.log('kok gabisaaa siissssssssssssssssssssssssss')
        getData();
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_500Medium
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <SafeAreaView>
            <View style={{width:windowWidth,height:windowHeight}}>
            <View style={{ width: windowWidth, height: windowHeight * 7 / 100, backgroundColor: '#09CEF9', alignItems: 'center', flexDirection: 'row' }}>
                <Image source={sidebarIcon} style={{ marginLeft: 10 }} />
                <Text style={{ color: 'white', fontFamily: 'Poppins_400Regular', fontSize: 20, marginLeft: 15 }}>{title}</Text>
                <Text style={{ width: 53, height: 29, backgroundColor: '#09BBED', color: 'white', fontFamily: 'Poppins_400Regular', fontSize: 15, borderRadius: 5, textAlign: 'center', textAlignVertical: 'center', position: 'absolute', right: 10 }} onPress={() => { navigation.goBack() }}>Back</Text>
            </View>
            <View style={{backgroundColor:"white", flex:1}}>
                <ScrollView overScrollMode={'never'}>
                    <View style={{ width: windowWidth, flexDirection: 'row' }}>
                        {products.map(product => {
                            return <MainCard image={product.image} judul={product.judul} harga={product.harga} merchantPhoto={merchantPhoto} merchantName={product.merchantName} rating={product.rating} sold={product.sold} discount={product.discount} beforePrice={product.beforePrice} brand={product.brand} berat={product.berat} kategori={product.kategori} deskripsi={product.deskripsi} merchantProfile={product.merchantProfile}  />
                        })}
                    </View>

                </ScrollView>

            </View>
            </View>
           
        </SafeAreaView>
    )
}

export default SeeAllScreen

const styles = StyleSheet.create({})