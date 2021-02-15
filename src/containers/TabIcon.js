import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'

const AnimatableView = Animatable.View
const { width } = Dimensions.get('window')
// const getModel = DeviceInfo.getModel()
const IsNotIphoneX = Platform.OS === 'ios' && false
class TabIconContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newsStatistics: false
        }
    }

    handleViewRef = ref => this.view = ref

    render() {
        let selected = this.props.focused
        let data = {
            home: {
                title: `TRANG CHỦ`,
                icon: !selected ? require('./../images/tabberIcon/home.png') : require('./../images/tabberIcon/homeActive.png')
            },
            promotionLogin: {
                title: `KHUYẾN MÃI`,
                icon: !selected ? require('./../images/tabberIcon/promotionLogin.png') : require('./../images/tabberIcon/promotionLoginActive.png')
            },
            promotionLogout: {
                title: `KHUYẾN MÃI`,
                icon: !selected ? require('./../images/tabberIcon/promotionLogout.png') : require('./../images/tabberIcon/promotionLogoutActive.png')
            },
            Finance: {
                title: `NGÂN HÀNg`,
                icon: !selected ? require('./../images/tabberIcon/deposit.png') : require('./../images/tabberIcon/depositActive.png')
            },
            depositLogout: {
                title: `NGÂN HÀNg`,
                icon: !selected ? require('./../images/tabberIcon/deposit.png') : require('./../images/tabberIcon/depositActive.png')
            },
            news: {
                title: `HỘP THƯ`,
                icon: !selected ? require('./../images/tabberIcon/notice.png') : require('./../images/tabberIcon/noticeActive.png')
            },
            PersonalAccount: {
                title: `HỒ SƠ`,
                icon: !selected ? require('./../images/tabberIcon/manager.png') : require('./../images/tabberIcon/managerActive.png')
            },
            login1: {
                title: `ĐĂNG NHẬP`,
                icon: !selected ? require('./../images/tabberIcon/login1.png') : require('./../images/tabberIcon/login1.png')
            },
            join: {
                title: `THAM GIA${'\n'}NGAY`,
                icon: !selected ? require('./../images/tabberIcon/join.png') : require('./../images/tabberIcon/join.png')
            },
        }
        let navigationKey = this.props.navigation.state.key
        let param = data[navigationKey]
        let isCenterTabbar = navigationKey === 'Finance' || navigationKey === 'join'
        const tabBarStyle = [
            styles.tabbarContainer,
            {
                borderColor: isCenterTabbar ? (selected ? '#25AAE1' : '#F0F0F0') : (selected ? 'transparent' : 'transparent'),
                borderTopColor: isCenterTabbar ? (selected ? '#25AAE1' : '#F0F0F0') : (selected ? '#00AEEF' : 'transparent'),
                backgroundColor: isCenterTabbar ?
                    selected ? '#25AAE1' : '#FFF' :
                    selected ? 'transparent' : 'transparent'

            },
            styles[`tabbarContainer${navigationKey}`]
        ]
        const tabBarTextStyle = [
            styles.tabbarItem,
            {
                color: isCenterTabbar ?
                    (selected ? '#FFF' : '#7F7F7F')
                    :
                    (selected ? '#25AAE1' : 'rgba(0, 0, 0, .5)')
            }
        ]

        return selected
            ?
            <AnimatableView
                animation={'pulse'}
                easing='ease-out'
                iterationCount='infinite'
                style={tabBarStyle}>
                {
                    navigationKey === 'news' && this.state.newsStatistics > 0 && ApiPort.UserLogin && <Image
                        source={require('./../images/tabberIcon/Notificationgif.gif')}
                        style={styles.newsCircle}
                        resizeMode='stretch'></Image>
                }
                <Image resizeMode='stretch' style={[styles.tabIconImg, styles[`tabIconImg${navigationKey}`]]} source={param.icon} />
                <Text transition={['color']} style={tabBarTextStyle}>{param.title.toLocaleUpperCase()}</Text>
            </AnimatableView>
            :
            <View
                style={tabBarStyle}>
                {
                    navigationKey === 'news' && this.state.newsStatistics > 0 && ApiPort.UserLogin && <Image
                        source={require('./../images/tabberIcon/Notificationgif.gif')}
                        style={styles.newsCircle}
                        resizeMode='stretch'></Image>
                }
                <Image resizeMode='stretch' style={[styles.tabIconImg, styles[`tabIconImg${navigationKey}`]]} source={param.icon} />
                <Text transition={['color']} style={tabBarTextStyle}>{param.title.toLocaleUpperCase()}</Text>
            </View>
    }
}

export default TabIcon = connect(
    (state) => {
        return {

        }
    }, (dispatch) => {
        return {}
    }
)(TabIconContainer)

const styles = StyleSheet.create({
    tabbarContainer: {
        flex: 1,
        width: width / 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,
        paddingTop: IsNotIphoneX ? 2 : 5,
    },
    tabbarContainerFinance: {
        zIndex: 1000,
        flex: 0,
        width: (width / 5) * 1.03,
        height: (width / 5) * 1.03,
        borderRadius: 1000,
        justifyContent: 'center',
        borderWidth: 1,
        shadowColor: '#00000029',
        shadowOpacity: .6,
        shadowOffset: { left: 10, right: 10, top: 10, bottom: 10 },
        shadowRadius: 6,
        elevation: 4
    },
    tabbarContainerjoin: {
        flex: 0,
        width: (width / 5) * 1.03,
        height: (width / 5) * 1.03,
        borderRadius: 1000,
        justifyContent: 'center',
        borderWidth: 1,
        shadowColor: '#00000029',
        shadowOpacity: .6,
        shadowOffset: { left: 10, right: 10, top: 10, bottom: 10 },
        shadowRadius: 4,
        elevation: 4
    },
    newsCircle: {
        width: 18,
        height: 18,
        // backgroundColor: '#FF0000',
        // borderWidth: 1,
        // borderColor: '#FF4D4D',
        // borderRadius: 100,
        position: 'absolute',
        top: 4,
        right: 16,
        zIndex: 100
    },
    tabIconImg: {
        width: 28,
        height: 28,
        marginBottom: 4,
    },
    tabIconImghome: {
        width: 35
    },
    tabIconImgpromotionLogout: {
        width: 36
    },
    tabIconImglogin1: {
        width: 32
    },
    tabIconImgpromotionLogin: {},
    tabIconImgFinance: {
        width: 34,
        height: 34,
        marginTop: -15
    },
    tabIconImgjoin: {
        marginTop: IsNotIphoneX ? -5 : -10
    },
    tabIconImgFinance: {
        marginTop: IsNotIphoneX ? -5 : -10,
        paddingTop: 0
    },
    tabbarItem: {
        fontSize: 10,
        fontWeight: '900',
        textAlign: 'center'
    }
})