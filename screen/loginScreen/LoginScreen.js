import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import accountIcon from '../../assets/loginIcon/Vector.png'
import passIcon from '../../assets/loginIcon/Key.png'
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import google from '../../assets/loginIcon/google.png';
import fb from '../../assets/loginIcon/fb.png'
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, selectUsername, setId, setCart, selectCart, selectDetailCart, selectCartLength, setCartLength, selectId } from '../../features/CounterSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const LoginScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const selectorCartLength = useSelector(selectCartLength)
    const [cartState, setCartState] = useState([])
    const selectorDetailCart = useSelector(selectDetailCart)
    const selectorUserId = useSelector(selectId)
    const selectorCart = useSelector(selectCart)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userData, setUserData] = useState(false)
    // const [username, setUsername] = useState("")
    const [usernamebisa, setUsernameBisa] = useState("")
    const [userLogin, setUserLogin] = useState([])
    const [users, setUsers] = useState([])
    const [emailBorder, setEmailBorder] = useState({
        borderWidth: 0,
        borderColor: undefined
    })
    const [emailErrorMessage, setEmailErrorMessage] = useState({
        text: "",
        color: "red",
        font: "Poppins_400Regular"
    })


    const login = () => {
        const UserData = {
            id: usernameId,
            name: username1,

        }
        let trueornot = false
        let username1 = ""
        let usernameId = ""

        users.map(user => {
            if (email == user.email && password == user.password) {
                trueornot = true
                username1 = user.username
                usernameId = user.id
                console.log("user", users.length)
                dispatch(setUsername(username1))
                dispatch(setId(usernameId))
                dispatch(setCartLength(selectorCart.length))
            

                return
            }
        })

        if (email == "" || password == "") {
            setEmailErrorMessage({ ...emailErrorMessage, text: "Input Email and Password field" })
            setEmailBorder({ ...emailBorder, borderWidth: 1, borderColor: "red" })
            return;
        } else if (trueornot == true) {
            setEmailBorder({ ...emailBorder, borderWidth: 0, borderColor: undefined })
            setEmailErrorMessage({ ...emailErrorMessage, text: "" })
            navigation.navigate("Home", { username1})
        } else if (trueornot == false) {
            setEmailBorder({ ...emailBorder, borderWidth: 1, borderColor: "red" })
            setEmailErrorMessage({ ...emailErrorMessage, text: "Invalid Email or Password" })
        }

    }

    const getDataCart = () => {

    }

    useEffect(() => {
        axios.get("http://10.0.2.2:3000/users")
            .then(res => {
                setUsers(res.data)
            })
            .catch(error => console.log(error));

        // getDataCart()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });


    if (!fontsLoaded) {
        return null;
    }






    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={styles.Container}>

                <Text style={styles.Header}>Login</Text>

                <View style={styles.form}>
                    <Text style={{ color: emailErrorMessage.color, fontFamily: emailErrorMessage.font }}>{emailErrorMessage.text}</Text>
                    <View style={[styles.login, { borderWidth: emailBorder.borderWidth, borderColor: emailBorder.borderColor }]}>
                        <Image source={accountIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={email} onChangeText={text => { setEmail(text) }} style={{ fontFamily: "Poppins_400Regular", flex: 1 }} placeholder='E-mail'></TextInput>
                    </View>
                    <View style={[styles.login, { borderWidth: emailBorder.borderWidth, borderColor: emailBorder.borderColor }]}>
                        <Image source={passIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={password} secureTextEntry={true} onChangeText={text => { setPassword(text) }} style={{ fontFamily: "Poppins_400Regular", flex: 1 }} placeholder='Password'></TextInput>
                    </View>
                </View>

                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={styles.fpass}>Forgot Your Password?</Text>
                </View>

                <View style={styles.loginb}>
                    <Text style={{
                        fontSize: 20, fontFamily: "Poppins_700Bold", color: 'white', textAlign: 'center', flex: 1

                    }} onPress={(login)}>Login</Text>
                </View>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View>
                        <Text style={{ width: 50, textAlign: 'center', fontFamily: "Poppins_400Regular", fontSize: 10 }}>Or with</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.google}>
                        <Image source={google} style={{ marginRight: 12 }} />
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: 'white' }}>Google</Text>
                    </View>
                    <View style={styles.fb}>
                        <Image source={fb} style={{ marginRight: 12 }} />
                        <Text style={{ fontFamily: 'Poppins_400Regular', color: 'white' }}>Facebook</Text>
                    </View>
                </View> */}
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    Header: { fontFamily: "Poppins_700Bold", color: "#08738A", fontSize: 30, textAlign: 'center', marginBottom: 54 },
    Container: { justifyContent: "center", alignItems: 'center', flexDirection: 'column', flex: 1, paddingHorizontal: 55, width: windowWidth, height: windowHeight },
    login: { flexDirection: 'row', backgroundColor: "#F6F6F6", marginBottom: 14, alignItems: 'center', height: windowWidth / 10 },
    form: { flexDirection: 'column', alignItems: "flex-start", width: '100%' },
    fpass: { color: "#FF3D3D", fontSize: 10, fontFamily: "Poppins_400Regular", textAlign: 'right', flex: 1 },
    loginb: { height: 44 / windowHeight * 100 * windowHeight / 100, backgroundColor: "#00D1FF", borderRadius: 10, justifyContent: 'center', marginTop: 23, marginBottom: 48, flexDirection: 'row', alignItems: 'center', marginHorizontal: 40 },
    google: { flex: 1, height: 47 / windowHeight * 100 * windowHeight / 100, flexDirection: 'row', backgroundColor: '#CB2828', font: 'Poppins_400Regular', borderBottomLeftRadius: 23, borderTopLeftRadius: 23, alignItems: 'center', justifyContent: 'center' },
    fb: { flex: 1, height: 47 / windowHeight * 100 * windowHeight / 100, flexDirection: 'row', backgroundColor: '#14B8EC', borderBottomRightRadius: 23, borderTopRightRadius: 23, alignItems: 'center', justifyContent: 'center' },
    bottomContainer: { flexDirection: 'row', marginTop: 50, marginHorizontal: 10 }
})