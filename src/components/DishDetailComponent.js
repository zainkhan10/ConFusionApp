import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Modal, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComments } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComments: (comment) => dispatch(postComments(comment))
});

function RenderDish(props) {
    const dish = props.dish;
    handleViewRef = ref => this.view = ref;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return true;
        else
            return false;
    };
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000).then(endState => {
                console.log(endState.finished ? 'finished' : 'cancelled')
            })
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    "Are you sure you want to add " + dish.name + " to your favorites?",
                    [
                        {
                            text: 'Cancle',
                            onPress: () => console.log('Cancle Pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'Okay',
                            onPress: () => props.favorite ? console.log('already favorite') : props.onPress(),
                            style: 'default'
                        }
                    ],
                    { cancelable: false }
                )
            return true;
        }
    });
    if (dish != null) {
        return (
            <Animatable.View
                animation="fadeInDown"
                duration={2000}
                delay={1000}
                ref={this, handleViewRef}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type="font-awesome"
                            color="#f50"
                            onPress={() => props.favorite ? console.log('already favorite') : props.onPress()} />
                        <Icon
                            raised
                            reverse
                            name="pencil"
                            type="font-awesome"
                            color="#512DA8"
                            onPress={() => props.toggleModal()} />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}
function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <View style={{ alignItems: 'flex-start', marginVertical: 5 }}>
                    <Rating
                        imageSize={16}
                        readonly
                        startingValue={item.rating}
                    />
                </View>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}
class Dishdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            rating: 0,
            author: '',
            comment: '',
            date: '',
            comments: []
        }
    }
    componentDidMount() {

        //this.setState({ comments: this.props.comments.comments })
    }
    static navigationOptions = {
        title: 'Dish Details'
    }
    resetForm() {
        this.setState({ rating: 0, author: false, comment: '', date: '' })
    }

    handleComment() {
        const dishId = this.props.navigation.getParam('dishId', '');
        const commentId = this.props.comments.comments.length;
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " - " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        let objComment = {
            rating: this.state.rating,
            author: this.state.author,
            comment: this.state.comment,
            date: datetime,
            dishId: dishId,
            id: commentId
        };
        this.props.postComments(objComment);
        console.log(JSON.stringify(objComment))
        this.toggleModal();
        // this.setState({ comments: this.props.comments.comments })
        console.log("comments ==> ", this.props.comments.comments);
    }
    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    ratingCompleted(rating) {
        this.setState({ rating: rating })
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal(); this.resetForm() }}
                    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                >
                    <View style={styles.modal}>
                        <Rating onFinishRating={(val) => this.ratingCompleted(val)} showRating fractions="{1}" startingValue={this.state.rating} />
                        <View style={{ marginTop: 15 }}>
                            <Input
                                placeholder='Author'
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        size={24}
                                        color='black'
                                        type="font-awesome"
                                        style={{ marginRight: 10, marginLeft: 0 }}
                                    />
                                }
                                leftIconContainerStyle={{ marginLeft: 5, marginRight: 10 }}
                                value={this.state.author}
                                onChangeText={(val) => this.setState({ author: val })}
                            />
                            <View style={{ marginTop: 10 }}></View>
                            <Input
                                placeholder='Comment'
                                leftIcon={
                                    <Icon
                                        name='comment-o'
                                        size={24}
                                        color='black'
                                        type="font-awesome"
                                        style={{ marginRight: 10, marginLeft: 0 }}
                                    />
                                }
                                leftIconContainerStyle={{ marginLeft: 5, marginRight: 10 }}
                                value={this.state.comment}
                                onChangeText={(val) => this.setState({ comment: val })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                title="Add Comment"
                                color="#512DA8"
                                style={{ marginBottom: 15 }}
                                type="solid"
                                onPress={() => this.handleComment()}
                            />
                            <View style={{ marginTop: 5 }}></View>
                            <Button
                                title="Cancle"
                                type="outline"
                                color="#eee"
                                onPress={() => { this.toggleModal(); this.resetForm(); }}
                            />
                        </View>
                    </View>

                </Modal>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20,
        flex: 1
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
