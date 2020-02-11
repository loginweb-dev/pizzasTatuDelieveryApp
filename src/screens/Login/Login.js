import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';


// Template
import { verticalScale } from '../../utils/scaling';
import FdIconTextInput from '../../ui/FdIconTextInput/FdIconTextInput';
import FdFulllogo from '../../ui/FdFullLogo/FdFullLogo';
import FdFullRoundedOrange from '../../ui/FdButton/FdFullRounded/FdFullRoundedOrange';
import styles from './styles';
import { colors } from '../../utils/colors';
import { SafeAreaView } from 'react-navigation'

import AwesomeAlert from 'react-native-awesome-alerts';

class Login extends Component{

    constructor() {
        super();
        this.state = {
            email_field: '',
            password_field: '',
            alertErrorLogin: false,
            alertErrorMessage: '',
            submited: false,
            loginFB: false,
        };
    }

    submit(){
        this.setState({ submited: true });
        fetch('https://delivery.pizzastatu.com/api/login/delivery', {
            method: 'POST',
            body: JSON.stringify({'email': this.state.email_field, 'password': this.state.password_field}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(res => {
            if(res.error){
                this.setState({alertErrorMessage: res.error, submited: false});
                this.showAlertErrorLogin();
            }else{
                let user = {
                    id: res.id, cliente_id: res.cliente_id, name: res.name, email: res.email, razon_social:res.razon_social, nit: res.nit, phone: res.movil, avatar: res.avatar
                }
                AsyncStorage.setItem('isLoggedIn', '1');
                AsyncStorage.setItem('tatuCart', '[]');
                AsyncStorage.setItem('tatuUser', JSON.stringify(user));
                this.props.navigation.navigate('DeliveryOrders'); 
            }
        })
        .catch(error => {
            alert('Ocurrio un error en el servidor. '+error);
            this.setState({ submited: false });
        });
    }

    handle_submit(){
        if(this.state.email_field && this.state.password_field){
            this.submit();
        }else{
            this.setState({alertErrorMessage: 'Debe ingresar su Email y su Password'});
            this.hideAlertErrorLogin();
        }
    }

    handlephoneChange = (text) => {
        this.setState({ email_field: text });
    }

    handlePasswordChange = (text) => {
        this.setState({ password_field: text });
    }

    // Alertas
    showAlertErrorLogin = () => {
        this.setState({
            alertErrorLogin: true
        });
    };

    hideAlertErrorLogin = () => {
        this.setState({
            alertErrorLogin: false
        });
    };

    render() {
        return (
            <SafeAreaView forceInset={{ top: 'always' }} style={styles.flex}>
                <View style={styles.flex}>
                    <View style={[styles.container, styles.marginTop50]}>
                        <View style={styles.backArrowContainer}>
                        </View>
                        <View style={[styles.login_body_container]}>
                            <FdFulllogo />
                            <View style={[styles.marginTop20] , {marginTop: 0}}>
                                <View style={styles.inputContainer}>
                                    <FdIconTextInput
                                        icon="envelope-o"
                                        on_change_handler={this.handlephoneChange}
                                        placeholder="Usuario"
                                        value={this.state.email_field}
                                        type='email-address'
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <FdIconTextInput
                                        icon="key"
                                        isPassword="True"
                                        height={verticalScale(24)}
                                        width={verticalScale(25)}
                                        marginRight={verticalScale(8)}
                                        on_change_handler={this.handlePasswordChange}
                                        placeholder="Contraseña"
                                        value={this.state.password_field}
                                    />
                                </View>
                            </View>
                            <View style={[styles.lower_form, styles.marginBtm20]}>
                                <ActivityIndicator color={colors.primaryOrangeColor} style={{ marginTop: 10, display: this.state.submited ? 'flex' : 'none' }} />
                                <FdFullRoundedOrange disabled={this.state.submited} onPress={() => {this.handle_submit()}}>
                                    Iniciar sesión   
                                </FdFullRoundedOrange>
                            </View>
                        </View>

                    </View>
                    <AwesomeAlert
                        show={this.state.alertErrorLogin}
                        showProgress={false}
                        title="Error"
                        message={this.state.alertErrorMessage}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="Entendido"
                        confirmButtonColor="#DD6B55"
                        onConfirmPressed={() => {
                            this.hideAlertErrorLogin();
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}


export default Login;