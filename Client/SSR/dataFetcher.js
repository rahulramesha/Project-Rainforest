import { fetchItem, fetchItemsForHome } from '../store/actions/item'

export default function fetchData(store, req, callback) {
    if(req.path.match(/^\/ssr\/item/)) {
        const itemId = req.query.itemId;
        store.dispatch(fetchItem(itemId, process.env.STATIC_URL, process.env.HOST_NAME)).then(callback)
    } else if(req.path.match(/^\/ssr\/home/)) {
        store.dispatch(fetchItemsForHome('Kitchen', process.env.STATIC_URL, process.env.HOST_NAME)).then(callback)
    } else {
        callback()
    }
}