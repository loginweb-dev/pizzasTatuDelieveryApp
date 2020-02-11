import React from 'react';
import { Text } from 'react-native';

const Badge = (props) => {
    return(
        <Text style={{ 
                        backgroundColor: props.backgroundColor,
                        color: props.color,
                        borderRadius: 3,
                        width: 90,
                        padding:3,
                        margin: 2 }}
        >{props.children}</Text>
    )
}

export default Badge;