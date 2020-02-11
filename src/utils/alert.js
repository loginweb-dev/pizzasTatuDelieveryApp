import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { verticalScale } from '../utils/scaling';

class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ position: 'relative',bottom: 0, left:0, backgroundColor: this.props.bgColor, display: this.props.display, alignItems:'center'}}>
                <Text style={{ color: this.props.color, height: verticalScale(40), fontSize: verticalScale(15), padding: verticalScale(10) }}>{this.props.content}</Text>
            </View>
        );
    }
}

export default Alert;
