import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { AppLoadingProps } from 'expo-app-loading';

const HomeScreen = () => {

  const [fontsLoaded] = useFonts({
    'poppins': require('../../assets/fonts/Poppins-Regular.ttf')
  });

  // if (!fontsLoaded) {
  //   return <AppLoadingProps />
  // }

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.Header}>HomeScreen</Text>
      </View>

    </SafeAreaView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({


})