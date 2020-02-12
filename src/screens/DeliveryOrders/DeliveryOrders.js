import React from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Loading from '../../ui/Loanding/Loading';
import ItemCard from '../../components/ItemCard/ItemCard';
import ListEmpty from '../../ui/ListEmpty/ListEmpty';
import styles from './styles';
import { SafeAreaView, NavigationEvents } from 'react-navigation'

const URL_BASE = 'https://delivery.pizzastatu.com/';

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            load: true,
            user:{},
            pedidos : []
        }
    }

    componentDidMount(){
        this.getUser();
        setTimeout(()=>this.getPedidos(), 250);
    }

    async getUser(){
        const data = await AsyncStorage.getItem('tatuUserDelivery');
        this.props.setUser(JSON.parse(data));
        this.setState({user:JSON.parse(data)});
    }

    getPedidos = () => {
        fetch(`${URL_BASE}api/delivery/pedidos/lista/${this.state.user.id}`)
        .then(res => res.json())
        .then( res => {
            this.setState({
                pedidos: res.pedidos,
                load: false,
            });
        })
    }

    handlePress = (id, status, phone, details, lat, lon, address, cobro_adicional, subtotal, descuento, importe_base) => {
        this.props.navigation.navigate('ItemDetail', {id, status, phone, details, lat, lon, address, cobro_adicional, subtotal, descuento, importe_base})
    }

    render() {
        if(this.state.load){
            return(
                <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                    <Header
                        svgNameL="menu"
                        svgNameR="cart"
                        headingTitle="Pedidos"
                        navigationObj={this.props.navigation}
                    />
                    <Loading />
                </SafeAreaView>
            );
        }
        
        if(this.state.pedidos.length == 0){
            return(
                <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                    <Header
                        svgNameL="menu"
                        svgNameR="cart"
                        headingTitle="Pedidos"
                        navigationObj={this.props.navigation}
                    />
                    <ListEmpty text="No tiene pedidos pendientes" />
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                <Header
                    svgNameL="menu"
                    svgNameR="cart"
                    headingTitle="Pedidos"
                    navigationObj={this.props.navigation}
                />
                <View style={[styles.flex, { backgroundColor: 'white' }]}>
                    <View style={styles.flex}>
                        <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
                            {this.state.pedidos.map((data) => (
                                <View key={data.id} style={styles.cardViewContainer}>
                                    <ItemCard
                                        onPress={
                                            () => this.handlePress(data.id, data.estado, data.movil, data.detalle, data.location.lat, data.location.lon, data.location.descripcion, data.cobro_adicional ? data.cobro_adicional : 0, data.subtotal, data.descuento ? data.descuento : 0, data.importe_base)
                                        }
                                        id={data.id}
                                        status={data.estado}
                                        title={`#${data.id} - ${data.name}`}
                                        movil={data.movil}
                                        detalle={data.detalle}
                                        created={data.created_at}
                                        image={ data.avatar.charAt(0) === 'h' ? `${data.avatar}?type=normal` : `${URL_BASE}storage/${data.avatar}` }
                                    />
                                </View>
                              )
                            )}
                        </ScrollView>
                    </View>
                </View>
                <NavigationEvents
                    onDidFocus={() => this.getPedidos()}
                />
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch({
            type: 'SET_USER',
            payload: user
        }),
    }
}

export default connect(null, mapDispatchToProps)(Menu);
