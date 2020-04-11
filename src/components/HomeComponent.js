import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, Easing } from 'react-native';
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
        this.animatedValue = new Animated.Value(0);
        this.state = {
            dishes: [],
            promotions: [],
            leaders: [],

        }
    }
    componentDidMount() {
        this.animate();
        //this.setState({ dishes: this.props.dishes.dishes, promotions: this.props.promotions.promotions, leaders: this.props.leaders.leaders })
        //console.log("dishes ==> ", this.props.dishes.dishes)
    }
    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }] }}>
                    <RenderItem
                        item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
                    <RenderItem
                        item={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                        isLoading={this.props.promotions.isLoading}
                        errMess={this.props.promotions.errMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
                    <RenderItem
                        item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess}
                    />
                </Animated.View>
            </View>
        );
    }
}
export default connect(mapStateToProps)(Home);