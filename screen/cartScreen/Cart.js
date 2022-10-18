import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';
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
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../navbarTool/NavBar';
import { useState } from 'react';
import CheckBox from 'expo-checkbox';
import { selectCart, selectCartLength, selectDetailCart, selectId, selectTemptCart, setCart, setCartLength, setDetailCart, setId, setTemptCart } from '../../features/CounterSlice';
import CartCard from './CartCard';
import axios from 'axios';
import { selectCartTotal, selectCheckoutAllStatus, setCheckoutAll } from '../../features/CartSlice';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Cart = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const selectorCart = useSelector(selectCart)
    const selectorTemptCart = useSelector(selectTemptCart)
    const selectorDetailCart = useSelector(selectDetailCart)
    const selectorCartLength = useSelector(selectCartLength)
    const selectorCartTotal = useSelector(selectCartTotal)
    const selectorCheckoutAll = useSelector(selectCheckoutAllStatus)
    const [checkAll, setCheckAll] = useState(false)
    const [popup, setPopup] = useState(false)
    const [allOptionChoose, setAllOptionChoose] = useState({
        color: "#09CDF9",
        borderColor: "#09CDF9",
        border: 3
    })
    const [historyOptionChoose, setHistoryOptionChoose] = useState({
        color: undefined,
        borderColor: undefined,
        border: undefined
    })

    const getData = () => {
        selectorCart.map((cart, index) => {
            if (selectorTemptCart == selectorCartLength) {
                return
            } else {
                console.log(index > selectorTemptCart - 1)
                if (index > selectorTemptCart - 1) {

                    axios.get("http://10.0.2.2:3000/product", { params: { id: cart.productId } })
                        .then(res => {
                            const data = res.data[0]
                            if (selectorDetailCart.length > 0) {
                                selectorDetailCart.filter(cartt =>
                                    cartt.id == cart.productId

                                ).map(res => {
                                    if (res) {
                                        return
                                    } else {
                                        console.log("atau sini?");
                                        dispatch(setDetailCart(data))
                                        dispatch(setTemptCart(selectorCart.length))
                                        dispatch(setCartLength(selectorCart.length))
                                    }
                                })
                            } else if (selectorDetailCart.length == 0) {
                                dispatch(setDetailCart(data))
                                dispatch(setTemptCart(selectorCart.length))
                                dispatch(setCartLength(selectorCart.length))

                            }




                        })
                }
            }
        })
    }
    useEffect(() => {
        getData()
    }, [])

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

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const TotalBar = () => {
        let total = 0
        let length = selectorCartTotal.length

        selectorCartTotal.map(res => {
            return total = total + res.quantity * res.harga
        })
        return (
            <View style={{ height: windowHeight * 8 / 100, width: windowWidth, backgroundColor: "#09CEF9", justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ height: '100%' }}>

                    <Text style={{ fontFamily: "Poppins_400Regular", color: 'white', fontSize: 15 }}>Total</Text>
                    <Text style={{ fontFamily: "Poppins_700Bold", color: 'white', fontSize: 18 }}>Rp {total}</Text>
                </View>
                <TouchableWithoutFeedback onPress={()=>setPopup(true)}>
                    <View style={{ height: '80%', borderRadius: 8, backgroundColor: "#DDEFFF", justifyContent: 'center', padding: 10 }}>

                        <Text style={{ color: "#0596E8", fontFamily: "Poppins_700Bold", fontSize: 15 }}>Check out ({length})</Text>

                    </View>
                </TouchableWithoutFeedback>

            </View>
        )
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
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("Cart"), setPopup(false) }}>
                            <View style={{ width: '80%', height: '15%', backgroundColor: "red", justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Back</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <PopUp />

            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ width: windowWidth, height: windowHeight * 5 / 100, backgroundColor: "#09CEF9", justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: "white" }}>Checkout</Text>
                </View>
                <View style={{ width: windowWidth, height: windowHeight * 7 / 100, flexDirection: 'row', paddingTop: 10 }}>
                    <TouchableWithoutFeedback onPress={() => { setAllOptionChoose({ ...allOptionChoose, color: "#09CDF9", borderColor: "#09CDF9", border: 3 }), setHistoryOptionChoose({ ...historyOptionChoose, color: undefined, borderColor: undefined, border: undefined }) }}>
                        <View style={{ flex: 1, alignItems: 'center', borderColor: allOptionChoose.borderColor, borderBottomWidth: allOptionChoose.border }}>
                            <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: allOptionChoose.color }}>All ({selectorCart.length})</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { setHistoryOptionChoose({ ...historyOptionChoose, color: "#09CDF9", borderColor: "#09CDF9", border: 3 }), setAllOptionChoose({ ...allOptionChoose, color: undefined, borderColor: undefined, border: undefined }) }}>

                        <View style={{ flex: 1, alignItems: 'center', borderColor: historyOptionChoose.borderColor, borderBottomWidth: historyOptionChoose.border }}>
                            <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: historyOptionChoose.color }}>History</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView style={{ backgroundColor: 'white', flex: 1 }} overScrollMode={'never'}>
                    <View style={{ flex: 1 }}>

                        {selectorDetailCart.map(cart => {
                            return <CartCard key={cart.id} stok={cart.stok} id={cart.id} image={cart.image} judul={cart.judul} harga={cart.harga} />
                        })}
                    </View>
                </ScrollView>

            </SafeAreaView>

            <TotalBar />
            <NavBar />
        </View>
    )
}

export default Cart

