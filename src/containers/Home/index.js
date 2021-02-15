import React from 'react'
import { Linking, Modal, StyleSheet, Text, Image, ActivityIndicator, View, Platform, ScrollView, Dimensions, TouchableOpacity, PermissionsAndroid, NativeModules, RefreshControl, DeviceEventEmitter, ImageBackground } from 'react-native'
import fetchRequest from './../../api'
import ApiUrls from './../../api/Apiurls'
import { Actions } from 'react-native-router-flux'
import storage from './../../util/storage'
import { connect } from 'react-redux'
import { getPromotionListInforAction } from './../../reducers/ReducerAction'
import store from './../../store'

const { width, height } = Dimensions.get('window')
class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            promotionList: []
        }
    }

    componentDidMount() {
        store.subscribe(this.handleStoreChange)
        this.props.getPromotionListInforAction()
        //this.getPromotionList()
        //console.log(store.getState(), 1)
    }

    handleStoreChange() {
        console.log(234234, store.getState())
       // this.setState(store.getState());
    }    

    getPromotionList() {
        storage.load({
            key: 'promotionList',
            id: 'promotionList'
        }).then(promotionList => {
            this.setState({
                promotionList
            })
        }).catch(() => { })
        // Toast.loading('数据加载中，请稍后', 2000)

        fetchRequest(ApiUrls.Promotions, 'GET').then(res => {
            // Toast.hide()
            if (res.isSuccess) {
                this.setState({
                    promotionList: res.promotionList
                })
                storage.save({
                    key: 'promotionList',
                    id: 'promotionList',
                    data: res.promotionList,
                    expires: null
                })
            }
        })
    }


    render() {
        const { promotionList } = this.state
        const { promotionListData } =this.props
       // console.log(store.getState(), 2)
        return <View style={styles.viewContaier}>
            <ScrollView
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         tintColor={'#25AAE1'}
            //         onRefresh={this.refreshingHome.bind(this)}
            //     />
            // }
            >
                {
                    promotionListData.length > 0 && promotionListData.map((v, i) => {
                        return <TouchableOpacity
                            onPress={() => {
                                ApiUrls.IsUsrLogin = !ApiUrls.IsUsrLogin
                                Actions.WithdrawalVerification()
                            }}
                            style={styles.promotionListImg} key={i}>
                            <Image
                                resizeMode='stretch'
                                source={{ uri: v.thumbnailImage }}
                                style={styles.promotionListImg}
                            ></Image>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        </View>
    }
}

export default Home = connect(
	(state) => {
		return {
			promotionListData: state.promotionListData
		}
	}, (dispatch) => {
		return {
			getPromotionListInforAction: () => dispatch(getPromotionListInforAction())
		}
	}
)(HomeContainer)

const styles = StyleSheet.create({
    viewContaier: {
        flex: 1,
        backgroundColor: 'blue'
    },
    promotionListImg: {
        width: width - 20,
        height: 140,
    }
})