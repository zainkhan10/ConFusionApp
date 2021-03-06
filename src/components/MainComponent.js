import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, ScrollView, SafeAreaView, Image, Text, StyleSheet, ToastAndroid } from 'react-native';
import Dishdetail from './DishDetailComponent';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import * as NetInfo from "@react-native-community/netinfo";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
        })
    },
    Dishdetail: {
        screen: Dishdetail
    }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});
const HomeNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});
const ContactNavigator = createStackNavigator({
    Contact: {
        screen: Contact
    }
}, {
    navigationOptions: ({ navigation }) => ({
        title: 'Contact Us',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});
const ReservationNavigator = createStackNavigator({
    Reservation: {
        screen: Reservation
    }
}, {
    navigationOptions: ({ navigation }) => ({
        title: 'Reservation',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});
const AboutNavigator = createStackNavigator({
    About: {
        screen: About
    }
}, {
    navigationOptions: ({ navigation }) => ({
        title: 'About Us',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});
const FavoriteNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites
    }
}, {
    navigationOptions: ({ navigation }) => ({
        title: 'My Favorites',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});
const LoginNavigator = createStackNavigator({
    Login: {
        screen: Login
    }
}, {
    navigationOptions: ({ navigation }) => ({
        title: 'Login',
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" containerStyle={{ paddingLeft: 15 }} size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});

const CustomDrawerComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Afridi In Restaurent</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (<Icon name="sign-in" type="font-awesome" size={24} color={tintColor} />)
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (<Icon name="home" type="font-awesome" size={24} color={tintColor} />)
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor }) => (<Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />)
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (<Icon name="list" type="font-awesome" size={24} color={tintColor} />)
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor }) => (<Icon name="address-card" type="font-awesome" size={22} color={tintColor} />)
        }
    },
    Favorites: {
        screen: FavoriteNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (<Icon name="heart" type="font-awesome" size={24} color={tintColor} />)
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (<Icon name="cutlery" type="font-awesome" size={24} color={tintColor} />)
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerComponent,
    drawerPostion: "left",
});



class Main extends Component {
    componentDidMount() {
        console.disableYellowBox = true;
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', 'Switch', 'Switch onTintColor'];
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        // NetInfo.getConnectionInfo().then((connectionInfo) => {
        //     ToastAndroid.show('Initital Network Connectivity Type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType, ToastAndroid.LONG)
        // });
        // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange)
        // const unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        // });
        // unsubscribe();
        NetInfo.fetch().then(state => {
            console.log("Connection type", state);
            this.handleConnectivityChange(state.type)
            //console.log("Is connected?", state.isConnected);
        });
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange)
    }

    // componentWillUnmount() {
    //     NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange)
    // }
    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline', ToastAndroid.LONG);
                break;

            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi', ToastAndroid.LONG);
                break;

            case 'cellular':
                ToastAndroid.show('You are now connected to cellular', ToastAndroid.LONG);
                break;

            case 'unknown':
                ToastAndroid.show('You have now an unknown connection', ToastAndroid.LONG);
                break;

            default:
                break;
        }
    }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        height: 140,
        backgroundColor: '#512DAB',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingTop: Expo.Constants.statusBarHeight
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);