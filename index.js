/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from "react";
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StatisticScreen from './src/screen/StatisticScreen';
import SessionScreen from "./src/screen/SessionScreen";
import ScheduleScreen from "./src/screen/ScheduleScreen";
import SettingsScreen from "./src/screen/SettingsScreen";
import Icon from '@react-native-vector-icons/fontawesome6';

const RootStack = createBottomTabNavigator({
    initialRouteName: 'Session',
    screens: {
        Statistic: StatisticScreen,
        Session: {
            screen: SessionScreen,
        },
        Schedule: ScheduleScreen,
        Settings: SettingsScreen,
    },
    screenOptions:  ({ route }) => ({
        headerShown: false,
        tabBarIcon: ({}) => {
            switch (route.name) {
                case 'Statistic': return (<Icon name="chart-simple" size={20} iconStyle="solid" />)
                case 'Session': return (<Icon name="clock" size={20} iconStyle="solid" />)
                case 'Schedule': return (<Icon name="calendar" size={20} iconStyle="solid" />)
                case 'Settings': return (<Icon name="user" size={20} iconStyle="solid" />)
            }
        }
    })
});

const Navigation = createStaticNavigation(RootStack);

const AppWrapper = () => {
    return <Navigation />;
};

AppRegistry.registerComponent(appName, () => AppWrapper);
