import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

import { authenticate } from './actions/auth';

const StartupScreen = (props) => {

    useEffect(() => {
        const dispatch = useDispatch();
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;

            const expirationDate = new Date(expiryDate);

            if(expiryDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = expirationTime.getTime() = new Date().getTime();
            props.navigation.navigate('Products');
            dispatch(authenticate(userId, token, expirationTime));
        }

        tryLogin();
    }, []);
    return (
    <View style={styles.center}>
        <ActivityIndicator size={large} color={Colors.primary}/>
    </View>
  )
};

const styles = StyleSheet.create({
    center: {   
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen;
