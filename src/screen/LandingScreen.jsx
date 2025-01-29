
import * as React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useNavigation} from "@react-navigation/native";

const backgroundImageUri = 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

function LandingScreen() {
    const navigation = useNavigation();

    const navigateToSignUpScreen = () => {
        navigation.navigate('SignUp')
    }

    const navigateToSignInScreen = () => {
        navigation.navigate('SignIn')
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground source={{uri: backgroundImageUri}} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(228, 219, 206, 0.9)' }}>
                        <Text style={{fontSize: 16,}}>Welcome to</Text>
                        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 30}}>FocusPomo</Text>

                        <Text style={{color: '#5e5e5e', width: '50%', textAlign: 'center', marginBottom: 100}}>The small things you do today will leave a big import on your tomorrows.</Text>

                        <View>
                            <Text style={{color: '#5e5e5e', padding: 14, width: 340, backgroundColor: 'white', textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: '#d6d6d6', borderRadius: 10, fontSize: 16, marginBottom: 12}} onPress={navigateToSignUpScreen}>Sign up a new account</Text>
                        </View>
                        <View>
                            <Text style={{color: '#5e5e5e', padding: 14, width: 340, backgroundColor: 'white', textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: '#d6d6d6', borderRadius: 10, fontSize: 16}} onPress={navigateToSignInScreen}>Sign in into account</Text>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default LandingScreen;