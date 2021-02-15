export const promotionListData = (state = [], action) => {
    switch (action.type) {
        case 'PROMOTIONLISTINFORACTION':
            return state = action.data
        default:
            return state
    }
}