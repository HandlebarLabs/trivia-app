import React from "react";
import { View, TouchableOpacity } from "react-native";

import Container from "../components/Container";
import Card from "../components/Card";
import { H2, P } from "../components/Text";
import HistoryRow from "../components/HistoryRow";

import * as UserData from "../util/UserData";

class NotificationHistory extends React.Component {
  componentDidMount() {
    this.props.user.getNotificationHistory();
  }

  render() {
    return (
      <Container>
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <H2>Notification History</H2>
            <TouchableOpacity onPress={() => this.props.goBackTo("Waiting", {}, "vertical")}>
              <P>❌</P>
            </TouchableOpacity>
          </View>
          {this.props.user.notificationHistory.length === 0 && <P>No history at this time...</P>}
          {this.props.user.notificationHistory.map((notification, index) => (
            <HistoryRow key={notification._id} index={index} {...notification} />
          ))}
        </Card>
      </Container>
    );
  }
}

export default props => (
  <UserData.Consumer>{user => <NotificationHistory user={user} {...props} />}</UserData.Consumer>
);
