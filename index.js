/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from "react";
import {createStaticNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import StatisticScreen from './src/screen/StatisticScreen';
import SessionScreen from "./src/screen/SessionScreen";
import ScheduleScreenWIP from "./src/screen/ScheduleScreenWIP";
import SettingsScreenWIP from "./src/screen/SettingsScreenWIP";
import Icon from '@react-native-vector-icons/fontawesome6';
import TagScreen from "./src/screen/TagScreen";
import LandingScreen from "./src/screen/LandingScreen";
import SignUpScreen from "./src/screen/SignUpScreen";
import OTPScreenWIP from "./src/screen/OTPScreenWIP";
import SignInScreen from "./src/screen/SignInScreen";
import ForgotPasswordScreen from "./src/screen/ForgotPasswordScreen";

const BottomStack = createBottomTabNavigator({
    initialRouteName: 'Session',
    screens: {
        Statistic: StatisticScreen,
        Session: SessionScreen,
        Schedule: ScheduleScreenWIP,
        Settings: SettingsScreenWIP,
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

const RootStack = createNativeStackNavigator({
    initialRouteName: 'BottomStack',
    screens: {
        BottomStack: BottomStack,
        Landing: LandingScreen,
        SignUp: SignUpScreen,
        OTP: OTPScreenWIP,
        SignIn: SignInScreen,
        ForgotPassword: ForgotPasswordScreen,
        Tag: TagScreen,
    },
    screenOptions:  ({ route }) => {
        switch (route.name) {
            case 'Tag': return { title: 'Select tag' }
            default: return { headerShown: false }
        }
    }
});

const Navigation = createStaticNavigation(RootStack);

const AppWrapper = () => {
    return <Navigation />;
};

AppRegistry.registerComponent(appName, () => AppWrapper);
