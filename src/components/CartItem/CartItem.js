import React from 'react';
import {
    Text, TouchableOpacity, View, Image,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

const URL_BASE = 'https://delivery.pizzastatu.com/';

class CartItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.imageRes}
                            source={{ uri: `${URL_BASE}storage/${this.props.image}` }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{this.props.quantity} {this.props.title}</Text>
                        </View>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                            {parseFloat(this.props.price*this.props.quantity).toFixed(2)} Bs.
                        </Text>
                    </View>
                </View>
            </View>
        );

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeItemToCart : (product) => dispatch({
            type: 'CHANGE_TO_CART',
            payload: product
        })
    }
}

export default connect(null, mapDispatchToProps)(CartItem);

// export default CartItem;
