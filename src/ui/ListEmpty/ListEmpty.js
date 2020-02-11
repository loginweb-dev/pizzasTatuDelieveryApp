import React from 'react';
import { View, Image, Text } from 'react-native';
import { verticalScale } from '../../utils/scaling';

const ListEmpty = (props) => (
    <View style={ {flex: 1, alignItems: 'center', justifyContent: 'center'} }>
        <Image
            style={{ width: verticalScale(120), height: verticalScale(120)}}
            source={require('../../assets/images/empty_list.png')}
            resizeMode="contain"
        />
        <Text style={{ color:'#aaa', fontSize:verticalScale(20), textAlign: 'center' }}>{props.text}</Text>
    </View>
);

export default ListEmpty;