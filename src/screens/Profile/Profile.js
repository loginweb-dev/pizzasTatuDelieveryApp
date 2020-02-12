import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';

import { verticalScale } from '../../utils/scaling';
import FdIconTextInput from '../../ui/FdIconTextInput/FdIconTextInput';
import FdFullRoundedOrange from '../../ui/FdButton/FdFullRounded/FdFullRoundedOrange';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header/Header';
import Loading from '../../ui/Loanding/Loading';
import Alerta from '../../utils/alert';
import Badge from '../../utils/Badge';
import styles from './styles';
import { colors } from '../../utils/colors';
import { SafeAreaView } from 'react-navigation'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'

const BASE_URL = `https://delivery.pizzastatu.com/`;

// Options ImagePicker
const optionsImagePicker = {
    title: 'Seleccionar Imagen',
    takePhotoButtonTitle: 'Tomar una fotografía',
    chooseFromLibraryButtonTitle: 'Seleccionar de la galeria',
    cancelButtonTitle : 'Cancelar',
    quality: 1,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

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
            address_field: '',
            urlAvatar: '',
            alertErrorMessage: '',
            submited: false,
            load: true,
            alertEdit: false,
            alertColorEdit: ''
        };
    }

    async getUser(){
        const data = await AsyncStorage.getItem('tatuUserDelivery');
        let user = JSON.parse(data);
        let avatar = `${BASE_URL}storage/${user.avatar}`;
        this.setState({
            id_field: user.id,
            empleado_id_field: user.empleado_id,
            name_field: user.name,
            email_field: user.email,
            phone_field: user.phone,
            address_field: user.address,
            urlAvatar: avatar,
            dataUploadAvatar: null,
            load: false
        });
    }

    submit(){
        this.setState({ submited: true });
        fetch(`${BASE_URL}/api/update/profile/delivery`, {
            method: 'POST',
            body: JSON.stringify({
                'id': this.state.id_field,
                'empleado_id': this.state.empleado_id_field,
                'name': this.state.name_field,
                'email': this.state.email_field,
                'phone': this.state.phone_field,
                'address': this.state.address_field,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(res => {
            if(res.error){
                this.setState({alertErrorMessage: res.error, alertColorEdit : 'red', alertEdit: true, submited: false});
            }else{
                let user = {
                    id: res.user.id, empleado_id: res.user.empleado_id, name: res.user.name, email: res.user.email, phone: res.user.movil, address: res.user.direccion, avatar: res.user.avatar
                }
                AsyncStorage.setItem('tatuUserDelivery', JSON.stringify(user));
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
        this.setState({
            alertEdit: false,
        });
        if(this.state.name_field && this.state.phone_field && this.state.email_field){
            if(this.state.phone_field.length===8){
                this.submit();
            }else{
                this.setState({
                    alertErrorMessage: 'Ingrese un número de celular válido.',
                    alertColorEdit: 'red',
                    alertEdit: true,
                });
            }
        }else{
            this.setState({
                alertErrorMessage: 'Al menos ingresa tu nombre, email y celular.',
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

    handleAddressChange = (text) => {
        this.setState({ address_field: text });
    }

    handleChangeAvatar = () => {
        this.setState({
            alertEdit: false,
        });
        ImagePicker.showImagePicker(optionsImagePicker, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    urlAvatar: response.uri,
                    submited: true
                });
                RNFetchBlob.fetch('POST', `${BASE_URL}/api/update/profile/delivery/avatar/${this.state.id_field}`, {
                    Authorization : "Bearer access-token",
                    otherHeader : "foo",
                    'Content-Type' : 'multipart/form-data',
                }, [
                    { name : 'avatar', filename : 'avatar-png.png', type:'image/png', data: response.data},
                ]).then(response => response.json())
                .then(async (res) => {
                    if(res.error){
                        this.setState({alertErrorMessage: res.error, alertColorEdit : 'red', alertEdit: true, submited: false});
                    }else{
                        const data = await AsyncStorage.getItem('tatuUserDelivery');
                        let user = JSON.parse(data);
                        let new_user = {
                            id: user.id, empleado_id: user.empleado_id, name: user.name, email: user.email, phone: user.phone, address: user.address, avatar: res.avatar
                        }
                        AsyncStorage.setItem('tatuUserDelivery', JSON.stringify(new_user));
                        this.setState({alertErrorMessage: res.success, alertColorEdit : 'green', alertEdit: true, urlAvatar: `${BASE_URL}storage/${res.avatar}`,submited: false});
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
          });
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
                                    <TouchableOpacity onPress={() => this.handleChangeAvatar()}>
                                        {/* <Text>Cambiar</Text> */}
                                        <Badge backgroundColor="#4F81EE" color="white">Cambiar <Icon name="upload" /></Badge>
                                    </TouchableOpacity>
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
                                            icon="envelope-open"
                                            on_change_handler={this.handleEmailChange}
                                            placeholder="Email"
                                            value={this.state.email_field}
                                            type='email-address'
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
                                            icon="map-signs"
                                            on_change_handler={this.handleAddressChange}
                                            placeholder="Dirección"
                                            value={this.state.address_field}
                                            multiline={true}
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