import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { TabActions, useRoute } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useFonts } from 'expo-font'
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backIcon from '../../assets/homeIcon/productDetail/Vector.png'
import shareIcon from '../../assets/homeIcon/productDetail/Vector-1.png'
// import ImageCrousel from '../homeScreen/ImageCrousel'
import dogfood from '../../assets/homeIcon/productDetail/dogfood1.png'
import saveIcon from '../../assets/homeIcon/productDetail/save.png'
import starIcon from '../../assets/homeIcon/features/Star.png'
import merchantProfile from '../../assets/homeIcon/productDetail/merchantProfile.png'
import location from '../../assets/homeIcon/productDetail/location.png'
import dotIcon from '../../assets/homeIcon/productDetail/dot.png'
import merchantPhoto from '../../assets/homeIcon/features/merchant.png'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PurchaseScreen from '../purchaseScreen/PurchaseScreen'
import buynowIcon from '../../assets/homeIcon/productDetail/buyNow.png'
import cartIcon from '../../assets/homeIcon/productDetail/cart.png'
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
import { selectCart, selectCartLength, setCart, setCartLength, setDetailCart, updateCart } from '../../features/CounterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectId } from '../../features/CounterSlice'
import { useState } from 'react'
import { setCartIcon, setHomeIcon } from '../../features/NavBarSlice'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const DetailProduct = () => {
    const navigation = useNavigation()
    const tab = createBottomTabNavigator()
    const idSelector = useSelector(selectId)
    const [popup, setPopup] = useState(false)
    const [popupCart, setPopupCart] = useState(false)
    const [popUpCartDuplicate, setPopupCartDuplicate] = useState(false)
    const selectorCart = useSelector(selectCart)
    const selectorCartLength = useSelector(selectCartLength)
    const dispatch = useDispatch()

    const { params: {
        id, image, judul, harga, discount, beforePrice, merchantPhoto, merchantName, rating, sold, stok, kategori, brand, berat, deskripsi, merchantProfile
    } } = useRoute()


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

    const DiscountUI = () => {
        if (discount == null && beforePrice == null) {
            return
        } else {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                    <Text style={{ color: 'white', fontFamily: "Poppins_700Bold", backgroundColor: '#14FF2C', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 3, marginRight: 4 }}>{discount}%</Text>
                    <Text style={{ fontSize: 10, textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#979797', fontSize: 12 }}>Rp {beforePrice}</Text>
                </View>
            )
        }

    }

    const DetailProduct = ({ title, description }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, fontFamily: "Poppins_400Regular", color: "#898989", fontSize: 13 }}>{title}</Text>
                <Text style={{ flex: 1, fontFamily: "Poppins_700Bold", fontSize: 13 }}>{description}</Text>
            </View>
        )
    }

    const addToCart = () => {
        const data = {
            userId: idSelector,
            productId: id,
            quantity: 1
        }

        axios.get("http://10.0.2.2:3000/cart", { params: { productId: id, userId: idSelector } })
            .then(res => {
                const datares = res.data
                if (datares.length > 0) {
                    console.log("yakin?", datares)
                    console.log("ada data duplicate")
                    setPopupCartDuplicate(true)
                    // console.log(datares)
                    // datares.map(cart => {
                    //     axios.put(`http://10.0.2.2:3000/cart/${cart.id}`,data)
                    //     dispatch(updateCart([cart.id,data.quantity]))
                    // })

                } else {
                    console.log("tidak ada data duplicate")
                    axios.post("http://10.0.2.2:3000/cart", data)
                        .then(res => {
                            const data = [res.data]
                            dispatch(setCartLength(selectorCartLength + data.length))
                            dispatch(setCart(res.data))

                        })
                    axios.get("http://10.0.2.2:3000/product", { params: { id: id } })
                        .then(res => {
                            const data = res.data[0]
                            console.log(("data", data));
                            dispatch(setDetailCart(data))
                            setPopupCart(true)
                        })
                }
            })

    }
    const PopUp = () => {
        return (
            <Modal transparent={popup}
                visible={popup}>
                <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: "#ffffff", alignItems: 'center', paddingHorizontal: 20, width: '72%', height: '40%', justifyContent: 'center', borderRadius: 10 }}>
                        <MaterialIcons name="cancel" size={40} color="red" style={{ marginBottom: 15 }} />
                        {/* <AntDesign name="checkcircle" size={50} color="#42FF00" style={{ marginBottom: 15 }} /> */}
                        <Text style={{ color: "#C4C4C4", fontSize: 20, fontFamily: "Poppins_700Bold", marginBottom: 10 }}>Sorry!!</Text>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13, marginBottom: 30 }}> This Features not available at the moment </Text>
                        <TouchableWithoutFeedback onPress={() => { setPopup(false) }}>
                            <View style={{ width: '80%', height: '15%', backgroundColor: "red", justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Back</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }
    const PopUpCart = () => {
        return (
            <Modal transparent={popupCart}
                visible={popupCart}>
                <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: "#ffffff", alignItems: 'center', paddingHorizontal: 20, width: '72%', height: '40%', justifyContent: 'center', borderRadius: 10 }}>

                        <AntDesign name="checkcircle" size={50} color="#42FF00" style={{ marginBottom: 15 }} />
                        <Text style={{ color: "#C4C4C4", fontSize: 20, fontFamily: "Poppins_700Bold", marginBottom: 10 }}>Sorry!!</Text>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13, marginBottom: 30 }}> This Features not available at the moment </Text>
                        <TouchableWithoutFeedback onPress={() => { setPopupCart(false) }}>
                            <View style={{ width: '80%', height: '15%', backgroundColor: "red", justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Back</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }

    const PopUpCartDuplicate = () => {
        return (
            <Modal transparent={popUpCartDuplicate}
                visible={popUpCartDuplicate}>
                <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: "#ffffff", alignItems: 'center', paddingHorizontal: 20, width: '72%', height: '40%', justifyContent: 'center', borderRadius: 10 }}>

                        <MaterialIcons name="cancel" size={40} color="red" style={{ marginBottom: 15 }} />
                        <Text style={{ color: "#C4C4C4", fontSize: 20, fontFamily: "Poppins_700Bold", marginBottom: 10 }}>Sorry!!</Text>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13, marginBottom: 30 }}> This Product is already in the Cart </Text>
                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <TouchableWithoutFeedback onPress={() => { setPopupCartDuplicate(false) }}>
                                <Text style={{ fontFamily: "Poppins_700Bold", color: "#B9B8B8" }}>Back</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {
                                navigation.navigate("Cart"), dispatch(setHomeIcon("black"))
                                dispatch(setCartIcon("blue")), setPopupCartDuplicate(false)
                            }}>
                                <View style={{ width: '50%', backgroundColor: "#09CDF9", justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginHorizontal: 20 }}>
                                    <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Go to Cart</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
    console.log("asdasdas", selectorCart.length)
    return (
        <SafeAreaView>
            <PopUp />
            <PopUpCart />
            <PopUpCartDuplicate />
            <View style={{ width: windowWidth, height: windowHeight }}>
                <View style={{ width: windowWidth, height: windowHeight * 7 / 100, backgroundColor: '#09CEF9', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <Image source={backIcon} style={{ position: 'absolute', left: 10 }} />
                    </TouchableWithoutFeedback>
                    <Image source={shareIcon} style={{ position: 'absolute', right: 10 }} />
                </View>

                <View style={{ flex: 1 }}>
                    <ScrollView overScrollMode={'never'}>
                        <View style={{ width: windowWidth, flex: 1 }}>
                            <View style={{ elevation: 5, shadowColor: "black", backgroundColor: 'white', width: windowWidth, height: 297 }}>
                                <Image source={{ uri: image }} style={{ flex: 1, height: undefined, width: undefined }} resizeMode='cover' />
                                {/* <ImageCrousel img1={image} img2={image} img3={image} height={323} /> */}
                            </View>
                            <View style={{ padding: 15, backgroundColor: "white" }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 24, color: "#595959", width: '80%' }}>{judul}</Text>
                                    <View>
                                        <Image source={saveIcon} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 24, fontFamily: "Poppins_700Bold" }}>Rp {harga}</Text>
                                    <DiscountUI />
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={starIcon} style={{ width: 25, height: 25 }} />
                                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, marginHorizontal: 5 }}>{rating}</Text>
                                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, color: "#979797" }}>| Terjual {sold}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ marginRight: 5, fontFamily: "Poppins_700Bold", fontSize: 15, color: "#C7C5C5" }}>Stock</Text>
                                        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 15, color: "#C7C5C5" }}>{stok}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ backgroundColor: "white", marginVertical: 10, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, padding: 15 }}>
                                <View style={{ width: 60, height: 60 }}>
                                    <Image source={{ uri: merchantProfile }} style={{ flex: 1, height: undefined, width: undefined, borderRadius: 11 }} />
                                </View>

                                <View style={{ paddingLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                        <Image source={merchantPhoto} style={{ marginRight: 5 }} />
                                        <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18 }}>{merchantName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={location} style={{ marginRight: 10 }} />
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: "#716767" }}>Location</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center', }}>
                                        <Image source={starIcon} style={{ width: 18, height: 18, marginRight: 5 }} />
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>3.5/5</Text>
                                        <Image source={dotIcon} style={{ marginHorizontal: 5 }} />
                                        <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", color: "#716767" }}>Transaksi 1192</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ backgroundColor: "white", padding: 15, }}>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", paddingTop: 10 }}>Detail Produk</Text>
                                <View style={{ width: "80%" }}>
                                    <DetailProduct title="Kategori" description={kategori} />
                                    <DetailProduct title="Brand" description={brand} />
                                    <DetailProduct title="Berat" description={berat} />

                                </View>
                                <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", paddingTop: 20 }}>Deskripsi</Text>
                                <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#898989" }}>{deskripsi}</Text>
                            </View>

                        </View>
                    </ScrollView>
                </View>
                <View style={{ height: 50, width: windowWidth, backgroundColor: "#DDEFFF", flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => { setPopup(true) }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={buynowIcon} />
                            <Text style={{ color: "#0596E8", fontSize: 14, fontFamily: "Poppins_700Bold", marginLeft: 17 }}>Buy Now</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { addToCart() }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: "#D9D9D9" }}>
                            <Image source={cartIcon} />
                            <Text style={{ color: "#0596E8", fontSize: 14, fontFamily: "Poppins_700Bold", marginLeft: 17 }}>Add to Cart</Text>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
        // <View>
        //     <View style={{ width: windowWidth, height: windowHeight * 7 / 100, backgroundColor: '#09CEF9', alignItems: 'center', flexDirection: 'row', marginTop: StatusBar.currentHeight }}>
        //         <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
        //             <Image source={backIcon} style={{ position: 'absolute', left: 10 }} />
        //         </TouchableWithoutFeedback>
        //         <Image source={shareIcon} style={{ position: 'absolute', right: 10 }} />
        //     </View>

        //     <View>
        //         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        // <View style={{ width: windowWidth, flex: 1 }}>
        //     <View style={{ elevation: 10, shadowColor: "black", backgroundColor: 'white' }}>
        //         <ImageCrousel img1={image} img2={image} img3={image} height={323} />
        //     </View>
        //     <View style={{ padding: 15, backgroundColor: "white" }}>
        //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        //             <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 24, color: "#595959", width: '80%' }}>{judul}</Text>
        //             <Image source={saveIcon} />
        //         </View>
        //         <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
        //             <Text style={{ fontSize: 24, fontFamily: "Poppins_700Bold" }}>Rp {harga}</Text>
        //             <DiscountUI />
        //         </View>
        //         <View style={{ flexDirection: 'row', marginTop: 15 }}>
        //             <Image source={starIcon} style={{ width: 25, height: 25 }} />
        //             <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, marginHorizontal: 5 }}>{rating}</Text>
        //             <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18, color: "#979797" }}>| Terjual {sold}</Text>
        //         </View>
        //     </View>

        //     <View style={{ backgroundColor: "white", marginVertical: 10, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, padding: 15 }}>
        //         <Image source={merchantProfile} />
        //         <View style={{ paddingLeft: 10 }}>
        //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        //                 <Image source={merchantPhoto} style={{ marginRight: 5 }} />
        //                 <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 18 }}>{merchantName}</Text>
        //             </View>
        //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                 <Image source={location} style={{ marginRight: 10 }} />
        //                 <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14, color: "#716767" }}>Location</Text>
        //             </View>
        //             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center', }}>
        //                 <Image source={starIcon} style={{ width: 18, height: 18, marginRight: 5 }} />
        //                 <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>3.5/5</Text>
        //                 <Image source={dotIcon} style={{ marginHorizontal: 5 }} />
        //                 <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", color: "#716767" }}>Transaksi 1192</Text>
        //             </View>
        //         </View>
        //     </View>

        //     <View style={{ backgroundColor: "white", padding: 15, marginBottom: 20, }}>
        //         <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", paddingTop: 10 }}>Detail Produk</Text>
        //         <View style={{ width: "80%" }}>
        //             <DetailProduct title="Kategori" description="Dog food" />
        //             <DetailProduct title="Brand" description="Dog food" />
        //             <DetailProduct title="Berat" description="Dog food" />
        //             <DetailProduct title="Jenis Makanan" description="Dog food" />

        //         </View>
        //         <Text style={{ fontSize: 14, fontFamily: "Poppins_400Regular", paddingTop: 20 }}>Deskripsi</Text>
        //         <Text style={{ fontSize: 13, fontFamily: "Poppins_400Regular", color: "#898989" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a quam non orci ultricies auctor quis id nunc. Proin cursus, tortor vel congue condimentum...</Text>
        //     </View>

        // </View>

        //         </ScrollView>
        //     </View>

        //     <View style={{ height: 100, width: windowWidth, backgroundColor: "red" }}>
        //         <Text>asdasdasd</Text>
        //     </View>

        // </View>
    )
}

export default DetailProduct

const styles = StyleSheet.create({})