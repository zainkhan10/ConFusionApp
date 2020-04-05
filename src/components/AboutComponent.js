import React, { Component } from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, View, ScrollView } from 'react-native';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function RenderHistory(props) {
    return (
        <Card title="Our History">
            <View style={{ margin: 10 }}>
                <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
                <Text style={{ marginTop: 5 }}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
            </View>
        </Card>
    );
}
class About extends Component {
    render() {
        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <View>
                        <RenderHistory />
                        <Card title="Corporate Leadership">
                            <Loading />
                        </Card>
                    </View>
                </ScrollView>
            );
        } else if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <View>
                        <RenderHistory />
                        <Card title="Corporate Leadership">
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <ScrollView>
                    <View>
                        <RenderHistory />
                        <Card title="Corporate Leadership">
                            {this.props.leaders.leaders.map((item, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        title={item.name}
                                        subtitle={item.description}
                                        hideChevron={true}
                                        leftAvatar={{ source: { uri: baseUrl + item.image } }}
                                        bottomDivider
                                    >
                                    </ListItem>
                                );
                            })}
                        </Card>
                    </View>
                </ScrollView>
            );
        }

    }
}
export default connect(mapStateToProps)(About);