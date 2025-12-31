import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {

View,
TextInput,
Text,
TouchableOpacity,
StyleSheet,
TextInputProps,
ViewStyle,
TextStyle,
NativeSyntheticEvent,
TextInputSubmitEditingEventData,
} from "react-native";

type CustomTextInputProps = {
label?: string;
error?: string | null;
leftIcon?: React.ReactNode;
rightIcon?: React.ReactNode;
containerStyle?: ViewStyle;
inputStyle?: TextStyle;
labelStyle?: TextStyle;
errorStyle?: TextStyle;
showPasswordToggle?: boolean;
onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
} & TextInputProps;

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>((props, ref) => {
const {
    label,
    error = null,
    leftIcon,
    rightIcon,
    containerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    secureTextEntry,
    showPasswordToggle = true,
    style,
    onSubmitEditing,
    ...rest
} = props;

const inputRef = useRef<TextInput | null>(null);
useImperativeHandle(ref, () => inputRef.current as TextInput);

const [isSecure, setIsSecure] = useState(!!secureTextEntry);

const toggleSecure = () => {
    setIsSecure((s) => !s);
};

return (
    <View style={[styles.container, containerStyle]}>
        {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
        <View style={[styles.inputRow, error ? styles.inputError : null]}>
            {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
            <TextInput
                ref={inputRef}
                style={[styles.input, inputStyle, style]}
                secureTextEntry={isSecure}
                placeholderTextColor="#9AA0A6"
                underlineColorAndroid="transparent"
                returnKeyType="done"
                onSubmitEditing={onSubmitEditing}
                {...rest}
            />
            {rightIcon ? (
                <View style={styles.iconRight}>{rightIcon}</View>
            ) : secureTextEntry && showPasswordToggle ? (
                <TouchableOpacity onPress={toggleSecure} style={styles.iconRight}>
                    <Text style={styles.toggleText}>{isSecure ? "Show" : "Hide"}</Text>
                </TouchableOpacity>
            ) : null}
        </View>
        {error ? <Text style={[styles.errorText, errorStyle]}>{error}</Text> : null}
    </View>
);
});

const styles = StyleSheet.create({
container: {
    marginVertical: 8,
},
label: {
    marginBottom: 6,
    color: "#222",
    fontSize: 14,
},
inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    minHeight: 44,
},
inputError: {
    borderColor: "#E53935",
},
iconLeft: {
    marginRight: 8,
},
iconRight: {
    marginLeft: 8,
    padding: 6,
},
input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    paddingVertical: 8,
},
toggleText: {
    color: "#007AFF",
    fontSize: 14,
},
errorText: {
    marginTop: 6,
    color: "#E53935",
    fontSize: 13,
},
});

export default CustomTextInput;