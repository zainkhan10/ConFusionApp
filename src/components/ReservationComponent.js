import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch } from 'react-native';
import { Card, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guest: 1,
            smoking: false,
            date: ''
        }
    }
    static navigationOptions = {
        title: 'Reserve Table'
    }
    handleReservation(){
        console.log(JSON.stringify(this.state))
        this.setState({guest: 1, smoking: false, date: ''})
    }
    render() {
        return (
            <ScrollView>
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
    }
})

export default Reservation;