import React from 'react'
import { TouchableOpacity, Platform, BackHandler, StyleSheet, Text, Image, Dimensions, View, NativeEventEmitter, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import { Stack, Scene, Router, Actions, Lightbox, Modal, ActionConst } from 'react-native-router-flux'
import ApiUrls from './../api/Apiurls'

import TabIcon from './TabIcon'
import Home from './Home'
import DailyDeals from "./DailyDeals";
const { width, height } = Dimensions.get('window')

const RouterWithRedux = connect()(Router)


class Containers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderRightCSButton() {
        return <TouchableOpacity style={styles.homeCsWrap} onPress={() => {
            Actions.LiveChat()
        }}>
            {/* <Image resizeMode='stretch' source={require('./../images/tabberIcon/whiteCS.png')} style={styles.homeCSImg}></Image> */}
            <Text style={styles.homeCsText}>Live Chat</Text>
        </TouchableOpacity>
    }

    render() {
        return <RouterWithRedux
            navigationBarStyle={[styles.navBar, { backgroundColor: 'red' }]}
            titleStyle={styles.navTitle}
            sceneStyle={styles.routerScene}
            //backAndroidHandler={onBackPress}
            onStateChange={(router1, router2, state) => {

            }}
        >
            <Modal key='modal' hideNavBar>
                <Lightbox key='lightbox'>
                    <Stack key='root' headerLayoutPreset={'center'}>
                        <Stack
                            initial={this.props.scene === 'drawer'}
                            hideNavBar
                            key='drawer'
                            navigationBarStyle={{ backgroundColor: ApiUrls.IsUsrLogin ? 'green' : 'blue', borderBottomWidth: 0 }}
                            type={ActionConst.REPLACE}
                        >
                            <Scene
                                key='tabbar'
                                tabs={true}
                                hideNavBar
                                tabBarPosition='bottom'
                                showLabel={false}
                                tabBarStyle={[styles.tabBarStyle, { backgroundColor: '#fff' }]}
                                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                            >
                                <Scene
                                    key='home'
                                    component={Home}
                                    icon={TabIcon}
                                    // renderTitle={() => {
                                    //     return <Image resizeMode='stretch' source={homeLogoImg} style={styles.homeLogo} />
                                    // }}
                                    renderRightButton={this.renderRightCSButton.bind(this)}
                                // onEnter={() => {
                                //     window.PiwikMenberCode('Home_bottomnav')
                                //     window.makeHomePageAnimatable && window.makeHomePageAnimatable(15)
                                // }}
                                />
                                <Scene
                                    key='promotionLogin'
                                    component={Home}
                                    icon={TabIcon}
                                    titleStyle={styles.titleStyle}
                                    title='KHUYẾN MÃI'
                                    renderRightButton={this.renderRightCSButton.bind(this)}
                                // onEnter={() => {
                                //     window.PiwikMenberCode('Promo_bottomnav')
                                //     window.makePromotionPageAnimatable && window.makePromotionPageAnimatable(window.mainPageIndex > 1 ? 8 : -8)
                                // }}
                                />
                                <Scene
                                    key='Finance'
                                    component={DailyDeals}
                                    icon={TabIcon}
                                    titleStyle={styles.titleStyle}
                                    title='GỬI TIỀN'
                                    renderRightButton={this.renderRightCSButton.bind(this)}
                                // tabBarOnPress={() => {
                                //     this.props.getBalanceInforAction()
                                //     window.goFinancePage()
                                //     window.PiwikMenberCode('Bank_bottomnav')
                                // }}
                                // onEnter={() => {
                                //     window.makeFinancePageAnimatable && window.makeFinancePageAnimatable(window.mainPageIndex > 2 ? 8 : -8)
                                // }}
                                />
                                <Scene
                                    key='news'
                                    component={Home}
                                    icon={TabIcon}
                                    titleStyle={styles.titleStyle}
                                    title='HỘP THƯ'
                                    renderRightButton={this.renderRightCSButton.bind(this)}
                                // onEnter={() => {
                                //     window.PiwikMenberCode('Notification_bottomnav')
                                //     window.makeMessagePageAnimatable && window.makeMessagePageAnimatable(window.mainPageIndex > 3 ? 8 : -8)
                                // }}
                                />
                                <Scene
                                    key='PersonalAccount'
                                    title='HỒ SƠ'
                                    renderRightButton={this.renderRightCSButton.bind(this)}
                                    component={Home}
                                    icon={TabIcon}
                                    titleStyle={styles.titleStyle}
                                // onEnter={() => {
                                //     window.makePersonalAccountPageAnimatable && window.makePersonalAccountPageAnimatable(-15)
                                //     window.PiwikMenberCode('Profile_bottomnav')
                                // }}
                                />
                            </Scene>
                        </Stack>


                        <Scene
                            key='WithdrawalVerification'
                            component={Home}
                            titleStyle={styles.titleStyle}
                            back
                            backButtonTintColor='#fff'
                            renderLeftButton={() => {
                                return null
                            }}
                            renderRightButton={this.renderRightCSButton.bind(this)}
                        />
                    </Stack>
                </Lightbox>


                {/* <Stack
                key='DepositPageStack'
                back
                backButtonTintColor='#fff'
                titleStyle={styles.titleStyle}
                headerLayoutPreset={'center'}
                renderRightButton={this.renderRightCSButton.bind(this)}
            >
                <Scene key='DepositPageStack' component={DepositPage} />
            </Stack> */}
            </Modal>
        </RouterWithRedux>
    }
}
const styles = StyleSheet.create({
    navBar: {
        height: 45,
        color: '#fff'
    },
    navBarBX: {
        height: 0,
        borderColor: '#000',
        borderBottomWidth: 0,
    },
    routerScene: {
        padding: 0
    },
    navTitle: {
        color: 'white'
    },
    tabBarStyle: {
        height: 57
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#fff',
    },
    titleStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    homeCsWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    homeCSImg: {
        width: 26,
        height: 22
    },
    homeCsText: {
        color: '#fff',
        fontSize: 12,
    },
    homeLogo: {
        width: .35 * width,
        height: .08 * width,
    },
})

export default Containers