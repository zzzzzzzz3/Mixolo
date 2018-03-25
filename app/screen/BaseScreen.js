import React, {PureComponent} from 'react'
import {StatusBar, StyleSheet, View} from "react-native";
import NavigationBar from "../component/NavigationBar";
import {NavigationActions} from '../utils'
import Color from "../style/Color";
import AppUtil from "../utils/AppUtil";
import {Toast} from "antd-mobile";

export default class BaseScreen extends PureComponent {

    constructor(props) {
        super(props);

        // 绘制内容
        this.renderContent = this.renderContent.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);
        this.leftPress = this.leftPress.bind(this);
        this.rightPress = this.rightPress.bind(this);
        this.showLeft = this.showLeft.bind(this);
        this.showRight = this.showRight.bind(this);
        this.renderTitle = this.renderTitle.bind(this);

        //状态栏
        this.state = {
            animated: true,
            backgroundColor: Color.status_bar,
            barStyle: 'dark-content',
            networkActivityIndicatorVisible: false,
            hidden: true,
            showHideTransition: 'fade'
        }
    }

    //隐藏所有正在显示的toast
    componentWillUnmount() {
        Toast.hide();
    }

    //状态栏占位
    statusBar() {
        if (this.state.hidden) {
            return null
        } else {
            return (<View style={basestyles.statubar}/>)
        }
    }

    render() {
        return (
            <View style={basestyles.container}>
                <StatusBar
                    backgroundColor={this.state.backgroundColor}
                    translucent={this.state.translucent}
                    hidden={this.state.hidden}
                    showHideTransition={this.state.showHideTransition}
                    animated={this.state.animated}
                    barStyle={this.state.barStyle}
                    networkActivityIndicatorVisible={this.state.networkActivityIndicatorVisible}
                >
                </StatusBar>
                {this.statusBar()}
                {this.renderNavbar()}
                {this.renderContent()}
            </View>
        )
    }

    /**
     * 绘制导航栏
     * */
    renderNavbar() {
        return (
            <NavigationBar
                onLeftPress={this.leftPress}
                onRightPress={this.rightPress}
                title={this.props.title}
                rightIcon={this.rightIcon()}
                leftIcon={this.leftIcon()}
                showLeft={this.showLeft()}
                showRight={this.showRight()}
                titleContent={this.renderTitle()}
            />
        )
    }

    //绘制导航栏的标题部分
    renderTitle() {
        return null
    }

    //左边icon的点击事件
    leftPress() {
        this.props.dispatch(NavigationActions.back())
    }

    //右边icon的点击事件
    rightPress() {
    }

    /**
     * 绘制UI组件主体View
     */
    renderContent() {
        return null
    }

    //是否显示左边icon
    showLeft() {
        return false
    }

    //是否显示右边icon
    showRight() {
        return false
    }

    //左边的icon样式
    rightIcon() {
        return null
    }

    //右边的icon样式
    leftIcon() {
        return {name: 'angle-left', size: 25, color: Color.white}
    }
}

const h = AppUtil.isAnfroid() ? 0 : 20;

const basestyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    statubar: {
        width: '100%',
        height: h,
        backgroundColor: Color.status_bar
    },
});