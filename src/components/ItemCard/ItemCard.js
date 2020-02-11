import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Text, TouchableOpacity, View, Image, Linking
} from 'react-native';

import Badge from '../../utils/Badge';

import styles from './styles';
import { colors } from '../../utils/colors';
import { verticalScale } from '../../utils/scaling';

class itemCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.flex}>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.container}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imageItem}
                            source={{ uri: this.props.image }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.middleContainer}>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>{this.props.title}</Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text numberOfLines={2} style={styles.desc}>
                                {this.props.detalle.map(detalle => `${detalle.cantidad} ${detalle.nombre}, `)}
                            </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            { this.props.status == '1' ? <Text style={styles.price}>{this.props.created}</Text> : <Badge backgroundColor="red" color="white">Entregado <Icon name="check" /></Badge> }
                        </View>
                    </View>
                    <View style={styles.actionsContainer}>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={ [styles.actionBtnContainer, {borderColor: colors.primaryOrangeColor}] } 
                                onPress={() => Linking.openURL(`tel:${this.props.movil}`)}
                            >
                                <Text style={ {color: colors.primaryOrangeColor}}><Icon name="phone" size={verticalScale(20)} /></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={ [styles.actionBtnContainer, {borderColor: colors.greenColor}] } 
                                onPress={() =>
                                    Linking.openURL(`whatsapp://send?text=Su pedidos está frente a su domicilio&phone=+591${this.props.movil}`)}
                            >
                                <Text style={ {color: colors.greenColor}}><Icon name="whatsapp" size={verticalScale(20)} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default itemCard;
