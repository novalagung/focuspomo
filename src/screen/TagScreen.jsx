
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useTagStore from "../store/tag-store";
import Icon from "@react-native-vector-icons/fontawesome6";
import {useNavigation} from "@react-navigation/native";

function TagScreen() {
    const navigation = useNavigation();
    const tags = useTagStore((state) => state.tags)

    const selectTag = (id) => {
        if (id === 'new tag') {
            return
        }
        useTagStore.setState({activeTag: id})
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {tags.map((tag) => (
                <View key={tag.id} style={styles.itemWrapper}>
                    <TouchableOpacity onPress={() => selectTag(tag.id) }>
                        <View style={[styles.item, { backgroundColor: tag.color }]}>
                            <Text style={styles.text}>
                                {tag.name}
                                &nbsp;&nbsp;
                                {tag.id === 'new tag' ? (
                                    <Icon name="lock" iconStyle="solid" color="#5e5e5e" />
                                ) : (
                                    <Icon name="tag" iconStyle="solid" color="#5e5e5e" />
                                )}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        padding: 17,
        backgroundColor: 'white'
    },
    itemWrapper: {
        padding: 8,
        width: '50%',
    },
    item: {
        display: 'block',
        padding: 25,
        backgroundColor: 'red',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e3e3e3',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5e5e5e'
    }
})

export default TagScreen;