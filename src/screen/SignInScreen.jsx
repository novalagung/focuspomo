
import * as React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome6";
import {useNavigation} from "@react-navigation/native";
import useUserStore from "../store/user-store";

function SignInScreen() {
    const navigation = useNavigation();

    const session = useUserStore((state) => state.session);
    const email = useUserStore((state) => state.email);

    const doSetEmail = (text) => {
        useUserStore.setState({email: text});
    }

    const doForgotPassword = () => {
        navigation.navigate('ForgotPassword')
    }

    const doSignIn = () => {
        useUserStore.setState({session: "session"})
        navigation.popTo('BottomStack')
    }

    return (
        <View style={style.container}>
            <Text style={style.headerLabel}>Login</Text>

            <View style={[style.formContainer]}>
                <View style={style.formItem}>
                    <View style={style.formItemLabel}>
                        <Text>Email</Text>
                    </View>
                    <View style={style.formItemRow}>
                        <Icon name="envelope" size={18} color="#5e5e5e"/>
                        <TextInput placeholder={"Enter your email"} style={style.formItemInput} onChangeText={doSetEmail} />
                    </View>
                </View>
                <View style={style.formItem}>
                    <View style={style.formItemLabel}>
                        <Text>Password</Text>
                    </View>
                    <View style={style.formItemRow}>
                        <Icon name="lock" iconStyle="solid" size={18} color="#5e5e5e"/>
                        <TextInput placeholder={"Enter your password"} style={style.formItemInput} secureTextEntry={true} />
                    </View>
                </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
                <Text style={style.loginLink} onPress={doForgotPassword}>Forgot Password?</Text>
            </View>

            <View>
                <Text style={{color: 'white', padding: 14, width: 340, backgroundColor: '#5e5e5e', textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: '#d6d6d6', borderRadius: 24, fontSize: 16, marginBottom: 12}} onPress={doSignIn}>Log In</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    headerLabel: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 30
    },
    formContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    formItem: {
        width: 300,
    },
    formItemLabel: {
        flexDirection: 'row',
        marginBottom: 4
    },
    formItemRow: {
        borderWidth: 1,
        borderColor: '#d6d6d6',
        backgroundColor: '#f3f3f3',
        padding: 1,
        paddingLeft: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    formItemInput: {
        marginLeft: 5
    },
    labelRequired: {
        color: 'red'
    },
    loginLink: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    }
})

export default SignInScreen;