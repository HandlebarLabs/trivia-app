import React from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity
} from "react-native";

export const PrimaryButton = ({
  onPress = () => null,
  children,
  _isHorizontal,
  align
}) => {
  const style = [styles.button];

  if (_isHorizontal) {
    style.push(styles.horizontalChild);
  }

  if (align === "right") {
    style.push({ alignSelf: "flex-end", paddingHorizontal: 35 });
  }

  return (
    <TouchableHighlight onPress={onPress} style={style} underlayColor="#F4F4F4">
      <Text style={styles.text}>{children}</Text>
    </TouchableHighlight>
  );
};

export const SecondaryButton = ({
  onPress = () => null,
  children,
  _isHorizontal
}) => {
  const style = [styles.button, styles.secondary];

  if (_isHorizontal) {
    style.push(styles.horizontalChild);
  }

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={[styles.text, styles.secondaryText]}>{children}</Text>
    </TouchableOpacity>
  );
};

export const HorizontalButtons = props => {
  return (
    <View style={styles.horizontal}>
      {React.Children.map(props.children, c => {
        return React.cloneElement(c, {
          _isHorizontal: true
        });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 23,
    paddingHorizontal: 80,
    marginHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff"
  },
  text: {
    color: "#5AADC1",
    fontFamily: "quicksand-bold",
    fontSize: 20,
    lineHeight: 25
  },
  secondaryText: {
    color: "#fff"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center"
  },
  horizontalChild: {
    flex: 1,
    paddingHorizontal: 0
  }
});
