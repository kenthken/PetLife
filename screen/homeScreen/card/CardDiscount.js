import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useFonts } from 'expo-font';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading/build/AppLoading';
import star from '../../../assets/homeIcon/features/Star.png'
import { useNavigation } from '@react-navigation/native';

const CardDiscount = ({ image, judul, harga, merchantPhoto, merchantName, rating, sold,discount,beforePrice }) => {
const navigation = useNavigation()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <TouchableOpacity onPress={() =>
      navigation.navigate("DetailProduct", { image, judul, harga, merchantPhoto, merchantName, rating, sold, beforePrice, discount })
    }>
      <View style={{ width: 170, height: 300, backgroundColor: 'white', borderRadius: 13, marginHorizontal: 10 }}>
        <Image source={image} />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Poppins_400Regular' }}>{judul}</Text>
          <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, marginRight: 3 }}>Rp {harga}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ color: 'white', fontFamily: "Poppins_700Bold", backgroundColor: '#14FF2C', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 3, marginRight: 4 }}>{discount}%</Text>
            <Text style={{ fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#979797' }}>Rp {beforePrice}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={merchantPhoto} />
            <Text style={{ color: '#C4C4C4', marginLeft: 5 }}>{merchantName}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Image source={star} />
            <Text style={{ marginLeft: 5 }}>{rating} </Text>
            <Text style={{ color: '#979797' }}>| Terjual {sold}</Text>

          </View>
        </View>
      </View>
    </TouchableOpacity>

  )
}

export default CardDiscount