import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {
    static navigationOptions = {
        title: 'My Favorites'
    }
    render() {
        const { navigate } = this.props.navigation;
        // const renderMenuItem = ((item, index) => {

        // });

        if (this.props.dishes.isLoading) {
            return <Loading />;
        } else if (this.props.dishes.errMess) {
            return <View><Text>{this.props.dishes.errMess}</Text></View>;
        } else {
            return (
                <FlatList
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={(item, index) => {
                        console.log("Favorite Item ==> ", item.item);
                        return (
                            <ListItem
                                key={index}
                                title={item.item.name}
                                subtitle={item.item.description}
                                hideChevron={true}
                                onPress={() => navigate('Dishdetail', { dishId: item.item.id })}
                                leftAvatar={{ source: { uri: baseUrl + item.item.image } }}
                                bottomDivider
                            />
                        );
                    }}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps)(Favorites);