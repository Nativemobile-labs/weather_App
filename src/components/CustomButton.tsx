import React from "react";
import {

View,
Text,
TouchableOpacity,
TouchableNativeFeedback,
ActivityIndicator,
StyleSheet,
Platform,
GestureResponderEvent,
ViewStyle,
TextStyle,
} from "react-native";

type CustomButtonProps = {
title: string;
onPress?: (event?: GestureResponderEvent) => void;
disabled?: boolean;
loading?: boolean;
containerStyle?: ViewStyle | ViewStyle[];
textStyle?: TextStyle | TextStyle[];
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
accessibilityLabel?: string;
testID?: string;
};

const ButtonInner: React.FC<CustomButtonProps> = ({
title,
loading,
disabled,
leftIcon,
rightIcon,
textStyle,
}) => (
<View style={[styles.content, disabled && styles.disabledContent]}>
    {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
    {loading ? (
        <ActivityIndicator color="#fff" style={styles.loader} />
    ) : (
        <Text numberOfLines={1} style={[styles.text, textStyle]}>
            {title}
        </Text>
    )}
    {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
</View>
);

const CustomButton: React.FC<CustomButtonProps> = ({
title,
onPress,
disabled = false,
loading = false,
containerStyle,
testID,
accessibilityLabel,
...rest
}) => {
const isDisabled = disabled || loading;

if (Platform.OS === "android") {
    return (
        <View style={[styles.wrapper, containerStyle]} testID={testID}>
            <TouchableNativeFeedback
                onPress={isDisabled ? undefined : onPress}
                background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.2)", false)}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel || title}
                disabled={isDisabled}
            >
                <View style={[styles.button, isDisabled && styles.disabledButton]}>
                    <ButtonInner title={title} loading={loading} disabled={isDisabled} {...rest} />
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

return (
    <TouchableOpacity
        style={[styles.button, containerStyle, isDisabled && styles.disabledButton]}
        onPress={isDisabled ? undefined : onPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        disabled={isDisabled}
        testID={testID}
    >
        <ButtonInner title={title} loading={loading} disabled={isDisabled} {...rest} />
    </TouchableOpacity>
);
};

export default CustomButton;

const styles = StyleSheet.create({
wrapper: {
    borderRadius: 8,
    overflow: "hidden",
},
button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    minHeight: 44,
},
disabledButton: {
    backgroundColor: "#9bbcf7",
},
content: {
    flexDirection: "row",
    alignItems: "center",
},
disabledContent: {
    opacity: 0.9,
},
text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
},
icon: {
    marginHorizontal: 6,
},
loader: {
    marginHorizontal: 6,
},
});