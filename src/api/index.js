import { ApiDomain } from '../Domain'
import ApiUrls from './Apiurls'

let apiVersion = '?api-version=2.0&brand=Fun88&Platform=' + Platform.OS

export default fetchRequest = (url, method, params = '') => {
    let requestURl = ApiDomain + url + apiVersion
    let headers = {
        'Content-Type': 'application/json charset=utf-8',
        'Culture': 'vi-vn'
    }
    if (ApiUrls.IsUsrLogin) {
        headers.Authorization = ApiUrls.Token
    }

    let requestBody = {
        method,
        headers
    }
    if (params) {
        body.body = JSON.stringify(params)
    }

    return fetch(requestURl, requestBody, method).then(res => res.json()).then(res => {
        return res
    }).catch(err => {
    })
}