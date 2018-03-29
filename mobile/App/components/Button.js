import React from "react";
import { StyleSheet, View, TouchableHighlight, Text, TouchableOpacity } from "react-native";

export const PrimaryButton = ({
  onPress = () => null, children, _isHorizontal, align,
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
  _isHorizontal,
  border = true,
}) => {
  const style = [styles.button, styles.secondary];
  const textStyles = [styles.text, styles.secondaryText];

  if (_isHorizontal) {
    style.push(styles.horizontalChild);
  }

  if (border) {
    style.push(styles.secondaryBorder);
  } else {
    textStyles.push(styles.secondaryTextNoBorder);
  }

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

export const HorizontalButtons = props => (
  <View style={styles.horizontal}>
    {React.Children.map(props.children, c =>
      React.cloneElement(c, {
        _isHorizontal: true,
      }))}
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 60,
    paddingHorizontal: 80,
    marginHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
  secondary: {
    backgroundColor: "transparent",
  },
  secondaryBorder: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    color: "#5AADC1",
    fontFamily: "quicksand-bold",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
  },
  secondaryText: {
    color: "#fff",
  },
  secondaryTextNoBorder: {
    fontFamily: "quicksand-regular",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
  },
  horizontalChild: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
