import { View, Text, Modal } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
const NotAvailableFeatures = (props) => {
    const navigation = useNavigation()
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
    return (
        <Modal transparent={props}
            visible={props}>
            <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: "#ffffff", alignItems: 'center', paddingHorizontal: 20, width: '72%', height: '40%', justifyContent: 'center', borderRadius: 10 }}>
                    <MaterialIcons name="cancel" size={24} color="black" style={{ marginBottom: 15 }}/>
                    {/* <AntDesign name="checkcircle" size={50} color="#42FF00" style={{ marginBottom: 15 }} /> */}
                    <Text style={{ color: "#C4C4C4", fontSize: 20, fontFamily: "Poppins_700Bold", marginBottom: 10 }}>Successful!</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 13, marginBottom: 30 }}>Your account has been registered</Text>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: '80%', height: '17%', backgroundColor: "#42FF00", justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
                            <Text style={{ color: "white", fontFamily: "Poppins_700Bold", fontSize: 20 }}>Login</Text>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Modal>
    )
}

export default NotAvailableFeatures