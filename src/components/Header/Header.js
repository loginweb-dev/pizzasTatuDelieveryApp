import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';
import { verticalScale } from '../../utils/scaling';
import Icon from 'react-native-vector-icons/FontAwesome';

import { fontStyles } from '../../utils/fontStyles';
import { colors } from '../../utils/colors';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const svg_urls = {
    // menu: require('../../assets/images/menu-button.png'),
    leftArrow: require('../../assets/images/leftarrow.png'),
    // cart: require('../../assets/images/shopping-cart.png'),
};

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    renderLeftIcon = () => {
        let LeftEl = null;
        if (this.props.svgNameL == 'menu') {
            LeftEl = (
                <TouchableOpacity
                    onPress={() => this.props.navigationObj.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Icon name='navicon' color={colors.fontGreyColor} size={verticalScale(40)} />
                    {/* <Image
                        source={svg_urls[this.props.svgNameL]}
                        style={{ width: verticalScale(25), height: verticalScale(25) }}
                        resizeMode="contain"
                    /> */}
                </TouchableOpacity>
            );
        } else if (this.props.svgNameL == 'leftArrow') {
            LeftEl = (
                <TouchableOpacity
                    onPress={() => this.props.navigationObj.goBack()}
                >
                    <Image
                        source={svg_urls[this.props.svgNameL]}
                        style={{ width: verticalScale(30), height: verticalScale(30) }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            );
        }
        return LeftEl;
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.mainContainer}>
                    <View style={styles.subContainer}>
                        {this.renderLeftIcon()}
                        <Text style={styles.headingTitle}>{this.props.headingTitle}</Text>
                        <TouchableOpacity
                            style={styles.relativeContainer}
                        >
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}></View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: height*.1,
        backgroundColor: 'white',
        // marginTop: -(StatusBar.currentHeight )
    },
    subContainer: {
        alignSelf: 'center',
        width: '95%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: colors.lightGrayColor
    },
    headingTitle: {
        fontSize: verticalScale(25),
        fontFamily: fontStyles.PoppinsRegular,
        color: 'black'
    },
    relativeContainer: {
        position: 'relative'
    },
    absoluteContainer: {
        width: verticalScale(20),
        height: verticalScale(20),
        backgroundColor: colors.greenColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: verticalScale(10),
        position: 'absolute',
        right: 0,
        top: verticalScale(25),
    },
    textAbsoluteContainer: {
        color: 'white',
        fontSize: verticalScale(15),
        fontFamily: fontStyles.PoppinsRegular
    }

});

export default Header;
