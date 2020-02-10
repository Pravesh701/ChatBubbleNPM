import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from 'react-native';

export default class ChatBubble extends Component {
    state = {
        messages: [
            {
                msg: 'Heloo',
                id: Math.random(),
                token: '',
                email: '',
                type: 'server',
            },
            {
                msg: 'Server Message',
                id: Math.random(),
                token: '',
                email: '',
                type: 'server',
            },
        ],
        value: '',
    };

    sendMessageToServer = () => {
        if (this.state.value !== '') {
            let payload = {
                msg: this.state.value,
                id: Math.random(),
                token: '',
                email: '',
                type: 'client',
            };
            let mydata = this.state.messages;
            mydata.push(payload);
            this.setState({
                messages: mydata,
                value: '',
            });
        }
    };

    renderFlatListItem = rowData => {
        return (
            <View style={styles.flatListContainerStyle}>
                {rowData.item.type === 'client' ? (
                    <View style={styles.clientMsgStyle}>
                        <Text>{rowData.item.msg}</Text>
                    </View>
                ) : (
                        <View style={styles.serverMsgStyle}>
                            <Text>{rowData.item.msg}</Text>
                        </View>
                    )}
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderFlatListItem}
                />
                <View style={styles.sendMessageConatinerStyle}>
                    <TextInput
                        style={styles.sendMsgTextInputStyle}
                        value={this.state.value}
                        placeholder={"please type here!"}
                        placeholderTextColor={"#000"}
                        onChangeText={val => this.setState({ value: val })}></TextInput>
                    <TouchableOpacity
                        style={styles.sendMsgButtonStyle}
                        onPress={this.sendMessageToServer}>
                        <Text>Send Message</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sendMessageConatinerStyle: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    sendMsgTextInputStyle: {
        backgroundColor: '#e0f2f1',
        flex: 0.8,
        borderTopLeftRadius: 62.5,
        borderBottomLeftRadius: 62.5,
        padding: 20,
    },
    sendMsgButtonStyle: {
        flex: 0.2,
        backgroundColor: '#80cbc4',
        borderBottomRightRadius: 62.5,
        borderTopRightRadius: 62.5,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainerStyle: {
        backgroundColor: '#e0f7fa',
        marginTop: 10,
    },
    clientMsgStyle: {
        backgroundColor: '#ffab91',
        borderRadius: 20,
        padding: 15,
        alignSelf: 'flex-end',
    },
    serverMsgStyle: {
        backgroundColor: '#4fc3f7',
        borderRadius: 20,
        padding: 15,
        alignSelf: 'flex-start',
    },
});