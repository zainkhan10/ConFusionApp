import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { Text, View } from 'react-native';

function Contact() {
    return (
        <Card title='Contact Information'>
            <View style={{ margin: 10 }}>
                <Text>121, Clear Water Bay Road</Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Fax: +852 8765 4321</Text>
                <Text>Email:confusion@food.net</Text>
            </View>
        </Card>
    );
}
export default Contact;