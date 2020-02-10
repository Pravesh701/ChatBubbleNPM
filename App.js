import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

const ChatBubble = ({ MessageArray, sendMessageToServer, InputTextValue, onChangeText }) => {

  function sendMessageToYourServer() {
    if (InputTextValue !== '') {
      let payload = {
        msg: InputTextValue,
        id: Math.random(),
        token: '',
        email: '',
        type: 'client',
      };
      let mydata = MessageArray;
      mydata.push(payload);
      sendMessageToServer(mydata, payload)
    }
  };

  function renderFlatListItem(rowData) {
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
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MessageArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFlatListItem}
      />
      <View style={styles.sendMessageConatinerStyle}>
        <TextInput
          style={styles.sendMsgTextInputStyle}
          value={InputTextValue}
          placeholder={"please type here!"}
          placeholderTextColor={"#000"}
          onChangeText={val => onChangeText(val)}></TextInput>
        <TouchableOpacity
          style={styles.sendMsgButtonStyle}
          onPress={sendMessageToYourServer}>
          <Text>Send Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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

export default ChatBubble;