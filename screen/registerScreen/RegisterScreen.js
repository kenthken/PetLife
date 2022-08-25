import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
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
import CheckBox from 'expo-checkbox';



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const SubmitButton = () =>{
        navigation.navigate('Login')
    }
    useEffect(() => {
        console.log(windowHeight)
        console.log(windowWidth)
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
        return null;
    }



    return (
        <SafeAreaView style={styles.safearea}>

            <View style={styles.container}>
                <Text style={styles.header}>Register</Text>

                <View style={styles.form}>
                    <View style={styles.login}>
                        <Image source={accountIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} style={{ fontFamily: "Poppins_400Regular", flex: 1, }} placeholder='Username'></TextInput>
                    </View>
                    <View style={styles.login}>
                        <Image source={emailIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} style={{ fontFamily: "Poppins_400Regular", flex: 1 }} placeholder='E-mail'></TextInput>
                    </View>
                    <View style={styles.login}>
                        <Image source={phoneIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} style={{ fontFamily: "Poppins_400Regular", flex: 1 }} placeholder='Phone'></TextInput>
                    </View>
                    <View style={styles.login}>
                        <Image source={passIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} style={{ fontFamily: "Poppins_400Regular", flex: 1 }} placeholder='Password'></TextInput>
                    </View>
                    <View style={styles.login}>
                        <Image source={passIcon} style={{ width: 18, height: 18, marginLeft: 9, marginRight: 20 }} />
                        <TextInput spellCheck={false}
                            autoCorrect={false} style={{ fontFamily: "Poppins_400Regular", flex: 1 }} placeholder='Confirm Password'></TextInput>
                    </View>
                </View>

                <View style={styles.checkbox}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        style={{ borderWidth: 1, width: 11, height: 11 }}
                    />
                    <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 10, marginLeft: 9 / windowWidth * 100 * windowWidth / 100 }}>I agree to Terms of Service, Privacy Policy, and IP Policy</Text>
                </View>

                <View style={styles.loginb}>
                    <Text style={{
                        fontSize: 20, fontFamily: "Poppins_700Bold", color: 'white', textAlign: 'center', flex: 1

                    }} onPress={SubmitButton}>Submit</Text>
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
        width: 232 ,
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