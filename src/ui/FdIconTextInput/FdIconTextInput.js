import React from 'react';
import { View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { verticalScale } from '../../utils/scaling';
import { colors } from '../../utils/colors';
import styles from './styles';

class FdIconTextinput extends React.Component {
    constructor() {
        super();
        this.svg = null;
    }

    render() {
        return (
            <View style={[styles.btnContainer]}>
                <Icon name={this.props.icon} color={colors.fontGreyColor} size={verticalScale(25)} style={{ width:30 }} />
                <TextInput
                    style={[styles.textinput]}
                    placeholderTextColor={colors.fontGreyColor}
                    onChangeText={this.props.on_change_handler}
                    placeholder={this.props.placeholder ? this.props.placeholder : 'Ingrese un valor'}
                    secureTextEntry={!!this.props.isPassword}
                    value={this.props.value !== '' ? this.props.value : ''}
                    autoCapitalize={this.props.autoCapitalize ? this.props.autoCapitalize : 'none'}
                    autoCorrect={false}
                    keyboardType={this.props.type ? this.props.type : 'default'}
                />
          </View>
        );
    }
}


export default FdIconTextinput;
