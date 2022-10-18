import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
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
import { selectProduct } from '../../features/productSlice.js'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../navbarTool/NavBar';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AccesoriesScreen = () => {
    const navigation = useNavigation()
    const data = useSelector(selectProduct)



    useEffect(() => {
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

    const BrandCard = ({ img }) => {
        return (
            <View style={{ width: 97, height: 96, borderWidth: 3, borderColor: '#EEEEEE', justifyContent: 'center', alignItems: 'center', elevation: 1, marginLeft: 10 }}>
                <Image source={img} />
            </View>

        )
    }

    return (
        <View style={{flex:1}}>

            <ScrollView style={{ backgroundColor: 'white',flex:1 }} overScrollMode={'never'}>
                <SafeAreaView>
                    <View style={{ width: windowWidth, height: windowHeight * 7 / 100, backgroundColor: '#09CEF9', alignItems: 'center', flexDirection: 'row' }}>
                        <Image source={sidebarIcon} style={{ marginLeft: 10 }} />
                        <Text style={{ color: 'white', fontFamily: 'Poppins_400Regular', fontSize: 20, marginLeft: 15 }}>Accesories</Text>
                        <Text style={{ width: 53, height: 29, backgroundColor: '#09BBED', color: 'white', fontFamily: 'Poppins_400Regular', fontSize: 15, borderRadius: 5, textAlign: 'center', textAlignVertical: 'center', position: 'absolute', right: 10 }} onPress={() => { navigation.goBack() }}>Back</Text>
                    </View>
                    {/* <ImageCrousel height={181}/> */}
                    <View style={{ height: 30, width: 10 }} />

                    <View style={{ marginBottom: 30 }}>
                        <LinearGradient colors={['#512C8C', '#6100FF']}
                            start={{
                                x: 0,
                                y: 0
                            }}
                            end={{
                                x: 1,
                                y: 1
                            }}
                            style={{ alignSelf: 'flex-start', width: 176, height: 41, borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins_700Bold', fontSize: 18 }}>Featured Brand</Text>
                        </LinearGradient>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row' }}>
                                <BrandCard img={b1} />
                                <BrandCard img={b2} />
                                <BrandCard img={b3} />
                                <BrandCard img={b4} />
                                <BrandCard img={b5} />
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.features}>
                        <Text style={styles.featureTitle}>Dog Food</Text>
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("SeeAll", { title: "Dog Food" }) }}>

                            <Text style={styles.seeAll}>See all {'>'}</Text>
                        </TouchableWithoutFeedback>
                        <Image source={vector2} style={{ position: 'absolute', bottom: 0, right: 0 }} />
                        <Image source={vector1} style={{ position: 'absolute', bottom: 0, left: 0 }} />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 250, width: windowWidth, flexDirection: 'row', marginVertical: 20, }}>
                            <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>
                                <Image source={firstcard} />
                                {data.map(product => {
                                    if (product.kategori == "Dog Food")
                                        return <Card key={product.id} id={product.id} image={product.image} judul={product.judul} harga={product.harga} merchantPhoto={merchantPhoto} merchantName={product.merchantName} rating={product.rating} sold={product.sold} discount={product.discount} beforePrice={product.beforePrice} brand={product.brand} berat={product.berat} kategori={product.kategori} deskripsi={product.deskripsi} merchantProfile={product.merchantProfile} />
                                })}
                            </View>
                        </ScrollView>

                    </View>



                </SafeAreaView>

            </ScrollView>

        </View>
    )
}

export default AccesoriesScreen

const styles = StyleSheet.create({
    featureTitle: {
        fontFamily: 'Poppins_700Bold',
        color: 'white',
        fontSize: 15,
        backgroundColor: '#4983B8',
        borderBottomRightRadius: 20,
        alignSelf: 'flex-start',
        paddingHorizontal: 10
    },
    seeAll: {
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        position: 'absolute',
        top: 15,
        right: 20
    },
    features: {
        height: 370,
        width: windowWidth,
        backgroundColor: '#7EC7FF',
        marginBottom: 15
    },
    featuresPet: {
        height: 200,
        width: windowWidth,
        backgroundColor: '#1EB2E1',
        marginBottom: 15
    },
    featureTitlePet: {
        fontFamily: 'Poppins_700Bold',
        color: 'white',
        fontSize: 15,
        backgroundColor: '#2C67BF',
        borderBottomRightRadius: 20,
        alignSelf: 'flex-start',

        paddingHorizontal: 10
    },
})