
import * as React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome6";
import {useNavigation} from "@react-navigation/native";

function ForgotPasswordScreen() {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={style.container}>
            <Text style={style.headerLabel}>Forgot Password</Text>

            <View style={[style.formContainer]}>
                <View style={style.formItem}>
                    <View style={style.formItemLabel}>
                        <Text>Enter your email. We will send the reset password link to your email.</Text>
                    </View>
                    <View style={style.formItemRow}>
                        <Icon name="envelope" size={18} color="#5e5e5e"/>
                        <TextInput placeholder={"Enter your email"} style={style.formItemInput} />
                    </View>
                </View>
            </View>

            <View>
                <Text style={{color: 'white', padding: 14, width: 340, backgroundColor: '#5e5e5e', textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: '#d6d6d6', borderRadius: 24, fontSize: 16, marginBottom: 12}} onPress={goBack}>Request Reset Password</Text>
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

export default ForgotPasswordScreen;