import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../utils/colors';

const Loading = () => (
    <View style={ {flex: 1, alignContent: 'center', justifyContent: 'center'} }>
        <ActivityIndicator size="large" color={colors.primaryOrangeColor} />
    </View>
);

export default Loading;