import { View, Text, Dimensions, Image, TouchableWithoutFeedback, Button } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delCartTotal, selectCartTotal, selectCheckoutAllStatus, setCartTotal, setCheckoutAll, setTotal, updateCartTotal } from '../../features/CartSlice';
import { deleteCart, deleteDetailCart, selectCart, selectDetailCart, selectId, updateCart } from '../../features/CounterSlice';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { MaterialIcons } from '@expo/vector-icons';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CartCard = ({ id, image, judul, harga, stok, merchantPhoto, merchantName, rating, sold, discount, beforePrice, brand, berat, deskripsi, kategori, merchantProfile }) => {
  const selectorCheckoutAll = useSelector(selectCheckoutAllStatus)
  const [checkAll, setCheckAll] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#F2F2F2")
  let quantityProduct = 0
  let [quantity, setquantity] = useState(0)
  const [cart, setCart] = useState([])
  const selectorUserId = useSelector(selectId)
  const dispatch = useDispatch()
  const selectorCart = useSelector(selectCart)
  const selectorDetailCart = useSelector(selectDetailCart)
  let indexx = 0
  const selectorCartTotal = useSelector(selectCartTotal)
  const dataIncrease = {
    userId: selectorUserId,
    productId: id,
    quantity: quantity + 1
  }
  const dataDecrease = {
    userId: selectorUserId,
    productId: id,
    quantity: quantity - 1
  }
  let qty = quantity



  useEffect(() => {
    quantityClick()
    // updateQuantity()
    // if (selectorCheckoutAll == true) {
    //   console.log("masuk ga si ajg");
    //   setCheckAll(true)
    // }

  }, [])



  const quantityClick = () => {
    selectorCart.filter((cart) =>
      cart.productId == id


    ).map((quantity, index) => {

      setquantity(quantity.quantity)
    }
    )


  }

  const updateIncreaseQuantity = () => {
    // selectorCart.map(cart => {
    //   dispatch(updateCart([id, quantity + 1]))
    //   axios.put(`http://10.0.2.2:3000/cart/${cart.id}`, data)
    // })
    selectorCart.filter(cart =>

      cart.productId == id
    ).map(quantityy => {
      console.log("productId", quantityy.productId, id);
      console.log("find index", selectorCart.findIndex(res => res.id === id));
      dispatch(updateCart([id, quantity + 1]))
      axios.put(`http://10.0.2.2:3000/cart/${quantityy.id}`, dataIncrease)
    })
  }

  const updateDecreaseQuantity = () => {
    // selectorCart.map(cart => {
    //   dispatch(updateCart([id, quantity + 1]))
    //   axios.put(`http://10.0.2.2:3000/cart/${cart.id}`, data)
    // })
    selectorCart.filter(cart =>

      cart.productId == id
    ).map(quantityy => {
      console.log("productId", quantityy.productId, id);
      dispatch(updateCart([id, quantity - 1]))
      axios.put(`http://10.0.2.2:3000/cart/${quantityy.id}`, dataDecrease)
    })
  }

  const click = () => {
    selectorCart.filter((cart) =>
      cart.productId == id
    ).map(quantity => {
      quantityProduct = quantity.quantity
    }
    )
    const data = {
      productId: id,
      harga,
      quantity: quantityProduct,

    }
    if (checkAll == false) {
      let trueornot = false
      setCheckAll(true)
      setBackgroundColor("#CEF5FE")
      dispatch(setCheckoutAll(false))
      if (selectorCartTotal.length == 0) {
        trueornot = false
      } else {
        selectorCartTotal.filter(cartTotal =>
          cartTotal.productId == id
        ).map(() => { trueornot = true })
      }
      if (trueornot == false) {

        dispatch(setCartTotal(data))
      }
    } else if (checkAll == true) {
      selectorCartTotal.map((cartTotal, index) => {
        if (cartTotal.productId == id) {
          indexx = cartTotal.productId
        }
      }
      )
      dispatch(delCartTotal(indexx))
      // console.log("asdasdasd",selectorCartTotal.filter(cartt => cartt.id !== indexx))
      // cart.filter(cartt => cartt.id !== indexx).map(res => console.log("asdasd", res))
      setCheckAll(false)
      setBackgroundColor("#F2F2F2")
    }
  }
  console.log("data total Cart", selectorCartTotal)
console.log("selectordetailcart",selectorDetailCart);
  // console.log("cart state", cart)

  const decreaseQuantity = () => {
    if (quantity != 1) {
      setquantity(quantity - 1)
      if (selectorCartTotal.length > 0) {
        dispatch(updateCartTotal([id, quantity - 1]))
      }
    }
    updateDecreaseQuantity()
  }

  const increaseQuantity = () => {

    if (quantity != stok) {
      setquantity(quantity + 1)
      if (selectorCartTotal.length > 0) {
        dispatch(updateCartTotal([id, quantity + 1]))
      }


    }

    updateIncreaseQuantity()
  }
  // console.log("Cart", selectorCart)
  const deleteCartt = () => {
    selectorCart.filter(cart => cart.productId === id).map(
      del => {
        axios.delete(`http://10.0.2.2:3000/cart/${del.id}`)
          .then(
            dispatch(deleteCart(id)),
            dispatch(delCartTotal(id)),
            dispatch(deleteDetailCart(id))
          )
        console.log("delete index", selectorCart.findIndex(res => res.productId === id));

      }
    )

  }

  const Test = () => {
    let count = 0
    const x = () => {
      count = count + 1
      console.log("coasd", count);
      console.log("asda");
    }
    console.log("asdad", count);
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableWithoutFeedback onPress={() => { x() }}>
          <Text style={{ fontSize: 20 }}>+</Text>
        </TouchableWithoutFeedback>
        <Text>{count}</Text>
      </View>
    )
  }

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => { click() }}>

      <View style={{ width: windowWidth, height: windowHeight * 28 / 100, marginVertical: 5, borderBottomWidth: 0.5, borderBottomColor: "#C7C5C5", backgroundColor: backgroundColor, paddingVertical: 5 }}>
        {/* <View style={{flexDirection:'row',alignSelf:'flex-end', marginRight:10, alignItems:'center'}}>
        <MaterialIcons name="cancel" size={24} color="red" style={{}} />
        <Text style={{color:'red', fontSize:12}}>Remove</Text>
        </View> */}

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <View style={{ height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>


            <Checkbox
              disabled={false}
              value={checkAll}
              onValueChange={(newValue) => setCheckAll(newValue)}
              style={{ borderWidth: 1, width: 15, height: 15, marginRight: 5, borderColor: 'black' }}
              color={checkAll ? '#09CEF9' : undefined}
            />
            {/* <Checkbox
              disabled={false}
              value={selectorCheckoutAll ? selectorCheckoutAll : checkAll}
              onValueChange={(newValue) => setCheckAll(newValue)}
              style={{ borderWidth: 1, width: 15, height: 15, marginRight: 5, borderColor: 'black' }}
              color={selectorCheckoutAll ? '#09CEF9' : undefined}
            /> */}

          </View>
          <View style={{ height: '100%', flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 11 }} />
          </View>
          <View style={{ height: '100%', flex: 5, alignItems: 'flex-start', paddingLeft: 10, paddingVertical: 15 }}>
            <View style={{ width: '100%', height: '50%' }}>
              <Text numberOfLines={2} style={{ fontFamily: "Poppins_400Regular", fontSize: 18 }}>{judul}</Text>
            </View>
            <View style={{ width: '100%', height: '50%', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: "Poppins_600SemiBold" }}>Rp {harga}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                <View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => decreaseQuantity()} >
                      <AntDesign name="minuscircle" size={24} color="#09CDF9" />
                    </TouchableWithoutFeedback>
                    <Text style={{ marginHorizontal: 5 }}>
                      {quantity}
                    </Text>
                    <TouchableWithoutFeedback onPress={() => { increaseQuantity() }}>
                      <AntDesign name="pluscircle" size={24} color="#09CDF9" />
                    </TouchableWithoutFeedback>

                  </View>
                  <Text style={{ color: "#B9B8B8", marginTop: 5 }}>Stock {stok}</Text>
                </View>



                <View style={{ marginHorizontal: 15 }}>
                  <TouchableWithoutFeedback onPress={() => { deleteCartt() }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>Remove</Text>
                  </TouchableWithoutFeedback>

                </View>
              </View>
            </View>
            {/* <Test /> */}

          </View>
        </View>
      </View>

    </TouchableWithoutFeedback >
  )
}

export default CartCard