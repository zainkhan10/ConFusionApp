import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

class Menu extends Component {
    static navigationOptions = {
        title: 'Menu'
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.props.dishes.isLoading) {
            return <Loading />;
        } else if (this.props.dishes.errMess) {
            return <View><Text>{this.props.dishes.errMess}</Text></View>;
        } else {
            return (
                <ScrollView>
                    <View>
                        {this.props.dishes.dishes.map((item, index) => {
                            return (
                                <Tile
                                    key={index}
                                    title={item.name}
                                    caption={item.description}
                                    featured
                                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                                    imageSrc={{ uri: baseUrl + item.image }}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
            );
        }
    }
}
export default connect(mapStateToProps)(Menu);