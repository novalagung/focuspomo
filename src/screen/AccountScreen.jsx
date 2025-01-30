
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome6";
import CheckBox from '@react-native-community/checkbox';
import useUserStore from "../store/user-store";
import {useNavigation} from "@react-navigation/native";

function AccountScreen() {
    const navigation = useNavigation();
    const goToSettings = () => {
        navigation.navigate('Settings');
    }
    const doLogout = () => {
        useUserStore.setState({session: ''})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{textAlign: 'right'}}>Pro Upgrade&nbsp; </Text><Icon name={"gear"} iconStyle={"solid"} size={16} onPress={goToSettings} />
            </View>
            <View style={styles.line} />
            <View style={{padding: 20, paddingTop: 0}}>
                <Text style={{fontWeight: 'bold', marginBottom: 20, fontSize: 18}}>You are now on level 3!</Text>
                <View style={{backgroundColor: '#cdcdcd', height: 6, marginBottom: 5}}>
                    <View style={{backgroundColor: '#98aa38', height:'100%', width: 120}}></View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>37/100</Text>
                        <Text> to level up</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>49 XP</Text>
                        <Text> to level up</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{backgroundColor: '#f3f3f3', borderColor: '#e5e5e5', borderWidth: 1, padding: 20, justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: 6}}>
                        <Icon name={"ribbon"} iconStyle={"solid"} size={56} color={"#f3c321"} />
                        <Text style={{marginTop: 5}}>Badges of Honor</Text>
                    </View>
                    <View style={{backgroundColor: '#f3f3f3', borderColor: '#e5e5e5', borderWidth: 1, padding: 20, justifyContent: 'center', alignItems: 'center', flex: 1, marginLeft: 10, borderRadius: 6}}>
                        <Icon name={"bullseye"} iconStyle={"solid"} size={56} color={"#a44f47"} />
                        <Text style={{marginTop: 5}}>Badges of Honor</Text>
                    </View>
                </View>
                <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 16}}>Daily challenges</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        disabled={false}
                        value={true}
                    />
                    <Text>Finish 1 session cycle</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        disabled={false}
                        value={false}
                    />
                    <Text>Finish 2 sessions without interruptions</Text>
                </View>
                <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 16}}>Weekly challenges</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        disabled={false}
                        value={false}
                    />
                    <Text>Finish 6 cycles without interruptions</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        disabled={false}
                        value={false}
                    />
                    <Text>Finish 10 session cycles</Text>
                </View>
                <View style={styles.line} />
                <Text style={{textAlign: 'center', fontWeight: 'bold'}} onPress={doLogout}>Log out</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 19,
        paddingRight: 19
    },
    line: {
        display: 'block',
        width: '100%',
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    }
})

export default AccountScreen;