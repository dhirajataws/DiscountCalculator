const ruleFunctions = {
    atv_3for2(orderList, rule) {
        let quantity = orderList.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
        let allowedQuantity = quantity - (quantity % rule.condition.thresholdValue)
        let orderListWithPriority = []
        while (allowedQuantity) {
            let order = orderList.shift()
            order.discountName = rule.header.name;
            order.action = rule.action;

            allowedQuantity = allowedQuantity - order.quantity
            orderListWithPriority.push(order)
        }
        const returnOrderList = []
        returnOrderList.push(orderListWithPriority)
        returnOrderList.push(orderList)
        return returnOrderList
    },
    SuperIpad_4(orderList, rule) {
        let quantity = orderList.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
        const returnOrderList = []
        if (quantity > rule.condition.thresholdValue) {
            let ruleAddedOrderlist = orderList.map(order =>
                Object.assign({}, order, {discountName: rule.header.name}, {action: rule.action})
            )
            returnOrderList.push(ruleAddedOrderlist)
            returnOrderList.push([])
        } else {
            returnOrderList.push([])
            returnOrderList.push(orderList)
        }
        return returnOrderList
    },
    MacBookPro_VGA(orderList, rule) {
        let ruleAddedOrderlist = orderList.map(order =>
            Object.assign({}, order, {discountName: rule.header.name}, {action: rule.action})
        )
        return [ruleAddedOrderlist, []]
    }
}

export {ruleFunctions}