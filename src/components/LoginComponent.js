import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, Image } from 'react-native';
import { SecureStore } from 'expo';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from 'expo-asset';

class LoginTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }
    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="sign-in" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />
        )
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
                    <Button
                        icon={<Icon name="sign-in" size={24} type="font-awesome" color="#fff" />}
                        onPress={() => this.handleLogin()}
                        title="Login"
                        buttonStyle={{ backgroundColor: '#512DA8' }} />
                </View>
                <View style={styles.formButton}>
                    <Button
                        icon={<Icon name="user-plus" size={24} type="font-awesome" color="#fff" />}
                        clear
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        titleStyle={{ color: 'blue' }}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="user-plus" type="font-awesome" size={24} iconStyle={{ color: tintColor }} />
        )
    };
    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    };
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri);
            }
        }
    };
    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {
                    resize: { width: 400 }
                }
            ],
            { format: 'png' }
        );
        this.setState({ imageUrl: processedImage.uri })
    };
    handleRegister() {
        console.log(JSON.stringify(this.state))
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
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('../images/logo.png')}
                            style={styles.image} />
                        <Button title="Camera" onPress={this.getImageFromCamera} />
                        <Button title="Gallery" onPress={this.getImageFromGallery} />
                    </View>
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
                    <Input
                        placeholder="First Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(val) => this.setState({ firstname: val })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Last Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(val) => this.setState({ lastname: val })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(val) => this.setState({ email: val })}
                        value={this.state.email}
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
                        <Button
                            icon={<Icon name="user-plus" size={24} type="font-awesome" color="#fff" />}
                            onPress={() => this.handleRegister()}
                            title="Register"
                            buttonStyle={{ backgroundColor: '#512DA8' }} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#fff',
        inactiveTintColor: 'gray'
    }
})


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        flex: 1
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
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