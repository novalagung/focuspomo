
import * as React from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {create} from 'zustand'
import BackgroundTimer from '@boterop/react-native-background-timer';
import {useEffect} from "react";

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
    focusDurationLabel: '00:05', // '25:00',
    focusDuration: 5, // 25 * 60,
    shortBreakDurationLabel: '00:03', // '05:00',
    shortBreakDuration: 3, // 3 * 60,
    longBreakDurationLabel: '00:07', // '25:00',
    longBreakDuration: 7, // 25 * 60,

    activeSessionActivity: 'inactive', // focus / short break / long break
    activeStopwatch: 0,
    focusRepeatCount: 3,
    focusCompleted: 0,
}))

function SessionScreen() {
    const [stopwatch, setStopwatch] = React.useState(false)
    const tag = useSessionStore((state) => state.tag)
    const focusDuration = useSessionStore((state) => state.focusDuration)
    const focusDurationLabel = useSessionStore((state) => state.focusDurationLabel)
    const shortBreakDuration = useSessionStore((state) => state.shortBreakDuration)
    const shortBreakDurationLabel = useSessionStore((state) => state.shortBreakDurationLabel)
    const longBreakDuration = useSessionStore((state) => state.longBreakDuration)
    const longBreakDurationLabel = useSessionStore((state) => state.longBreakDurationLabel)
    const activeSessionActivity = useSessionStore((state) => state.activeSessionActivity)
    const activeStopwatch = useSessionStore((state) => state.activeStopwatch)

    useEffect(() => {
        if (!stopwatch || stopwatch < 0) {
            return
        }
        setTimeout(() => {
            console.log('stopwatch', stopwatch)
            setStopwatch(stopwatch - 1)
        }, 1000);
    }, [stopwatch])

    const setFocusDurationLabel = (text) => {
        useSessionStore.setState({
            focusDurationLabel: text,
            focusDuration: convertDurationHmToSeconds(text),
        })
    }

    const stopInterval = () => {
        if (!BackgroundTimer.backgroundTimer) {
            return
        }
        setTimeout(() => BackgroundTimer.stopBackgroundTimer(), 0);
    }

    const resumeInterval = () => {
        stopInterval()
        console.log('resumeInterval', BackgroundTimer.backgroundTimer)

        BackgroundTimer.runBackgroundTimer(() => {
            const nextTime = useSessionStore.getState().activeStopwatch - 1
            console.log('tick', nextTime)
            if (nextTime >= 0) {
                useSessionStore.setState({
                    activeStopwatch: nextTime
                })
            } else {
                stopInterval()
                const activeSessionActivity = useSessionStore.getState().activeSessionActivity
                const focusCompleted = useSessionStore.getState().focusCompleted
                if (activeSessionActivity === 'focus' && focusCompleted < 2) {
                    useSessionStore.setState({
                        activeSessionActivity: 'short break',
                        activeStopwatch: shortBreakDuration,
                        shortBreakDurationLabel: shortBreakDurationLabel,
                        focusCompleted: focusCompleted + 1,
                    })

                    resumeInterval()
                } else if (activeSessionActivity === 'focus' && focusCompleted >= 2) {
                    useSessionStore.setState({
                        activeSessionActivity: 'long break',
                        activeStopwatch: longBreakDuration,
                        longBreakDurationLabel: longBreakDurationLabel,
                        focusCompleted: focusCompleted + 1,
                    })

                    resumeInterval()
                } else if (activeSessionActivity === 'short break') {
                    startActivity()
                } else if (activeSessionActivity === 'long break') {
                    stopActivity()
                }
            }
        }, 1000)
    }
    const startActivity = () => {
        useSessionStore.setState({
            activeSessionActivity: 'focus',
            activeStopwatch: focusDuration,
        })

        resumeInterval()
    }

    const pauseActivity = () => {
        useSessionStore.setState({
            activeSessionActivity: 'pause'
        })
        stopInterval()
    }

    const resumeActivity = (activityName) => {
        useSessionStore.setState({
            activeSessionActivity: activityName,
        })
        resumeInterval()
    }

    const stopActivity = () => {
        stopInterval()
        useSessionStore.setState({
            activeSessionActivity: 'inactive',
        })

        // TODO: record activity here
    }

    const tryToStopActivity = () => {
        stopInterval()

        Alert.alert('Stopping session', 'Are you sure want to stop the current session?', [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                    resumeInterval()
                },
            },
            {
                text: 'Stop',
                onPress: () => {
                    stopActivity()
                }
            },
        ]);
    }

    if (activeSessionActivity === 'inactive') {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{tag}</Text>
                <TextInput value={focusDurationLabel} onChangeText={setFocusDurationLabel}></TextInput>
                <Button title="Start Focus" onPress={startActivity} />
            </View>
        )
    } else if (['focus', 'pause'].indexOf(activeSessionActivity) > -1) {
        const focusCompleted = useSessionStore.getState().focusCompleted
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{`Focus #${focusCompleted + 1} (duration: ${focusDurationLabel})`}</Text>
                <Text>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                { (activeSessionActivity === 'focus') ? (
                    <View>
                        <Button title='Pause' onPress={() => pauseActivity()} />
                    </View>
                ) : (
                    <View>
                        <Button title='Resume' onPress={() => resumeActivity(activeSessionActivity)} />
                        <Button title='Stop' onPress={() => tryToStopActivity()} />
                    </View>
                )}
            </View>
        )
    } else if (activeSessionActivity === 'short break') {
        const focusCompleted = useSessionStore.getState().focusCompleted
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{`Short break #${focusCompleted} (duration ${shortBreakDurationLabel})`}</Text>
                <Text>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                { (activeSessionActivity === 'short break') ? (
                    <View>
                        <Button title='Pause' onPress={() => pauseActivity()} />
                    </View>
                ) : (
                    <View>
                        <Button title='Resume' onPress={() => resumeActivity(activeSessionActivity)} />
                        <Button title='Stop' onPress={() => tryToStopActivity()} />
                    </View>
                )}
            </View>
        )
    } else if (activeSessionActivity === 'long break') {
        const focusCompleted = useSessionStore.getState().focusCompleted
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{`Long break`}</Text>
                <Text>{convertDurationSecondsToHm(activeStopwatch)}</Text>
                { (activeSessionActivity === 'short break') ? (
                    <View>
                        <Button title='Pause' onPress={() => pauseActivity()} />
                    </View>
                ) : (
                    <View>
                        <Button title='Resume' onPress={() => resumeActivity(activeSessionActivity)} />
                        <Button title='Stop' onPress={() => tryToStopActivity()} />
                    </View>
                )}
            </View>
        )
    }
}

export default SessionScreen;