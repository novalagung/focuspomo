
import * as React from 'react';
import {View, Text, TextInput, Button, Alert, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {create} from 'zustand'
import BackgroundTimer from '@boterop/react-native-background-timer';
import {useEffect, useRef} from "react";
import Icon from "@react-native-vector-icons/fontawesome6";

const convertDurationHmToSeconds = (text) => {
    let duration = 0
    const parts = text.split(":")
    if (parts.length > 0) {
        duration = parseInt(parts[0]) * 60
    }
    if (parts.length > 1) {
        duration += parseInt(parts[1])
    }
    return duration
}

const convertDurationSecondsToHm = (duration) => {
    let remainingSeconds = duration%60
    if (remainingSeconds < 10) {
        remainingSeconds = `0${remainingSeconds}`
    }
    if (duration > 60) {
        return `${parseInt(Math.floor(duration/60))}:${remainingSeconds}`
    } else {
        return `00:${remainingSeconds}`
    }
}

const useSessionStore = create((set) => ({
    tag: 'Study',
    focusDurationLabel: '00:15', // '25:00',
    focusDuration: 15, // 25 * 60,
    shortBreakDurationLabel: '00:10', // '05:00',
    shortBreakDuration: 10, // 3 * 60,
    longBreakDurationLabel: '00:07', // '25:00',
    longBreakDuration: 7, // 25 * 60,

    activeSessionActivity: 'inactive', // focus / short break / long break
    activeStopwatch: 0,
    focusRepeatCount: 3,
    focusCompleted: 0,

    showModal: ''
}))

function SessionScreen() {
    const tag = useSessionStore((state) => state.tag)
    const focusDurationLabel = useSessionStore((state) => state.focusDurationLabel)
    const focusDuration = useSessionStore((state) => state.focusDuration)
    const shortBreakDurationLabel = useSessionStore((state) => state.shortBreakDurationLabel)
    const shortBreakDuration = useSessionStore((state) => state.shortBreakDuration)
    const longBreakDurationLabel = useSessionStore((state) => state.longBreakDurationLabel)
    const longBreakDuration = useSessionStore((state) => state.longBreakDuration)
    const activeSessionActivity = useSessionStore((state) => state.activeSessionActivity)
    const activeStopwatch = useSessionStore((state) => state.activeStopwatch)
    const focusRepeatCount = useSessionStore((state) => state.focusRepeatCount)
    const focusCompleted = useSessionStore((state) => state.focusCompleted)
    const activeSessionActivityRef = useRef(activeSessionActivity)
    const showModal = useSessionStore((state) => state.showModal)

    const setFocusDurationLabel = (text) => {
        useSessionStore.setState({
            focusDurationLabel: text,
            focusDuration: convertDurationHmToSeconds(text),
        })
    }

    const startFocus = () => {
        console.log('start focus')
        useSessionStore.setState({
            activeSessionActivity: 'focus',
            activeStopwatch: focusDuration,
        })
    }

    const pauseFocus = () => {
        console.log('pause focus')
        useSessionStore.setState({
            activeSessionActivity: 'pause'
        })
    }

    const startShortBreak = () => {
        useSessionStore.setState({
            activeSessionActivity: 'short break',
            activeStopwatch: shortBreakDuration,
            shortBreakDurationLabel: shortBreakDurationLabel,
            focusCompleted: focusCompleted + 1,
        })
        // useSessionStore.setState({
        //     showModal: 'after focus'
        // })
        // setTimeout(() => {
        //     useSessionStore.setState({showModal: ''})
        // }, 2000)
    }

    const startLongBreak = () => {
        useSessionStore.setState({
            activeSessionActivity: 'long break',
            activeStopwatch: longBreakDuration,
            longBreakDurationLabel: longBreakDurationLabel,
            focusCompleted: focusCompleted + 1,
        })
    }

    const resumeFocus = (activityName) => {
        console.log('resume activity', activityName)
        useSessionStore.setState({
            activeSessionActivity: activityName,
        })
        setTimeout(startTimer, 100)
    }

    const stopActivity = () => {
        console.log('stop activity')
        useSessionStore.setState({
            activeSessionActivity: 'inactive',
        })

        // TODO: record activity here
    }

    const startTimer = () => {
        console.log('activeSessionActivityRef.current', activeSessionActivityRef.current, activeStopwatch)
        if (activeStopwatch === null || activeStopwatch === false) {
            return
        }
        if (activeSessionActivityRef.current === 'pause') {
            return
        }

        const nextTime = activeStopwatch - 1
        if (nextTime >= 0) {
            console.log('===> countdown', nextTime, activeSessionActivityRef.current, focusCompleted)
            useSessionStore.setState({
                activeStopwatch: nextTime
            })
        } else {
            if (activeSessionActivityRef.current === 'focus' && focusCompleted < (focusRepeatCount-1)) {
                console.log('===> start short break', nextTime, activeSessionActivityRef.current, focusCompleted)
                startShortBreak()
            } else if (activeSessionActivityRef.current === 'focus' && focusCompleted >= (focusRepeatCount-1)) {
                console.log('===> start long break', nextTime, activeSessionActivityRef.current, focusCompleted)
                startLongBreak()
            } else if (activeSessionActivityRef.current === 'short break') {
                console.log('===> start focus again', nextTime, activeSessionActivityRef.current, focusCompleted)
                startFocus()
            } else if (activeSessionActivityRef.current === 'long break') {
                console.log('===> stop everything', nextTime, activeSessionActivityRef.current, focusCompleted)
                stopActivity()
            }
        }
    }

    useEffect(() => {
        activeSessionActivityRef.current = activeSessionActivity;
    }, [activeSessionActivity]);

    useEffect(() => {
        setTimeout(startTimer,  1000);
    }, [activeStopwatch])

    if (showModal === 'after focus') {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Modal
                        animationType="slide"
                        visible={true}
                        onRequestClose={() => { useSessionStore.setState({showModal: ''}) }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                            <TouchableOpacity onPress={() => { useSessionStore.setState({showModal: ''}) }}>
                                <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000' }}>
                                    <Text>Hello World!</Text>
                                    <Text>Tap to dismiss</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    } else if (activeSessionActivity === 'inactive') {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[stylesBase.container, stylesInactive.container]}>
                    <Text style={stylesInactive.tag} fontSize={"16"} onPress={() => { Alert.alert("CHAGNE TAG") }}>
                        {tag} <Icon name="tag" size={16} iconStyle="solid" />
                    </Text>
                    <TextInput style={[stylesBase.timer, stylesInactive.timer]} value={focusDurationLabel} onChangeText={setFocusDurationLabel}></TextInput>
                    <TouchableOpacity style={stylesBase.buttonContainer} onPress={startFocus}>
                        <Text style={stylesBase.buttonText}>Start Focus</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    } else if (activeSessionActivity === 'focus') {
        const focusCompleted = useSessionStore.getState().focusCompleted
        return (
            <SafeAreaProvider>
                <SafeAreaView style={stylesBase.container}>
                    <Modal
                        animationType={"none"}
                        visible={true}>
                        <View style={[stylesBase.container, stylesFocus.container]}>
                            <TouchableOpacity onLongPress={stopActivity} delayLongPress={1000} style={stylesBase.container}>
                                <Text style={stylesFocus.activityName}>{`Focus #${focusCompleted + 1}`}</Text>
                                <Text style={[stylesBase.timer, stylesFocus.timer]}>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                                <TouchableOpacity style={stylesBase.buttonContainer} onPress={pauseFocus}>
                                    <Text style={stylesBase.buttonText}>Pause</Text>
                                </TouchableOpacity>
                                <Text style={stylesFocus.holdInfo}>Hold to stop the session</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    } else if (activeSessionActivity === 'pause') {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={stylesBase.container}>
                    <Modal
                        animationType={"none"}
                        visible={true}>
                        <View style={[stylesBase.container, stylesFocus.container]}>
                            <TouchableOpacity onLongPress={stopActivity} delayLongPress={1000} style={stylesBase.container}>
                                <Text style={stylesFocus.activityName}>
                                    {`Focus is paused`}  <Icon name="hourglass" size={16} iconStyle="regular" color={"white"} />
                                </Text>
                                <Text style={[stylesBase.timer, stylesFocus.timer]}>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                                <TouchableOpacity style={stylesBase.buttonContainer} onPress={() => resumeFocus('focus')}>
                                    <Text style={stylesBase.buttonText}>Resume</Text>
                                </TouchableOpacity>
                                <Text style={stylesFocus.holdInfo}>Hold to stop the session</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }  else if (activeSessionActivity === 'short break') {
        const focusCompleted = useSessionStore.getState().focusCompleted
        return (
            <SafeAreaProvider>
                <SafeAreaView style={stylesBase.container}>
                    <Modal
                        animationType={"none"}
                        visible={true}>
                        <View style={[stylesBase.container, stylesShortBreak.container]}>
                            <TouchableOpacity onLongPress={stopActivity} delayLongPress={1000} style={stylesBase.container}>
                                <Text style={stylesShortBreak.activityName}>{`Short break #${focusCompleted}`}</Text>
                                <Text style={[stylesBase.timer, stylesShortBreak.timer]}>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                                <TouchableOpacity style={stylesBase.buttonContainer} onPress={startFocus}>
                                    <Text style={stylesBase.buttonText}>Stop break</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    } else if (activeSessionActivity === 'long break') {
        const focusCompleted = useSessionStore.getState().focusCompleted
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{`Long break`}</Text>
                <Text>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                { (activeSessionActivity === 'long break') ? (
                    <View>
                        <Button title='Pause' onPress={() => pauseActivity()} />
                    </View>
                ) : (
                    <View>
                        <Button title='Resume' onPress={() => resumeFocus(activeSessionActivity)} />
                        <Button title='Stop' onPress={() => tryToStopActivity()} />
                    </View>
                )}
            </View>
        )
    }
}


const stylesBase = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timer: {
        fontSize: 60,
    },
    buttonContainer: {
        backgroundColor: '#f3f3f3',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cdcdcd',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#5e5e5e'
    }
})

const stylesInactive = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    tag: {
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    timer: {
        marginTop: -18,
        marginBottom: 10,
    },
})

const stylesFocus = StyleSheet.create({
    container: {
        backgroundColor: '#656a40'
    },
    activityName: {
        color: '#ebecdb',
        marginTop: -30,
    },
    timer: {
        color: '#ebecdb',
        marginTop: -2,
        marginBottom: 20,
    },
    holdInfo: {
        color: '#ebecdb',
        position: 'absolute',
        bottom: '18%',
    }
})

const stylesShortBreak = StyleSheet.create({
    container: {
        backgroundColor: '#8d5429'
    },
    activityName: {
        color: '#ebecdb',
        marginTop: -30,
    },
    timer: {
        color: '#ebecdb',
        marginTop: -2,
        marginBottom: 20,
    },
    holdInfo: {
        color: '#ebecdb',
        position: 'absolute',
        bottom: '18%',
    }
})

export default SessionScreen;