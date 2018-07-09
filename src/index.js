'use strict'
import {ruleFunctions} from './checkers'
import * as rules from '../database/rules.json'
import * as products from '../database/products.json'

export const memotized = function () {
    let orderList = []

    function addRule(order, rulesList = rules.rulesList) {
        orderList.push(order)

        let applicableRulesList = rulesList.filter(rule => rule.condition.sku === order.SKU)
        let applicableOrders = orderList.filter(orderItem => orderItem.SKU === order.SKU)
        let nonApplicableOrders = orderList.filter(orderItem => orderItem.SKU !== order.SKU)
        let newOrders = makeTree(applicableOrders, applicableRulesList)

        return [...nonApplicableOrders, ...newOrders]
    }
    return addRule
}

export function makeTree(orderList, ruleList) {
    // consider rule List is sorted by priority
    // apply rule 0
    let rule = ruleList.shift()
    // Divide orderList into two groups. one which has this rule applicable and other which is not
    if (rule === undefined || rule.length === 0) {
        return orderList
    } else {
        let nodes = divideOrderList(orderList, rule)
        let returnOrderList = []

        if (nodes[0].length > 0)
            returnOrderList = [...returnOrderList, ...nodes[0]]

        if (nodes[1].length > 0) {
            let returnMakeTree = makeTree(nodes[1], ruleList)
            returnOrderList = [...returnOrderList, ...returnMakeTree]
        }
        return returnOrderList
    }
}

export function divideOrderList(orderList, rule) {
    return ruleFunctions[rule.header.functionName](orderList, rule)
}

export function calculateBill(orderList, productList = products.productList) {
    return orderList.map(order => {
        if (order.action && order.action.discount.type === 'item') {
            order.discountItem = order.action.discount.value
        }
        if (order.action && order.action.discount.type === 'flat') {
            order.discountedPrice = order.action.discount.value
        }
        if (order.action && order.action.discount.type === 'percentage') {
            const price = productList.filter(product => product.SKU === order.SKU)[0].Price
            order.discountedPrice = price - (price * order.action.discount.value / 100)
        }
        return order
    })
}
