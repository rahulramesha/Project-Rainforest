import axios from '../defaultAxios'

export const fetchItem = (itemId, staticUrl, host) => async (dispatch) => {
    if(!itemId) return
    try{
        let itemData
        if(staticUrl && host) {
            itemData = await axios.get(`${staticUrl}/api/item?itemId=${itemId}`, {
                headers: {
                    Host: host
                }
            })
        } else {
            itemData = await axios.get(`/api/item?itemId=${itemId}`)
        }
        
        
        dispatch(getItemSuccess(itemData.data))
    } catch(err) {
        console.log(err)
    }
}

export const fetchItemsForHome = (category, staticUrl, host) => async (dispatch) => {
    if(!category) return
    try{
        let itemList
        if(staticUrl && host) {
            itemList = await axios.get(`${staticUrl}/api/filteredItems?category=${category}`, {
                headers: {
                    Host: host
                }
            })
        } else {
            itemList = await axios.get(`/api/filteredItems?category=${category}`)
        }
        
        dispatch(getItemList(itemList.data))
    } catch(err) {
        console.log(err)
    }
}

const getItemSuccess = (itemData) => {
    return {
        type: 'GET_ITEM_SUCCESS',
        payload: itemData
    }
}

const getItemList = (itemslist) => {
    return {
        type: 'GET_ITEMS_FOR_HOME',
        payload: itemslist
    }
}
