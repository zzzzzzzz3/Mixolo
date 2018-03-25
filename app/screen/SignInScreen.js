import React, {Component} from 'react'
import BaseScreen from "./BaseScreen";
import {
    View,
    Text,
    TextInput,
    Keyboard,
} from "react-native";
import {connect} from "react-redux";
import Color from "../style/Color";
import NavigationActions from "react-navigation/src/NavigationActions";
import DoubleButton from "../component/DoubleButton";
import {Toast} from 'antd-mobile'
import {createAction} from "../utils";
import TextButton from "../component/TextButton";
import AppUtil from "../utils/AppUtil";
import styles from '../style/SignInScreenStyle'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import TextUtil from "../utils/TextUtil";


@connect()
export default class SignInScreen extends BaseScreen {


    componentWillMount() {
        if (AppUtil.isAnfroid()) {
            this.keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
            this.keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        } else {
            this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardDidShow);
            this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardDidHide);
        }
    }

    componentWillUnmount() {
        this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    }

    //键盘弹起后执行
    keyboardDidShow = (event) => {
        console.log("keyboard=====================================show")
    };

//键盘收起后执行
    keyboardDidHide = (event) => {
        console.log("keyboard=====================================hide")
    };


    signUp = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'SignUp'}))
    };


    signIn = () => {
        if (TextUtil.isEmpty(this.state.email)) {
            Toast.info('Please enter email.', 1)
        } else if (!TextUtil.isEmail(this.state.email)) {
            Toast.info('Please enter valid email.', 1)
        } else if (TextUtil.isEmpty(this.state.password)) {
            Toast.info('Please enter password.', 1)
        } else {
            this.props.dispatch(createAction('app/login')({Username: this.state.email, Password: this.state.password}))
        }
    };

    forgotPass = () => {
        Toast.info('forgot password', 1)
    };

    onEmailChange = (email) => {
        this.setState({
            email: email
        });
    };

    onPassworkChange = (pass) => {
        this.setState({
            password: pass
        });
    };

    renderNavbar() {
        return null
    }

    /**
     * 渲染主布局
     * */
    renderContent() {
        return (
            <KeyboardAwareScrollView
                style={styles.scrollContainer}
                resetScrollToCoords={{x: 0, y: 0}}
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >

                <Text style={styles.logo}>mixolo</Text>
                <DoubleButton
                    style={styles.labelButton}
                    title='GO SOLO'
                />

                {/* Email */}
                <Input
                    hint={'Email'}
                    onChangeText={this.onEmailChange}
                />
                {/* password */}
                <Input
                    hint={'Password'}
                    onChangeText={this.onPassworkChange}
                    isPassword={true}
                />
                {/* forgot password */}
                <View
                    style={{width: 270}}
                >
                    <TextButton
                        onPress={this.forgotPass}
                        title="Forgot password?"
                        style={styles.forgot}
                    />
                </View>
                {/* sign in */}
                <DoubleButton
                    onPress={this.signIn}
                    style={styles.button}
                    title='SIGN IN'
                />
                <TextButton
                    title={"Don't have an account? Sign up"}
                    onPress={this.signUp}
                    style={styles.bottom}
                />


            </KeyboardAwareScrollView>
        )
    }

}

class Input extends Component {

    static defaultProps={
      isPassword:false
    };

    render() {
        return (
            <DoubleButton
                frontColor={Color.white}
                backColor={Color.BabyBlue}
                style={styles.button}
                content={(

                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholderTextColor={Color.red}
                        placeholder={this.props.hint}
                        onChangeText={this.props.onChangeText}
                        numberOfLines={1}
                        secureTextEntry={this.props.isPassword}
                        style={styles.input}/>

                )}
            />
        )
    }
}