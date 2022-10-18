import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartIconColor, selectHomeIconColor, setCartIcon, setHomeIcon } from '../../features/NavBarSlice';
import { selectCart } from '../../features/CounterSlice';
import { delCartTotal, selectCartTotal } from '../../features/CartSlice';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const NavBar = () => {
  // const [homeIcon, setHomeIcon] = useState("blue")
  // const [cartIcon, setCartIcon] = useState("")
  const dispatch = useDispatch()
  const selectorHomeIconColor = useSelector(selectHomeIconColor)
  const selectorCartIconColor = useSelector(selectCartIconColor)
  const selectorCartTotal = useSelector(selectCartTotal)
  const selectorCart = useSelector(selectCart)
  const navigation = useNavigation();

  const homeIconColor = () => {
    dispatch(setHomeIcon("blue"))
    dispatch(setCartIcon("black"))

    selectorCartTotal.map((cart,index) => {
      console.log("index", cart);
      dispatch(delCartTotal(cart.productId))
     }
    )

    navigation.navigate("Home")
  }

  const cartIconColor = () => {
    dispatch(setHomeIcon("black"))
    dispatch(setCartIcon("blue"))
    navigation.navigate("Cart")
  }


  const CartNumber = () => {

    if (selectorCart.length == 0) {
      return
    } else {
      return (
        <View style={{ borderRadius: 20, width: 20, height: 20, backgroundColor: "#09CEF9", alignItems: 'center', position: 'absolute', top: 0, right: 0 }}>
          <Text style={{ color: 'white' }}>{selectorCart.length}</Text>
        </View>
      )
    }

  }
  return (
    <View style={{ height: windowHeight * 8 / 100, width: windowWidth, backgroundColor: 'white', flexDirection: 'row', borderTopWidth: 1, borderTopColor: "#E2E2E2" }}>
      <TouchableWithoutFeedback onPress={() => { homeIconColor() }}>
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '50%', borderRightWidth: 1, borderColor: "#E2E2E2" }}>
          <AntDesign name="home" size={24} color={selectorHomeIconColor} />
          <Text style={{ color: selectorHomeIconColor }}>Home</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => { cartIconColor() }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: "50%" }}>
          <View style={{ width: 50, height: "100%", alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name="shoppingcart" size={24} color={selectorCartIconColor} />

            <CartNumber />
            <Text style={{ color: selectorCartIconColor }}>Cart</Text>
          </View>

        </View>

      </TouchableWithoutFeedback>

    </View>
  )
}

export default NavBar