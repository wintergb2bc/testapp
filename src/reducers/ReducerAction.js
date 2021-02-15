import storage from './../util/storage'
import ApiUrls from './../api/Apiurls'


export const getPromotionListInforAction = () => {
    return (dispatch, getState) => {
        // storage.load({
        //     key: 'PromotionLists',
        //     id: 'PromotionLists'
        // }).then(data => {
        //     dispatch({ type: 'PROMOTIONLISTINFORACTION', data })
        // }).catch(() => { })
        fetchRequest(ApiUrls.Promotions + '?promoCategory=&', 'GET').then(res => {
            if (res.isSuccess) {
                let promotionList = res.promotionList
                storage.save({
                    key: 'PromotionLists',
                    id: 'PromotionLists',
                    data: promotionList,
                    expires: null
                })
                return dispatch({ type: 'PROMOTIONLISTINFORACTION', data: promotionList })
            } else {
                return dispatch({ type: 'PROMOTIONLISTINFORACTION', data: [] })
            }
        }).catch((err) => {
            Toast.hide()
        })
    }
}