import React, { Component } from 'react';
import Menu from './MenuComponent';
import { View, Platform, ScrollView, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import Dishdetail from './DishDetailComponent';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
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
        headerLeft: <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
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
        headerLeft: <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
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
        headerLeft: <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
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
    }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerComponent
});



class Main extends Component {
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

export default Main;