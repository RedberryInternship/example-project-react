import{ Text, TextInput} from "react-native"

export default {
    m4 : 4,
    m8 : 8,
    m16 : 16,
    m32 : 32,
}

Text.defaultProps= Text.defaultProps || {}
TextInput.defaultProps = TextInput.defaultProps || {};

Text.defaultProps.allowFontScaling = false;
Text.defaultProps.style={letterSpacing: 0.2}

TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.style={letterSpacing: 0.2} ;