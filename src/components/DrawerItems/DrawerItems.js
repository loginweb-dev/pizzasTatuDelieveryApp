import React from 'react';
import {
    Text, StyleSheet, TouchableOpacity, View, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../utils/colors';
import { fontStyles } from '../../utils/fontStyles';

const drawerItems = props => (

    <View style={styles.Flex}>
        <TouchableOpacity
        style={styles.container}
        onPress={props.onPress}
      >
        <View style={styles.leftContainer}>
            <Icon style={{ marginLeft:10 }} name={ props.icon } color={colors.primaryOrangeColor} size={25} />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{props.title}</Text>
          </View>
      </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
    Flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    leftContainer: {
        height: '50%',
        width: '15%',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    rightContainer: {
        height: '80%',
        width: '75%',
        justifyContent: 'center',
    },
    title: {
        fontFamily: fontStyles.PoppinsRegular,
        color: 'black',
        fontSize: 15
    },

});

export default drawerItems;
