import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES
        }
    }
    static navigationOptions = {
        title: 'Menu'
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                {this.state.dishes.map((item, index) => {
                    return (
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description}
                            hideChevron={true}
                            onPress={() => navigate('Dishdetail', { dishId: item.id })}
                            leftAvatar={{ source: require('../images/uthappizza.png') }}
                            bottomDivider
                        />
                    );
                })}
            </View>
        );
    }
}
export default Menu;