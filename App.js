import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/homeScreen/HomeScreen';
import SplashScreenn from './screen/splashScreen/SplashScreen';
import LoginScreen from './screen/loginScreen/LoginScreen';
import RegisterScreen from './screen/registerScreen/RegisterScreen';
import AccesoriesScreen from './screen/accesoriesScreen/AccesoriesScreen';
import DetailProduct from './screen/detailProduct/DetailProduct';
import PurchaseScreen from './screen/purchaseScreen/PurchaseScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import SeeAllScreen from './screen/seeallScreen/SeeAllScreen';
import  store  from './store';
import { Provider } from 'react-redux'
import Cart from './screen/cartScreen/Cart';
import SearchScreen from './screen/searchScreen/SearchScreen';
const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer >
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreenn} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Accesories" component={AccesoriesScreen} />
          <Stack.Screen name="DetailProduct" component={DetailProduct} />
          <Stack.Screen name="Purchase" component={PurchaseScreen} />
          <Stack.Screen name="SeeAll" component={SeeAllScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}


