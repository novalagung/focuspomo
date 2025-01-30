
import * as React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Icon from "@react-native-vector-icons/fontawesome6";

function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.rowHeaderText}>Sessions</Text>
            <View style={styles.row}>
                <Text>Session duration</Text>
                <View style={styles.highlightedButton}><Text>30 min</Text></View>
            </View>
            <View style={styles.row}>
                <Text>Break duration</Text>
                <View style={styles.highlightedButton}><Text>5,3 min</Text></View>
            </View>
            <View style={styles.row}>
                <Text>Session cycles</Text>
                <Icon iconStyle={"solid"} name={"lock"} />
            </View>
            <View style={styles.row}>
                <Text>Start breaks automatically</Text>
                <Switch thumbColor={'white'} style={{marginRight: -13}} />
            </View>
            <View style={styles.row}>
                <Text>Start session automatically</Text>
                <Switch thumbColor={'white'} style={{marginRight: -13}} />
            </View>

            <Text style={[styles.rowHeaderText, {marginTop: 10}]}>General</Text>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"regular"} name={"bell"} style={{width: 18, textAlign: 'center'}} />
                    <Text> Notification</Text>
                </View>
                <Switch thumbColor={'white'} style={{marginRight: -13}} />
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"hourglass-start"} style={{width: 18, textAlign: 'center'}} />
                    <Text> Metronome</Text>
                </View>
                <Switch thumbColor={'white'} style={{marginRight: -13}} />
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"calendar"} style={{width: 18, textAlign: 'center'}} />
                    <Text> Sync to Calendar</Text>
                </View>
                <Icon iconStyle={"solid"} name={"lock"} />
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"lock"} style={{width: 18, textAlign: 'center'}} />
                    <Text> Commitment Mode</Text>
                </View>
                <Icon iconStyle={"solid"} name={"lock"} />
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"shield"} style={{width: 18, textAlign: 'center'}} />
                    <Text> App Blocker</Text>
                </View>
                <Icon iconStyle={"solid"} name={"lock"} />
            </View>

            <Text style={[styles.rowHeaderText, {marginTop: 10}]}>About</Text>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"circle-info"} style={{width: 18, textAlign: 'center'}} />
                    <Text> About us</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"circle-question"} style={{width: 18, textAlign: 'center'}} />
                    <Text> How it works</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"star"} style={{width: 18, textAlign: 'center'}} />
                    <Text> Rate the app</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon iconStyle={"solid"} name={"chalkboard-user"} style={{width: 18, textAlign: 'center'}} />
                    <Text> Feedback & Support</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    rowHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
        paddingTop: 5,
        paddingBottom: 5
    },
    highlightedButton: {
        backgroundColor: '#f3f3f3',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4
    }
})

export default Settings;