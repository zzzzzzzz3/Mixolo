import Color from "./Color";
import {StyleSheet} from 'react-native'
import AppUtil from "../utils/AppUtil";

export default styles = StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor:Color.Teal
    },
    container:{
        height:AppUtil.windowHeight,
        alignItems:'center',
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
    input: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.darkgray,
        flex: 1,
        paddingHorizontal: 30,
        alignSelf:'center'
    },
    forgot: {
        marginVertical: 15,
        alignSelf: 'flex-end',
    },
    button: {
        width: 270,
        height: 60,
        marginTop: 10
    },
    bottom: {
        position:'absolute',
        bottom:15,
        alignSelf:'center'
    },
});