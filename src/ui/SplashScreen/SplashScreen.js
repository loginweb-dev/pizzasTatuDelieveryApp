import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import FdFulllogo from '../../ui/FdFullLogo/FdFullLogo';
import { colors } from '../../utils/colors';

const SplashScreen = () => (
    <View style={ {flex: 1, alignContent: 'center', justifyContent: 'center'} }>
        <FdFulllogo />
        <Text style={{ textAlign: 'center', fontSize: 40, marginBottom:10 }}>Tatu Repartidor</Text>
        <Text style={{ position: 'relative', bottom: 5, left: 0, textAlign: 'center', fontSize: 15, marginBottom:20 }}>Powered by LoginWeb</Text>
        <ActivityIndicator size="large" color={colors.primaryOrangeColor} />      
    </View>
);

export default SplashScreen;