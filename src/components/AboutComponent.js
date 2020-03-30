import React, { Component } from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, View, ScrollView } from 'react-native';
import { LEADERS } from '../shared/leaders';

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
class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaders: LEADERS
        };
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <RenderHistory />
                    <Card title="Corporate Leadership">
                        {this.state.leaders.map((item, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    title={item.name}
                                    subtitle={item.description}
                                    hideChevron={true}
                                    leftAvatar={{ source: require('../images/alberto.png') }}
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
export default Contact;