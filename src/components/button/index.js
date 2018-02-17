import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

const renderChildren = (children, textStyle, disabled) => {
  const childrenType = typeof children;
  if (childrenType === "object") {
    return children;
  }
  return (
    <Text style={[textStyle, disabled ? { color: "#fff" } : null]}>
      {children}
    </Text>
  );
};
const Button = ({ children, style, onPress, textStyle, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[style, disabled ? { backgroundColor: "#ccc" } : null]}
      onPress={onPress}
      disabled={disabled}
    >
      {renderChildren(children, textStyle, disabled)}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any,
  onPress: PropTypes.func,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool
};

export default Button;
