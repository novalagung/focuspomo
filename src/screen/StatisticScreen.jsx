import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import Icon from "@react-native-vector-icons/fontawesome6";
import { format, subDays } from 'date-fns'
import { BarChart } from "react-native-gifted-charts";
import {Dimensions} from 'react-native';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const StatisticScreen = () => {
    const switchOptions = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' },
    ]

    const onSwitchSelect = (value) => {
        console.log(value)
    }

    const windowWidth = Dimensions.get('window').width;
    const maxData = 10
    let startDate = subDays(new Date(), maxData/2)

    let data1 = [];
    for (let i = 0; i < maxData; i++) {
        data1.push({
            label: format(startDate, 'dd MMM'),
            stacks: [
                { value: getRandomInt(0, 5), color: '#e2ebfe' },
                { value: getRandomInt(0, 5), color: '#f1f7d1' },
                { value: getRandomInt(0, 5), color: '#f8e8ba' },
            ]
        })
        startDate = subDays(startDate, -1)
    }

    const data2 = [
        { label: 'Study', value: 182, color: '#e2ebfe' },
        { label: 'Exercise', value: 144, color: '#f1f7d1' },
        { label: 'Mindfulness', value: 69, color: '#fdf6d7' },
    ]
    const totalData2 = data2.reduce((acc, cur) => acc + cur.value, 0)

    const data3 = [
        { label: 'Started', value: 10 },
        { label: 'Finished', value: 6 },
        { label: 'Minutes', value: 300 },
        { label: 'Breaks', value: 5 },
    ]

    return (
        <View style={styles.container}>
            <SwitchSelector
                options={switchOptions}
                initial={0}
                backgroundColor='#d9d9d9'
                textColor="#5e5e5e"
                buttonColor='#f3f3f3'
                hasPadding={true}
                padding={2}
                selectedColor="#5e5e5e"
                bold={true}
                onPress={onSwitchSelect}
            />
            <ScrollView>
                <View style={styles.datesSliderContainer}>
                    <Text style={[styles.datesSliderItem, {textAlign: 'left', alignSelf: 'center'}]} onPress={() => { }}>
                        <Icon name={"less-than"} iconStyle="solid" size={20} color='#5e5e5e' />
                    </Text>
                    <View style={[styles.datesSliderItem, {alignItems: 'center', alignSelf: 'center', width: '70%'}]}>
                        <Text style={styles.datesSliderItemSession}>10 sessions</Text>
                        <Text style={styles.datesSliderItemDate}>{format(new Date(), "dd MMM yyyy")}</Text>
                    </View>
                    <Text style={[styles.datesSliderItem, {textAlign: 'right', alignSelf: 'center'}]} onPress={() => { }}>
                        <Icon name={"greater-than"} iconStyle="solid" size={20} color='#5e5e5e' />
                    </Text>
                </View>
                <View style={styles.containerFlex}>
                    <View style={styles.barChart1}>
                        <BarChart
                            stackData={data1}
                            width={windowWidth - 103}
                            hideYAxisText={true}
                            spacing={4}
                            xAxisTextNumberOfLines={2}
                            barBorderColor='#333'
                            maxValue={15}
                            // barBorderRadius={5}
                            // barBorderWidth={1}
                            // barWidth={30}
                        />
                    </View>
                </View>
                <View style={styles.line} />
                <View style={{marginBottom: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>Today's Focus</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{parseInt(Math.floor(totalData2/60))}h {totalData2%60}m</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {data2.map((item, index) => (
                        <View key={index} style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{backgroundColor: item.color, width: item.value / 100 * 100, borderWidth: 1, borderColor: '#d5d8df', borderRadius: 12, height: 42, marginRight: 10, marginBottom: 10}}>
                                <Text>&nbsp;</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight: 'bold'}}>{item.label}</Text>
                                <Text>{parseInt(Math.floor(item.value/60))}h {item.value%60}m</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.line} />
                <View style={{marginBottom: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>Sessions</Text>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        {data3.map((item, index) => (
                            <View key={index} style={{flex: 1, flexDirection: 'row', flexBasis: 'auto', flexGrow: 1, borderBottomColor: '#e3e3e3', borderBottomWidth: 1, paddingBottom: 5, paddingTop: 5}}>
                                <Text style={{textAlign: 'left', flex: 1,}}>{item.label}</Text>
                                <Text style={{textAlign: 'right', alignSelf: 'flex-end'}}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Text>&nbsp;</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    containerFlex: {
        alignItems: 'center',
    },
    datesSliderContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        flexShrink: 1,
    },
    datesSliderItem: {
        flex: 1,
        margin: 1,
        padding: 10,
    },
    datesSliderItemSession: {
        fontWeight: "bold",
        fontSize: 18,
    },
    datesSliderItemDate: {
    },
    barChart1: { },
    line: {
        display: 'block',
        width: '100%',
        borderBottomColor: '#5e5e5e',
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    }
})

export default StatisticScreen;
