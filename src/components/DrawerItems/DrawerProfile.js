import React, { Component } from 'react';
import {
    Text, StyleSheet, View, Image, AsyncStorage
} from 'react-native';
import { fontStyles } from '../../utils/fontStyles';
import { colors } from '../../utils/colors';
import { verticalScale } from '../../utils/scaling';

const URL_BASE = `https://delivery.pizzastatu.com/storage/`;

class drawerProfile extends Component{
    constructor(props) {
        super(props);
        this.bootstrapAsync();
        this.state = {
            name: '',
            phone: '',
            avatar: ''
        }
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        const data = await AsyncStorage.getItem('tatuUser');
        let user = JSON.parse(data);
        this.setState({name: user.name, phone: user.phone, avatar: user.avatar});
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image
                        style={styles.img}
                        source={{ uri: this.state.avatar.search('https://') ? `${URL_BASE}${this.state.avatar}` : this.state.avatar  }}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{this.state.name}</Text>
                    <Text style={styles.description}>{this.state.phone}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.lightGrayColor,
    },
    leftContainer: {
        width: '30%',
        height: '70%',
        marginRight: verticalScale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: verticalScale(70),
        height: verticalScale(70),
        borderRadius: verticalScale(35),
        borderWidth: verticalScale(1),
        borderColor: colors.lightGrayColor,
    },
    rightContainer: {
        width: '60%',
        height: '30%',
    },
    title: {
        fontFamily: fontStyles.PoppinsRegular,
        color: 'black',
        fontSize: verticalScale(18),
    },
    description: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(12),
        color: colors.orangeColor,
    },
});

export default drawerProfile;
