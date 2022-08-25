import { Image, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import logo from '../../assets/s.png'
import { StackActions } from "@react-navigation/native";



class SplashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Register'))
        }, 3000)
        this.props.navigation.setOptions({
            headerShown: false
        })
    }

    render() {

        return (
            <View style={styles.background}>
                <Image source={logo} />
            </View>
        )
    }
}

// const SplashScreen = () => {
    
//     useEffect(() => {
        
//         setTimeout(() => {
//             this.props.navigation.dispatch(StackActions.replace('Register'))
//         }, 3000)
//     }, [])

//     return (
//         <View style={styles.background}>
//             <Image source={logo} />
//         </View>
//     )
// }

export default SplashScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#34E1F9",
    }
})