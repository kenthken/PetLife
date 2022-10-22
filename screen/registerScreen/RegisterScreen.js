import { Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import accountIcon from '../../assets/registerIcon/Vector.png'
import emailIcon from '../../assets/registerIcon/Vector-1.png'
import phoneIcon from '../../assets/registerIcon/Vector-2.png'
import passIcon from '../../assets/registerIcon/Key.png'
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Dimensions } from 'react-native';
import { Modal } from 'react-native';
import CheckBox from 'expo-checkbox';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [username, setUsername] = useState({
        text: "",
        errorMessage: "",
        border: 0,
        borderColor: undefined
    })
    const [email, setEmail] = useState({
        text: "",
        errorMessage: "",
        border: 0,
        borderColor: undefined
    })
    const [phone, setPhone] = useState({
        text: "",
        errorMessage: "",
        border: 0,
        borderColor: undefined
    })
    const [password, setPassword] = useState({
        text: "",
        errorMessage: "",
        border: 0,
        borderColor: undefined
    })
    const [confirmPassword, setConfirmPassword] = useState({
        text: "",
        errorMessage: "",
        border: 0,
        borderColor: undefined
    })
    const [errorMessage, setErrorMessage] = useState("")


    const submit = () => {
        const userData = {
            username: username.text,
            email: email.text,
            phone: phone.text,
            password: password.text,
        }

        let check = /(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;

        if (username.text == "" || email.text == "" || phone.text == "" || password.text == "" || confirmPassword.text == "") {
            setErrorMessage("All Input must be field")
            return;
        }

        if (username.text.length < 4) {
            setErrorMessage("Username minimum 4 character")
            setUsername({ ...username, border: 1, borderColor: "red" })
            return;
        } else if (username.text.length >= 4) {
            setUsername({ ...username, border: 0, borderColor: undefined })
            setErrorMessage("")
        }
        if (!(email.text.endsWith("@mail.com"))) {
            setErrorMessage("Email must end with @mail.com")
            setEmail({ ...email, border: 1, borderColor: "red" })
            return;
        } else if (email.text.endsWith("@mail.com")) {
            setErrorMessage("")
            setEmail({ ...email, border: 0, borderColor: undefined })
        }

        if (!(phone.text.startsWith("62") && /^[0-9]+$/.test(phone.text))) {
            setErrorMessage("Phone must start with 62 and must be numerics")
            setPhone({ ...phone, border: 1, borderColor: "red" })
            return
        } else if (phone.text.startsWith("62") && /^[0-9]+$/.test(phone.text)) {
            setErrorMessage("")
            setPhone({ ...phone, border: 0, borderColor: undefined })
        }

        if (!(password.text.match(check))) {
            setErrorMessage("Password minimum 8 character with at least 1 numerics")
            setPassword({ ...password, border: 1, borderColor: "red" })
            return;
        } else if (password.text.match(check)) {
            setErrorMessage("")
            setPassword({ ...password, border: 0, borderColor: undefined })
        }

        if (confirmPassword.text != password.text) {
            setErrorMessage("Confirm password must match with password")
            setConfirmPassword({ ...confirmPassword, border: 1, borderColor: "red" })
            return;
        } else if (confirmPassword.text == password.text) {
            setErrorMessage("")
            setConfirmPassword({ ...confirmPassword, border: 0, borderColor: undefined })
        }

        if (toggleCheckBox == false) {
            setErrorMessage("Accept Terms and Conditions")
            return;
        }
        axios.post("http://10.0.2.2:3000/users", userData)
            .then(res => {
                console.log(res.data)
                setUsername({ ...username, text: "", border: 0, borderColor: undefined })
                setEmail({ ...email, text: "", border: 0, borderColor: undefined })
                setPhone({ ...phone, text: "", border: 0, borderColor: undefined })
                setPassword({ ...password, text: "", border: 0, borderColor: undefined })
                setConfirmPassword({ ...confirmPassword, text: "", border: 0, borderColor: undefined })
                setPopUp(true)
            })
            .catch(error => { console.log(error) })

        

    }




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
        return null;
    }

    const Popup = () => {
        return (
            <Modal transparent={true}
                visible={popUp}>
                <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: "#ffffff", alignItems: 'center', paddingHorizontal: 20, width: '72%', height: '40%', justifyContent: 'center', borderRadius: 10 }}>
                        <AntDesign name="checkcircle" size={50} color="#42FF00" style={{ marginBottom: 15 }} />
                        <Text style={{ color: "#C4C4C4", fontSize: 20, fontFamily: "Poppins_700Bold", marginBottom: 10 }}>Successful!</Text>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13, marginBottom: 30 }}>Your account has been registered</Text>
                        <TouchableWithoutFeedback onPress={()=>{navigation.navigate("Login")}}>
                            <View style={{ width: '80%', height: '17%', backgroundColor: "#42FF00", justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Login</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
        )

    }

    return (
        <SafeAreaView style={styles.safearea}>

            <Popup />
            <View style={styles.container}>
                <Text style={styles.header}>Register</Text>

                <View style={styles.form}>
                    <Text style={{ color: "red", fontFamily: "Poppins_400Regular" }}>{errorMessage}</Text>
                    <View style={[styles.login, { borderColor: username.borderColor, borderWidth: username.border }]}>
                        <Image source={accountIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={username.text} onChangeText={value => setUsername({ ...username, text: value })} style={{ fontFamily: "Poppins_400Regular", flex: 1, }} placeholder="Username"></TextInput>
                    </View>
                    <View style={[styles.login, { borderColor: email.borderColor, borderWidth: email.border }]}>
                        <Image source={emailIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={email.text} onChangeText={value => setEmail({ ...email, text: value })} style={{ fontFamily: "Poppins_400Regular", flex: 1, }} placeholder="Email"></TextInput>
                    </View>
                    <View style={[styles.login, { borderColor: phone.borderColor, borderWidth: phone.border }]}>
                        <Image source={phoneIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={phone.text} onChangeText={value => setPhone({ ...phone, text: value })} style={{ fontFamily: "Poppins_400Regular", flex: 1, }} placeholder="Phone"></TextInput>
                    </View>
                    <View style={[styles.login, { borderColor: password.borderColor, borderWidth: password.border }]}>
                        <Image source={passIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={password.text} onChangeText={value => setPassword({ ...password, text: value })} style={{ fontFamily: "Poppins_400Regular", flex: 1, }} placeholder="Password"></TextInput>
                    </View>
                    <View style={[styles.login, { borderColor: confirmPassword.borderColor, borderWidth: confirmPassword.border }]}>
                        <Image source={passIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} value={confirmPassword.text} onChangeText={value => setConfirmPassword({ ...confirmPassword, text: value })} style={{ fontFamily: "Poppins_400Regular", flex: 1, }} placeholder="Confirm Password"></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}>Already have an account?</Text>
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("Login") }}>
                            <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 14, color: "#08738A", marginLeft: 5 }}>Login</Text>
                        </TouchableWithoutFeedback>

                    </View>
                </View>

                <View style={styles.checkbox}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        style={{ borderWidth: 1, width: 11, height: 11 }}
                    />
                    <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 12, marginLeft: 9 / windowWidth * 100 * windowWidth / 100 }}>I agree to Terms of Service, Privacy Policy, and IP Policy</Text>
                </View>

                <View style={styles.loginb}>
                    <Text style={{
                        fontSize: 20, fontFamily: "Poppins_700Bold", color: 'white', textAlign: 'center', flex: 1

                    }} onPress={submit}>Submit</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: 'white'
    },
    loginb: {
        height: 44 / windowHeight * 100 * windowHeight / 100,
        width: 232,
        backgroundColor: "#00D1FF",
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 23,
        marginBottom: 48,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 40
    },
    form: {
        flexDirection: 'column',
        alignItems: "center"
    },
    login: {
        flexDirection: 'row',
        backgroundColor: "#F6F6F6",
        marginBottom: 14,
        alignItems: 'center',
        height: 44 / windowHeight * 100 * windowHeight / 100
    },
    header: {
        fontFamily: "Poppins_700Bold",
        color: "#08738A",
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 54
    },
    container: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 52.5
    },
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 44 / windowHeight * 100 * windowHeight / 100,


    }
})