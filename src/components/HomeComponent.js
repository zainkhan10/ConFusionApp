import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props) {
    const item = props.item;
    if (props.isLoading) {
        return <Loading />;
    } else if (props.errMess) {
        return <View><Text>{props.errMess}</Text></View>;
    } else {
        if (item != null) {
            return (
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.category}
                    image={{ uri: baseUrl + item.image }}>
                    <Text style={{ margin: 10 }}>{item.description}</Text>
                </Card>
            );
        }
    }
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishes: [],
            promotions: [],
            leaders: []
        }
    }
    componentDidMount() {
        this.setState({ dishes: this.props.dishes.dishes, promotions: this.props.promotions.promotions, leaders: this.props.leaders.leaders })
        console.log("dishes ==> ", this.props.dishes.dishes)
    }
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(Home);