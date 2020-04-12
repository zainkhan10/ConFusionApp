import React, { Component } from 'react';
import { View, Text, Stylesheet, StyleSheet, AsyncStorage } from 'react-native';
import { SecureStore } from 'expo';
import { Input, CheckBox, Button } from 'react-native-elements';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }
    static navigationOptions = {
        title: 'Login'
    };
    componentDidMount() {
        AsyncStorage.getItem('userinfo').then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({
                    username: userinfo.username,
                    password: userinfo.password,
                    remember: true
                })
            }
        })
        // SecureStore.getItemAsync('userinfo')
        // .then((userdata) => {
        //     let userinfo = JSON.parse(userdata);
        //     if (userinfo) {
        //         this.setState({username: userinfo.username});
        //         this.setState({password: userinfo.password});
        //         this.setState({remember: true})
        //     }
        // })
    }
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            AsyncStorage.setItem(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    remember: this.state.remember
                })
            ).catch((error) => console.log('could not save user info ==> ', error))
        } else {
            AsyncStorage.removeItem('userinfo')
                .catch((error) => console.log('could not deleter user info ==> ', error))
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(val) => this.setState({ username: val })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(val) => this.setState({ password: val })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember me"
                    checked={this.state.remember}
                    center
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button onPress={() => this.handleLogin()} title="Login" color="#512DA8" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        flex: 1
    },
    formInput: {
        marginBottom: 30
    },
    formCheckbox: {
        backgroundColor: null
    },
    formButton: {
        marginTop: 30
    }
});

export default Login;