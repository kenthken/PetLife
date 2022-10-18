import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'

async function callProductDataAccesories(a, b) {


  await axios.get("http://10.0.2.2:3000/product")
    .then(res => {
      return res.data
    })
    .catch(error => console.log(error))

}

export default callProductDataAccesories