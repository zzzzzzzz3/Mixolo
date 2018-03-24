import {StyleSheet} from "react-native";
import Color from "./Color";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.Teal
    },
    logo: {
        fontSize: 80,
        fontWeight: '800',
        marginTop: '20%',
        color: Color.white
    },
    labelButton: {
        width: 200,
        height: 50,
        marginBottom:30
    },
    labelBtnText: {
        fontSize: 22,
        fontWeight: '500',
        color: Color.white
    },
    bottom: {
        position:'absolute',
        bottom:15
    },
});