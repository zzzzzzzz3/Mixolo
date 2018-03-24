import React, {Component} from 'react'
import BaseScreen from "./BaseScreen";
import {
    View,
    Text,
    TextInput,
    ScrollView,
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
        this._scrollView.scrollTo({x: 0, y: 100, animated: true});
    };

//键盘收起后执行
    keyboardDidHide = (event) => {
        this._scrollView.scrollTo({x: 0, y: 0, animated: true});
    };


    signUp = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'SignUp'}))
    };


    signIn = () => {
        this.props.dispatch(createAction('app/login')({email: this.state.email, password: this.state.password}))
    };

    forgotPass = () => {
        Toast.info('forgot password', 1)
    };

    onEmailChange = (email) => {
        this.setState(previousState => {
            return {...previousState, email: email};
        });
    };

    onPassworkChange = (pass) => {
        this.setState(previousState => {
            return {...previousState, password: pass};
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
            <ScrollView
                style={styles.scrollContainer}
                ref={component => this._scrollView = component}
                scrollEnabled={false}
                keyboardShouldPersistTaps='always'
            >
                <View style={styles.container}>
                    <Text style={styles.logo}>mixolo</Text>
                    <DoubleButton
                        style={styles.labelButton}
                        title='GO SOLO'
                    />

                    {/* Email */}
                    <Input
                        hint={'Email'}
                        onTextChange={this.onEmailChange}
                    />
                    {/* password */}
                    <Input
                        hint={'Password'}
                        onTextChange={this.onPassworkChange}
                    />
                    {/* forgot password */}
                    <View
                        style={{width:270}}
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
                </View>

            </ScrollView>
        )
    }

}

class Input extends Component {

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
                        style={styles.input}/>

                )}
            />
        )
    }
}