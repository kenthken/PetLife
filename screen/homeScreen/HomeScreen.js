import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import ImageCrousel from './ImageCrousel.js';
import { TextInput } from 'react-native';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import searchIcon from '../../assets/homeIcon/Vector.png'
import chatIcon from '../../assets/homeIcon/Vector-2.png'
import notificationIcon from '../../assets/homeIcon/Vector-1.png'
import accesoriesIcon from '../..//assets/homeIcon/accesories.png'
import adoptIcon from '../..//assets/homeIcon/adopt.png'
import vetIcon from '../..//assets/homeIcon/vet-clinic.png'
import petIcon from '../..//assets/homeIcon/pet.png'
import AppLoading from 'expo-app-loading/build/AppLoading';
import firstCardImage from '../../assets/homeIcon/features/first-card.png'
import merchantPhoto from '../../assets/homeIcon/features/merchant.png'
import anjing from '../../assets/homeIcon/features/anjing.png'
import kucing from '../../assets/homeIcon/features/kucing.png'
import kelinci from '../../assets/homeIcon/features/kelinci.png'
import Card from './card/Card';
import img1 from '../../assets/homeIcon/image-58.png'
import img2 from '../../assets/homeIcon/image-59.png'
import img3 from '../../assets/homeIcon/image-60.png'
import { AntDesign } from '@expo/vector-icons';
import axios, { Axios } from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectCartLength, selectId, selectTemptCart, selectUsername, setCart, setCartLength } from '../../features/CounterSlice.js';
import { setProductData } from '../../features/productSlice'
import { selectProduct } from '../../features/productSlice.js'
import callProductDataAccesories from '../../fakeAPI/callProductDataAccesories.js';
import NavBar from '../navbarTool/NavBar.js';
import NotAvailableFeatures from '../popupScreen/NotAvailableFeatures.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


