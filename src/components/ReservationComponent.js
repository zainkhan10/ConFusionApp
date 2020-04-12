import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Modal, Alert, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guest: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }
    static navigationOptions = {
        title: 'Reserve Table'
    }
    resetForm() {
        this.setState({ guest: 1, smoking: false, date: '' })
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chat-messages', {
                name: 'chat-messages',
                sound: true,
                priority: 'max',
                vibrate: true,
            });
        }
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            android: {
                color: '#512DA8',
                channelId: 'chat-messages'
            }
        })
    }
    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of guests: ' + this.state.guest + '\n' + 'Smoking ?: ' + (this.state.smoking ? 'Yes' : 'No') + '\n' + 'Date & Time: ' + this.state.date,
            [
                {
                    text: 'Cancle',
                    onPress: () => { console.log('Cancelled'); this.resetForm() },
                    style: 'cancel'
                },
                {
                    text: 'Okay',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm()
                    },
                    style: 'default'
                }
            ],
            { cancelable: false }
        )
        this.toggleModal();
    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }
    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={1000} >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker style={styles.formItem} selectedValue={this.state.guest} onValueChange={(value, index) => this.setState({ guest: value })}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking / Non-Smoking?</Text>
                        <Switch style={styles.formItem} value={this.state.smoking} onTintColor="#512DA8" onValueChange={(value) => this.setState({ smoking: value })}></Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode="datetime"
                            placeholder="Select date & time"
                            minDate='2017-01-01'
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancle"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    top: 0,
                                    left: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button title="Reserve" color="#512DA8" onPress={() => this.handleReservation()} />
                    </View>
                </Animatable.View>
                {/* <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guest}</Text>
                        <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date & Time: {this.state.date}</Text>
                        <Button title="CLose" color="#512DA8" onPress={() => { this.toggleModal(); this.resetForm() }} />
                    </View>
                </Modal> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;