import React from 'react';
import { Text,  
         StyleSheet,
         View,
         TouchableOpacity,
         Platform
        } from 'react-native';
import { Ionicons } from '@expo/vector-icons';        


const CartItems = (props) => {

    const { title, price, quantity, sum, onRemoveFromCart, trash } = props;

    return (
        <View style={styles.contain}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>QTY: {quantity}</Text>
                <Text style={styles.mainText}>{title.length > 11 ? 
                                                `${title.substring(0, 11)}...` : 
                                                `${title}`}</Text>
            </View>
            <View style={styles.itemData}>
                <Text styles={styles.mainText}>${sum.toFixed(2)}</Text>
                
                {trash && 
                    <TouchableOpacity onPress={onRemoveFromCart} style={styles.deleteButton}>
                    <Ionicons 
                        name={Platform.Os === 'android' ? "md-trash" : "ios-trash"} 
                        size={23}
                        color="red"
                    />
                    </TouchableOpacity>
                }    
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    quantity: {
        fontFamily: 'open-sans',
        color: "#888",
        fontSize: 16,
        marginRight: 8
    },
    
    deleteButton: {
        marginLeft: 10
    }
});

export default CartItems;