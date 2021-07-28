import React from 'react';
import { Text, 
         Image, 
         StyleSheet,
         View,
         Button,
         TouchableOpacity,
         TouchableNativeFeedback,
         Platform
        } from 'react-native';
import Colors from '../../constants/Colors'; 

const ProductCard = (props) => {
    let Touch = TouchableOpacity;


    // if(Platform.OS === 'android' && Platform.Version >= 21) {
    //     Touch = TouchableNativeFeedback;
    // }
    const {title, price, image, onViewDetail, onAddToCart, user} = props;

    
        
    return (
            <View style={styles.card}>
                <View style={styles.touchableCmp}>
                    <Touch 
                        onPress={onViewDetail} 
                        useForeground
                        style={{ alignItems: 'center'}} >
                        <Image source={{ uri: image }} style={user ? styles.userImage : styles.image} />

                        <View style={user ? styles.userDecription : styles.descriptionContain}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.price}>${price}</Text>
                        </View>

                        {!user && 
                            <View 
                                style={ styles.buttonsContainer }>
                                <Button color={Colors.primary} title="View Details" onPress={onViewDetail} />
                                <Button color={Colors.primary} title="Add To Cart" onPress={onAddToCart} />
                            </View>
                        }

                    </Touch>
                </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        margin: 20,
        height: 320,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        shadowOpacity: .3,
        elevation: 5,
        borderRadius: 10
        
    },
    touchableCmp: {
        overflow: 'hidden',
        borderRadius: 10,  
    },
    image: {
        width: '100%',
        height: '60%'
    },
    userImage: {
        width: '100%',
        height: '65%'
    },  
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '18%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    descriptionContain: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        width: '85%'
    },
    userDecription: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        width: '85%'
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },
    desc: {
        paddingHorizontal: 12
    }
});

export default ProductCard;