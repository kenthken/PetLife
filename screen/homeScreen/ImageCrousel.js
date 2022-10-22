import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';



const ImageCrousel = (props) => {
    return (
        <View>

            <SliderBox
                images={[props.img1,props.img2,props.img3]}
                sliderBoxHeight={182}   
                autoplay
                circleLoop
                ImageComponentStyle={{
                    borderBottomLeftRadius: 9,
                    borderBottomRightRadius: 9,
                    height: props.height
                }}
            />


        </View>
    )
}
export default ImageCrousel


