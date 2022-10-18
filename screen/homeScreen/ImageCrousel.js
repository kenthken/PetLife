import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box';
import { StyleSheet } from 'react-native-web';

import img2 from '../../assets/homeIcon/image-59.png'
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
// export default class ImageCrousel extends Component {
//     // constructor(props) {
//     //     super(props)
//     //     this.state = {
//     //         images: [
//     //             require(this.props.img1),
//     //             require(this.props.img2),
//     //             require(this.props.img3),
//     //         ]
//     //     }
//     // }
//     render() {
//         this.state = (props) => {
//             images: [
//                 props.img1,
//                 props.img2,
//                 props.img3,
//                 props.img4
//             ]
//         }
//         return (
//             <View>

//                 <SliderBox
//                     images={this.state.images}
//                     sliderBoxHeight={181}
//                     autoplay
//                     circleLoop
//                     ImageComponentStyle={{
//                         borderBottomLeftRadius: 9,
//                         borderBottomRightRadius: 9,
//                     }}
//                 />


//             </View>
//         )
//     }
// }