function HomeScreen() {
  const navigation = useNavigation();
  const [homeIcon, setHomeIcon] = useState("blue")
  const [cartState, setCartState] = useState([])
  const [popup, setPopup] = useState(false)
  const dispatch = useDispatch()
  const selectorProduct = useSelector(selectProduct)
  const selector = useSelector(selectUsername)
  const selectorUserId = useSelector(selectId)
  const selectorCart = useSelector(selectCart)
  const selectorCartLength = useSelector(selectCartLength)
  const selectorTemptCart = useSelector(selectTemptCart)
  const selectorId = useSelector(selectId)
  const productAccesories = callProductDataAccesories()

  const getData = () => {
    axios.get("http://10.0.2.2:3000/product")
      .then(res => {
        dispatch(setProductData(res.data))

      })
      .catch(error => console.log(error));

  }

  const getDataCart = () => {
    axios.get("http://10.0.2.2:3000/cart", { params: { userId: selectorUserId } })
      .then(res => {
        const data = res.data
        data.map((cart) => {
          console.log("cart", cart)
          dispatch(setCart(cart))
        })

        dispatch(setCartLength(data.length))

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
            <TouchableWithoutFeedback onPress={() => { navigation.navigate("Home"), setPopup(false) }}>
              <View style={{ width: '80%', height: '15%', backgroundColor: "red", justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Back</Text>
              </View>

            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    )
  }

  console.log("tempt", selectorCart)
  useEffect(() => {

    getData()
    getDataCart()


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



  const Features = ({ img, featuresName, onPress }) => {
    const featuresOnPress = () => {
      if (featuresName != "Accesories") {
        setPopup(true)
      } else {
        navigation.navigate(onPress)
      }
    }
    return (
      <TouchableNativeFeedback onPress={() => featuresOnPress()}>
        <View style={{ width: 80, height: 85, alignItems: 'center' }}>
          <Image source={img} style={{ marginBottom: 15, height: 49, width: 49 }} />
          <Text style={styles.iconText}>{featuresName}</Text>
        </View>
      </TouchableNativeFeedback>
    )

  }



  const PetCategories = ({ title, img }) => {
    return (
      <TouchableWithoutFeedback onPress={()=>{setPopup(true)}}>
        <View style={{ height: 120, width: 150, flexDirection: 'column-reverse', marginRight: 10 }}>

          <View style={{ height: 90, width: 150, backgroundColor: '#3DCEEE', borderRadius: 16, justifyContent: 'center', paddingLeft: '20%' }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins_700Bold', fontSize: 15 }}>{title}</Text>

          </View>
          <Image source={img} style={{ position: 'absolute', top: 0, right: 10 }} />
        </View>
      </TouchableWithoutFeedback>

    )
  }




  return (
    <View style={{ flex: 1 }}>

      <ScrollView overScrollMode={'never'} style={{ flex: 1 }}>
        <PopUp />

        <View>
          <View style={styles.carousel}>
            <View style={{
              elevation: 15, shadowColor: 'black', width: '100%', backgroundColor: '#09CEF9', borderBottomLeftRadius: 9, borderBottomRightRadius: 9
            }}>
              <ImageCrousel img={img1} img2={img2} img3={img3} height={181} />
            </View>

            <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.TopContainerTextHi}>Hi, </Text>
                <Text style={styles.TopConntainerTextName}>{selector}</Text>
              </View>
              <View style={{ height: 35, flexDirection: 'row', marginTop: 10 }}>
                <TouchableWithoutFeedback onPress={() => { navigation.navigate("SearchScreen") }}>
                  <View style={{ flex: 5, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderRadius: 5 }}>
                    <Image source={searchIcon} style={{ width: 14, height: 14, marginLeft: 10, marginRight: 15 }} />
                    <TextInput editable={false} style={{ flex: 1 }} placeholder="Search" />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{setPopup(true)}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={notificationIcon} />
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{setPopup(true)}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={chatIcon} />
                </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15, marginHorizontal: 5 }}>
            <Features featuresName='Accesories' img={accesoriesIcon} onPress='Accesories' />
            <Features featuresName='Pet' img={petIcon} />
            <Features featuresName='Vet Clinic' img={vetIcon} />
            <Features featuresName='Adopt' img={adoptIcon} />
          </View>

          <View style={styles.featuresPet}>
            <Text style={styles.featureTitlePet}>Pet</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 200, width: windowWidth, flexDirection: 'row' }}>
              <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>

                <PetCategories title='Dog' img={anjing} />
                <PetCategories title='Cat' img={kucing} />
                <PetCategories title='Rabbit' img={kelinci} />
              </View>
            </ScrollView>

          </View>

          <View style={styles.features}>
            <Text style={styles.featureTitle}>Accesories</Text>
            <TouchableWithoutFeedback onPress={() => { navigation.navigate("SeeAll", { title: "Accesories" }) }}>
              <Text style={styles.seeAll}>See all {'>'}</Text>
            </TouchableWithoutFeedback>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 250, width: windowWidth, flexDirection: 'row', marginVertical: 20, }}>
              <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>

                <Image source={firstCardImage} />
                {selectorProduct.map(product => {
                  if (product.kategori == "Accesories")
                    return <Card key={product.id} id={product.id} stok={product.stok} image={product.image} judul={product.judul} harga={product.harga} merchantPhoto={merchantPhoto} merchantName={product.merchantName} rating={product.rating} sold={product.sold} discount={product.discount} beforePrice={product.beforePrice} brand={product.brand} berat={product.berat} kategori={product.kategori} deskripsi={product.deskripsi} merchantProfile={product.merchantProfile} />
                })}

              </View>
            </ScrollView>

          </View>



        </View>
      </ScrollView>
      <NavBar />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  carousel: {
    height: 282,
    backgroundColor: '#09CEF9'
  },
  TopContainerTextHi: {
    fontFamily: "Poppins_700Bold",
    color: 'white',
    fontSize: 15
  },
  TopConntainerTextName: {
    fontFamily: "Poppins_700Bold",
    color: '#096F9A',
    fontSize: 15
  },
  iconText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 40,
    shadowColor: 'red',
  },
  featureTitle: {
    fontFamily: 'Poppins_700Bold',
    color: 'white',
    fontSize: 15,
    backgroundColor: '#BF842C',
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
    backgroundColor: '#EBC568',
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