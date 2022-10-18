import { Image, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading/build/AppLoading';
import star from '../../../assets/homeIcon/features/Star.png'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Card = ({ id,stok, image, judul, harga, merchantPhoto, merchantName, rating, sold, discount, beforePrice, brand, berat, deskripsi, kategori, merchantProfile }) => {
  const navigation = useNavigation()


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  });

  const DiscountUI = () => {
    if (discount == null && beforePrice == null) {
      return
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <Text style={{ color: 'white', fontFamily: "Poppins_700Bold", backgroundColor: '#14FF2C', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 3, marginRight: 4 }}>{discount}%</Text>
          <Text style={{ fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#979797' }}>Rp {beforePrice}</Text>
        </View>
      )
    }

  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <TouchableOpacity onPress={() =>
      navigation.navigate("DetailProduct", {id,stok, image, judul, harga, merchantPhoto, merchantName, rating, sold, discount, beforePrice, kategori, brand, berat, deskripsi,merchantProfile })
    }>
      <View style={{ width: 170, height: 300, backgroundColor: 'white', borderRadius: 13, marginHorizontal: 10 }}>
        <View style={{ width: '100%', height: 133 }}>

          <Image source={{ uri: image}  } style={{ flex: 1, width: undefined, height: undefined , borderTopLeftRadius:13, borderTopRightRadius:13}} />
        </View>
        <View style={{ marginLeft: 5, height: 160 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins_400Regular'}} numberOfLines={2}>{judul}</Text>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16 }}>Rp {harga}</Text>
          <DiscountUI />
          <View style={{ bottom: 0, position: "absolute" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 13.44, height: 14 }}>
                <Image source={ merchantPhoto } style={{ flex: 1, height: undefined, width: undefined }} />
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
    </TouchableOpacity>

  )
}

export default Card