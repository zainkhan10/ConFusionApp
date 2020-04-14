import React, { Component } from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';



class Contact extends Component {
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['zain@cloudcoherence.io', 'zain.khaan147@gmail.com'],
            subject: "Testing by Zain",
            body: "To whom it may concern: "
        })
    }
    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card title='Contact Information'>
                    <View style={{ margin: 10 }}>
                        <Text>121, Clear Water Bay Road</Text>
                        <Text>Clear Water Bay, Kowloon</Text>
                        <Text>HONG KONG</Text>
                        <Text>Tel: +852 1234 5678</Text>
                        <Text>Fax: +852 8765 4321</Text>
                        <Text>Email:confusion@food.net</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: '#512DA8' }}
                            icon={<Icon name="envelope-o" type="font-awesome" color="#fff" />}
                            onPress={this.sendMail}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
}
export default Contact;