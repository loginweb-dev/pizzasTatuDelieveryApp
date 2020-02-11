import React, { Component } from 'react';
import { View, AsyncStorage, Linking } from 'react-native';

import SideDrawerItems from '../DrawerItems/DrawerItems';
import SideDrawerProfile from '../DrawerItems/DrawerProfile';
import styles from './styles';

const datas = [
    // {
    //     title: 'Pedidos asignados',
    //     icon: 'list-ul',
    //     navigateTo: 'MyOrders',
    // },
    {
        title: 'Perfil',
        icon: 'user-circle',
        navigateTo: 'Profile',
    },
];


class SidebBar extends Component {
    constructor(props){
        super(props);
    }

    logout(){
        AsyncStorage.setItem('isLoggedIn', '0');
        setTimeout(()=>{
            this.props.navigation.navigate('Login')
        }, 300);
    }

    render() {
        return (
            <View style={styles.Flex}>
                <View style={styles.topContainer}>
                    <SideDrawerProfile />
                </View>
                <View style={styles.botContainer}>
                    {
                        datas.map((data, ind) => (
                        <View
                            key={ind}
                            style={styles.item}
                          >
                            <SideDrawerItems
                                  onPress={() => this.props.navigation.navigate(data.navigateTo)}
                                  icon={data.icon}
                                  title={data.title}
                                />
                          </View>
                        ))
                    }
                    <View style={styles.item}>
                        <SideDrawerItems
                            onPress={() => {
                                Linking.openURL(
                                  `http://api.whatsapp.com/send?text=Quiero reportar un problema&phone=59175199157`
                                );
                            }}
                            icon='whatsapp'
                            title='Reportar problema'
                        />
                    </View>
                    {/* Boton de cerrar sesión */}
                    <View style={styles.item}>
                        <SideDrawerItems
                            onPress={() => this.logout()}
                            icon='share-square-o'
                            title='Salir'
                        />
                    </View>
                </View>
          </View>
        );
    }
}

export default SidebBar;
