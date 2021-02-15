import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform, Modal, Image } from 'react-native'
import CodePush from 'react-native-code-push'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import { AndroidDeploymentKey, IosDeploymentKey } from './Domain'
import store from './store'
import Containers from './containers'






// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
// GLOBAL.Blob = null


const { width, height } = Dimensions.get('window')
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            deploymentKey: Platform.OS === 'android' ? AndroidDeploymentKey : IosDeploymentKey,
            isMandatory: false, //是否強制更新
            modalVisible: false,
            updataMsg: [],
            update: {}
        }
    }

    componentDidMount() {
        this.checkForUpdate()
        SplashScreen.hide()
        CodePush.allowRestart()
    }

    checkForUpdate() {
        CodePush.disallowRestart()//禁止重启  
        CodePush.checkForUpdate(this.state.deploymentKey).then(update => {
            if (update) {
                this.setState({
                    update,
                    isMandatory: update.isMandatory
                }, () => {
                    this.syncImmediate()
                })
            } else {
                // 没有可用的更新
            }
        })
    }

    syncImmediate() {
        this.setState({
            modalVisible: false
        })
        CodePush.sync(
            { deploymentKey: this.state.deploymentKey, updateDialog: false, installMode: CodePush.InstallMode.ON_NEXT_RESUME },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        )
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.syncMessage = 'Checking for update'
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.syncMessage = 'Downloading package'
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.syncMessage = 'Awaiting user action'
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.syncMessage = 'Installing update'
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.syncMessage = 'App up to date.'
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.syncMessage = 'Update cancelled by user'
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.syncMessage = 'Update installed and will be applied on restart.'
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.syncMessage = 'An unknown error occurred'
                Toast.showError('更新出错，请重启应用！')
                this.setState({ modalVisible: false })
                break;
        }
    }


    codePushDownloadDidProgress(progress) {
        if (progress.receivedBytes / progress.totalBytes) {
            const { update } = this.state
            let msgt = update.description
            let msg2 = msgt.split(',').join('\n')
            this.setState({
                modalVisible: true,
                updataMsg: msg2.split('-').filter(Boolean),
            })
        }
    }


    render() {
        const { modalVisible, updataMsg } = this.state
        return <Provider store={store}>
            <View style={styles.viewContaier}>
                <Modal animationType='fade' visible={modalVisible} transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.popBoxUpdata}>
                            <View style={styles.popBoxUpdataInforBox}>
                                <Text style={styles.popBoxUpdataInfor}>Cập Nhật Ứng Dụng</Text>
                            </View>

                            <View style={styles.updateTextBox}>
                                <Text style={styles.updateText1}>Tính Nă123113ng Mới </Text>
                                {
                                    updataMsg.length > 0 && updataMsg.map((v, i) => {
                                        return <Text key={i}>- {v}</Text>
                                    })
                                }
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    modalVisible: false
                                })
                                CodePush.restartApp()
                            }} style={styles.appUpdateBtn}>
                                <Text style={styles.appUpdateBtnText}>C12313ập Nhật Ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Containers></Containers>
            </View>
        </Provider>
    }
}

const styles = StyleSheet.create({
    viewContaier: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'red'
    },
    modalContainer: {
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    popBoxUpdata: {
        width: width - 40,
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingVertical: 15
    },
    popBoxUpdataInforBox: {
        alignItems: 'center',
        paddingBottom: 15
    },
    popBoxUpdataInfor: {
        color: '#25AAE1',
        fontSize: 16,
        fontWeight: 'bold'
    },
    fundownload: {
        width: width - 430,
        height: (width - 40) * .667,
    },
    appUpdateBtn: {
        backgroundColor: '#25AAE1',
        width: width - 60,
        marginHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    appUpdateBtnText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    updateTextBox: {
        paddingHorizontal: 10,
        marginVertical: 15
    },
    updateText1: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    updateText2: {
        color: '#000',
    },
    popBoxUpdata1: {
        width: width - 40,
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingBottom: 10
    },
    updateTextBox1: {
        marginVertical: 10
    },
    updateText3: {
        color: '#000',
        textAlign: 'center',
        marginBottom: 10
    }
})

/**
 * Configured with a MANUAL check frequency for easy testing. For production apps, it is recommended to configure a
 * different check frequency, such as ON_APP_START, for a 'hands-off' approach where CodePush.sync() does not
 * need to be explicitly called. All options of CodePush.sync() are also available in this decorator.
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL }

App = CodePush(codePushOptions)(App)

export default App