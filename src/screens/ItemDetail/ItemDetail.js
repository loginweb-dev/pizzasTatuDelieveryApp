import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView, ActivityIndicator } from 'react-native';

import Header from '../../components/Header/Header';
import FdFullRoundedOrange from '../../ui/FdButton/FdFullRounded/FdFullRoundedOrange';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartItem from '../../components/CartItem/CartItem';
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { Dimensions } from 'react-native';
import { colors } from '../../utils/colors';
import { verticalScale } from '../../utils/scaling';

const {width, height} = Dimensions.get('window');

const URL_BASE = 'https://delivery.pizzastatu.com/';

class ItemDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialLat : -14.834821,
            initialLon: -64.904159,
            region: {
                latitude: -14.834821,
                longitude: -64.904159,
                latitudeDelta: 0.0422,
                longitudeDelta: width / (height - 130) * 0.0422
            },
            status: this.props.navigation.getParam('status'),
            phone: this.props.navigation.getParam('phone'),
            details: this.props.navigation.getParam('details'),
            address: this.props.navigation.getParam('address'),
            cobro_adicional: this.props.navigation.getParam('cobro_adicional'),
            subtotal: this.props.navigation.getParam('subtotal'),
            descuento: this.props.navigation.getParam('descuento'),
            importe_base: this.props.navigation.getParam('importe_base'),
            submited : false
        };
    }

    componentDidMount(){
        this.setState({
            region: {
                ...this.state.region,
                latitude : parseFloat(this.props.navigation.getParam('lat')),
                longitude : parseFloat(this.props.navigation.getParam('lon')),
            }
        });
    }

    handlePress = (id) => {
        this.setState({submited: true,});
        fetch(`${URL_BASE}api/delivery/pedidos/close/${id}`)
        .then(res => res.json())
        .then( res => {
            this.setState({
                submited: false,
            });
            this.props.navigation.navigate('DeliveryOrders');
        })
    }

    render() {
        return (
            <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                <Header
                    svgNameL="leftArrow"
                    svgNameR="cart"
                    headingTitle = { `Pedido #${this.props.navigation.getParam('id')}` }
                    navigationObj={this.props.navigation}
                />
                
                <View style={[styles.flex, { backgroundColor: 'white' }]}>
                    <ScrollView>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={this.state.region}
                        >
                            <Marker 
                            coordinate={
                                { 
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude
                                }
                            }
                            title="Ubicación del pedido"
                            description={this.state.address}
                            />
                        </MapView>
                        <View style={styles.container_content_view}>
                            <View style={styles.container_content_view_action}>
                                <TouchableOpacity style={ {} } 
                                    onPress={() => Linking.openURL(`tel:${this.state.phone}`)}
                                >
                                    <Text><Icon name="phone" size={verticalScale(50)} style={{ color:colors.primaryOrangeColor }} /></Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.width1_view} />
                            <View style={styles.container_content_view_action}>
                                <TouchableOpacity style={ {} } 
                                    onPress={() => Linking.openURL(`whatsapp://send?text=Su pedido está frente a su domicilio&phone=+591${this.state.phone}`)}
                                >
                                    <Text><Icon name="whatsapp" size={verticalScale(50)} style={{ color:colors.primaryGreenColor }} /></Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.width1_view} />
                            <View style={styles.container_content_view_action}>
                            <TouchableOpacity style={ {} } 
                                    onPress={() => Linking.openURL(
                                        `http://www.google.com/maps/place/${this.state.region.latitude},${this.state.region.longitude}`
                                        )}
                                >
                                <Text><Icon name="map-marker" size={verticalScale(50)} style={{ color: '#2B85EA' }} /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                        {this.state.details.map((data) => (
                            <View key={data.id} style={styles.itemContainer}>
                                <CartItem
                                    id={data.id}
                                    title={data.nombre}
                                    price={data.precio}
                                    image={data.imagen.replace(".", "_small.")}
                                    quantity={data.cantidad}
                                />
                            </View>
                            ))}
                        </View>
                        <View style={styles.reciptContainer}>
                            <View style={styles.contentContainer}>
                                <View style={styles.itemTotalContainer}>
                                    <View style={styles.itemTotalTitle}>
                                        <Text style={styles.itemTotalTitleText}>Costo de envío</Text>
                                    </View>
                                    <View style={styles.itemTotalValue}>
                                        <Text style={styles.itemTotalValueText}>{this.state.cobro_adicional} Bs.</Text>
                                    </View>
                                </View>
                            
                                <View style={styles.itemTotalContainer}>
                                    <View style={styles.itemTotalTitle}>
                                        <Text style={styles.itemTotalTitleText}>Sub Total</Text>
                                    </View>
                                    <View style={styles.itemTotalValue}>
                                        <Text style={styles.itemTotalValueText}>{this.state.subtotal} Bs.</Text>
                                    </View>
                                </View>
                                <View style={styles.itemTotalContainer}>
                                    <View style={styles.itemTotalTitle}>
                                        <Text style={styles.itemTotalTitleText}>Descuento</Text>
                                    </View>
                                    <View style={styles.itemTotalValue}>
                                        <Text style={styles.itemTotalValueText}>{this.state.descuento} Bs.</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.totalContainer}>
                            <View style={styles.itemTotalTitle}>
                                <Text style={styles.TotalText}>Total</Text>
                            </View>
                            <View style={styles.itemTotalValue}>
                                <Text style={styles.TotalTextAmount}>{this.state.importe_base} Bs.</Text>
                            </View>
                        </View>
                        <View style={[styles.checkoutContainer]}>
                        <ActivityIndicator color={colors.primaryOrangeColor} style={{ marginTop: 10, display: this.state.submited ? 'flex' : 'none' }} />
                            <FdFullRoundedOrange
                                onPress={() => this.handlePress(this.props.navigation.getParam('id'))}
                                disabled={this.state.submited || this.state.status == '2'}>
                                Entregado <Icon name="check" color="white" size={25} />
                            </FdFullRoundedOrange>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default ItemDetail;
