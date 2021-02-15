import React from 'react'
import { Linking, Modal, StyleSheet, Text, Image, ActivityIndicator, View, Platform, ScrollView, Dimensions, TouchableOpacity, PermissionsAndroid, NativeModules, RefreshControl, DeviceEventEmitter, ImageBackground } from 'react-native'
import fetchRequest from './../../api'
import ApiUrls from './../../api/Apiurls'
// import storage from './../../util/storage'
const { width, height } = Dimensions.get('window')
class DailyDeals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            promotionList: []
        }
    }

    componentDidMount() {
        this.getPromotionList()
    }

    getPromotionList() {
        // storage.load({
        //     key: 'promotionList',
        //     id: 'promotionList'
        // }).then(promotionList => {
        //     this.setState({
        //         promotionList
        //     })
        // }).catch(() => { })
        // Toast.loading('数据加载中，请稍后', 2000)
        
        fetchRequest(ApiUrls.DailyDealsPromotion, 'GET').then(res => {
            // Toast.hide()
            if (res.isSuccess) {
                this.setState({
                    promotionList: res.result
                })
                // storage.save({
                //     key: 'promotionList',
                //     id: 'promotionList',
                //     data: res.promotionList,
                //     expires: null
                // })
            }
        })
    }


    render() {
        const { promotionList } = this.state
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
                    promotionList.length > 0 && promotionList.map((v, i) => {
                        return <TouchableOpacity
                        onPress={() => {
                            //alert(1)
                        }}
                        style={styles.promotionListImg} key={i}>
                            <Image
                                resizeMode='stretch'
                                source={{ uri: v.homePageImagePath }}
                                style={styles.promotionListImg}
                            ></Image>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        </View>
    }
}

export default DailyDeals

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