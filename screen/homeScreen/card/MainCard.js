import { Dimensions, Image, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading/build/AppLoading';
import star from '../../../assets/homeIcon/features/Star.png'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native-web';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MainCard = ({id, image, judul, harga, merchantPhoto, merchantName, rating, sold, discount, beforePrice, brand, berat, deskripsi, kategori, merchantProfile,quantity }) => {
    const navigation = useNavigation()


    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_500Medium
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const DiscountUI = () => {
        if (discount == null && beforePrice == null) {
            return
        } else {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                    <Text style={{ color: 'white', fontFamily: "Poppins_700Bold", backgroundColor: '#14FF2C', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 3, marginRight: 4 }}>{discount}%</Text>
                    <Text style={{ fontSize: 12, textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#979797' }}>Rp {beforePrice}</Text>
                </View>
            )
        }

    }
    return (
        <TouchableWithoutFeedback onPress={() =>
            navigation.navigate("DetailProduct", {id,quantity, image, judul, harga, merchantPhoto, merchantName, rating, sold, discount, beforePrice, kategori, brand, berat, deskripsi,merchantProfile })
          }>

            <View style={{ height: 384, width: windowWidth / 2 - 10, backgroundColor: "white", borderRadius: 5, elevation: 5, shadowColor: "black", marginHorizontal: 5, marginVertical: 5 }}>
                <View style={{ flex: 1, backgroundColor: "black", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                    <Image source={{ uri: image }} style={{ width: undefined, height: undefined, flex: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                </View>
                <View style={{ paddingHorizontal: 10, marginTop: 10, flex: 1 }}>
                    <Text numberOfLines={2} style={{ fontFamily: "Poppins_400Regular", fontSize: 15, color: "#595959" }}>{judul}</Text>
                    <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18 }}>Rp {harga}</Text>
                    <DiscountUI />
                    <View style={{ bottom: 5, left: 5, position: "absolute" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 13.44, height: 14 }}>
                                <Image source={merchantPhoto} style={{ flex: 1, height: undefined, width: undefined }} />
                            </View>
                            <Text style={{ color: '#C4C4C4', marginLeft: 5 }}>{merchantName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                            <Image source={star} />
                            <Text style={{ marginLeft: 5 }}>{rating} </Text>
                            <Text style={{ color: '#979797' }}>| Terjual {sold}</Text>

                        </View>
                    </View>

                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default MainCard

const styles = StyleSheet.create({})