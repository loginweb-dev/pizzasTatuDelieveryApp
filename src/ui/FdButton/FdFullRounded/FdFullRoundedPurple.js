import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Purple_Btn_Styles as Styles } from './styles';

const FdFullRoundedPurple = props => (
    <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={0.5}
        style={[Styles.RContainer]}
        onPress={props.onPress}
    >
        <Text style={Styles.Text}>
            {props.children}
        </Text>
    </TouchableOpacity>

);

export default FdFullRoundedPurple;
