import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';

import { verticalScale } from '../../utils/scaling';
import FdIconTextInput from '../../ui/FdIconTextInput/FdIconTextInput';
import FdFullRoundedOrange from '../../ui/FdButton/FdFullRounded/FdFullRoundedOrange';
import Header from '../../components/Header/Header';
import Loading from '../../ui/Loanding/Loading';
import Alerta from '../../utils/alert';
import styles from './styles';
import { colors } from '../../utils/colors';
import { SafeAreaView } from 'react-navigation'

const BASE_URL = `https://delivery.pizzastatu.com/`;

class Profile extends Component{

    constructor(props) {
        super(props);
        this.getUser();
        this.state = {
            id_field: '',
            cliente_id_field: '',
            name_field: '',
            email_field: '',
            phone_field: '',
            razon_field: '',
            nit_field: '',
            urlAvatar: '',
            alertErrorMessage: '',
            submited: false,
            load: true,
            alertEdit: false,
            alertColorEdit: ''
        };
    }

    async getUser(){
        const data = await AsyncStorage.getItem('tatuUser');
        let user = JSON.parse(data);
        let avatar = `${BASE_URL}storage/${user.avatar}`;
        this.setState({
            id_field: user.id,
            cliente_id_field: user.cliente_id,
            name_field: user.name,
            email_field: user.email,
            phone_field: user.phone,
            razon_field: user.razon_social,
            nit_field: user.nit,
            urlAvatar: avatar,
            load: false
        });
        // alert(JSON.stringify(user))
    }

    submit(){
        this.setState({ submited: true });
        fetch(`${BASE_URL}/api/update/profile`, {
            method: 'POST',
            body: JSON.stringify({
                                    'id': this.state.id_field,
                                    'cliente_id': this.state.cliente_id_field,
                                    'name': this.state.name_field,
                                    'email': this.state.email_field,
                                    'phone': this.state.phone_field,
                                    'razon': this.state.razon_field,
                                    'nit': this.state.nit_field,
                                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(res => {
            // alert(JSON.stringify(res))
            if(res.error){
                this.setState({alertErrorMessage: res.error, alertColorEdit : 'red', alertEdit: true, submited: false});
            }else{
                let user = {
                    id: res.user.id, cliente_id: res.user.cliente_id, name: res.user.name, email: res.user.email, razon_social: res.user.razon_social, nit: res.user.nit, phone: res.user.movil, avatar: res.user.avatar
                }
                AsyncStorage.setItem('tatuCart', '[]');
                AsyncStorage.setItem('tatuUser', JSON.stringify(user));
                this.setState({alertErrorMessage: res.success, alertColorEdit : 'green', alertEdit: true, submited: false});
            }

            setTimeout(()=> this.setState({alertEdit: false}), 2000);
        })
        .catch(error => {
            alert('Ocurrio un error en el servidor. '+error);
            this.setState({ submited: false });
        });
    }

    handle_submit(){
        if(this.state.name_field && this.state.phone_field){
            this.submit();
        }else{
            // alert('Debe ingresar su Email y su Password');
            this.setState({
                            alertErrorMessage: 'Al menos ingresa tu nombre y celular',
                            alertColorEdit: 'red',
                            alertEdit: true,
                            });
        }
    }

    handleNameChange = (text) => {
        this.setState({ name_field: text });
    }

    handleEmailChange = (text) => {
        this.setState({ email_field: text });
    }

    handlePhoneChange = (text) => {
        this.setState({ phone_field: text });
    }

    handleRazonChange = (text) => {
        this.setState({ razon_field: text });
    }

    handleNitChange = (text) => {
        this.setState({ nit_field: text });
    }

    render() {
        if(this.state.load){
            return(
                <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                    <Header
                        svgNameL="leftArrow"
                        svgNameR="cart"
                        headingTitle="Perfil"
                        navigationObj={this.props.navigation}
                    />
                    <Loading />
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                <Header
                    svgNameL="leftArrow"
                    svgNameR="cart"
                    headingTitle="Perfil"
                    navigationObj={this.props.navigation}
                />
                <View style={styles.flex}>
                    <ScrollView>
                        <View style={[styles.container]}>
                            <View style={[styles.profile_body_container]}>
                                <View style={styles.avatar_image_container}>
                                    <Image
                                        style={[styles.avatar_image, {marginTop: verticalScale(0)}]}
                                        source={{ uri: this.state.urlAvatar }}
                                        resizeMode="contain"
                                    />
                                    {/* <TouchableOpacity>
                                        <Text>Cambiar</Text>
                                    </TouchableOpacity> */}
                                </View>
                               
                                <View style={[styles.marginTop20] , {marginTop: 0}}>
                                    <View style={styles.inputContainer}>
                                        <FdIconTextInput
                                            error={this.state.nameError}
                                            icon="user-circle" marginRight={verticalScale(0)}
                                            on_change_handler={this.handleNameChange}
                                            placeholder="Nombre"
                                            value={this.state.name_field}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <FdIconTextInput
                                            error={this.state.phoneError}
                                            icon="mobile-phone" marginRight={verticalScale(0)}
                                            on_change_handler={this.handlePhoneChange}
                                            placeholder="Celular"
                                            value={this.state.phone_field}
                                            type='numeric'
                                        />
                                    </View >
                                    <View style={styles.inputContainer}>
                                        <FdIconTextInput
                                            icon="envelope-open"
                                            on_change_handler={this.handleEmailChange}
                                            placeholder="Email"
                                            value={this.state.email_field}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <FdIconTextInput
                                            error={this.state.razonError}
                                            icon="laptop" marginRight={verticalScale(0)}
                                            on_change_handler={this.handleRazonChange}
                                            placeholder="Razón social"
                                            value={this.state.razon_field}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <FdIconTextInput
                                            error={this.state.nitError}
                                            icon="credit-card" marginRight={verticalScale(0)}
                                            on_change_handler={this.handleNitChange}
                                            placeholder="NIT"
                                            value={this.state.nit_field}
                                            type='numeric'
                                        />
                                    </View>
                                    <View style={[{ margin: verticalScale(30) }]}>
                                        <ActivityIndicator color={colors.primaryOrangeColor} style={{ marginBottom: 10, display: this.state.submited ? 'flex' : 'none' }} />
                                        <FdFullRoundedOrange disabled={this.state.submited} onPress={() => {this.handle_submit()}}>
                                            Actualizar
                                        </FdFullRoundedOrange>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Alerta 
                        bgColor={this.state.alertColorEdit}
                        display={this.state.alertEdit ? 'flex' : 'none'}
                        color="white"
                        content={this.state.alertErrorMessage}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Profile;