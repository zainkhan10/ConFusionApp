import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Card } from 'react-native-elements';

function RenderItem(props) {
    const item = props.item;
    if (item != null) {
        return (
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.category}
                image={require('../images/uthappizza.png')}>
                <Text style={{ margin: 10 }}>{item.description}</Text>
            </Card>
        );
    }
}

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }
    }
    render() {
        return (
            <ScrollView>
                <RenderItem item={this.state.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem item={this.state.promotions.filter((promotion) => promotion.featured)[0]} />
                <RenderItem item={this.state.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        );
    }
}
export default Home;