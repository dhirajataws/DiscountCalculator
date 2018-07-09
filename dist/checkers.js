"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ruleFunctions = {
    atv_3for2: function atv_3for2(orderList, rule) {
        var quantity = orderList.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.quantity;
        }, 0);
        var allowedQuantity = quantity - quantity % rule.condition.thresholdValue;
        var orderListWithPriority = [];
        while (allowedQuantity) {
            var order = orderList.shift();
            // TODO do we actually need setting order.priority
            // order.priority = rule.header.priority
            order.discountName = rule.header.name;
            order.action = rule.action;
            allowedQuantity = allowedQuantity - order.quantity;
            orderListWithPriority.push(order);
        }
        var returnOrderList = [];
        returnOrderList.push(orderListWithPriority);
        returnOrderList.push(orderList);
        return returnOrderList;
    },
    SuperIpad_4: function SuperIpad_4(orderList, rule) {
        var quantity = orderList.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.quantity;
        }, 0);
        var returnOrderList = [];
        if (quantity > rule.condition.thresholdValue) {
            var ruleAddedOrderlist = orderList.map(function (order) {
                return Object.assign({}, order, { discountName: rule.header.name }, { action: rule.action });
            });
            returnOrderList.push(ruleAddedOrderlist);
            returnOrderList.push([]);
        } else {
            returnOrderList.push([]);
            returnOrderList.push(orderList);
        }
        return returnOrderList;
    },
    MacBookPro_VGA: function MacBookPro_VGA(orderList, rule) {
        var ruleAddedOrderlist = orderList.map(function (order) {
            return Object.assign({}, order, { discountName: rule.header.name }, { action: rule.action });
        });
        return [ruleAddedOrderlist, []];
    }
};

exports.ruleFunctions = ruleFunctions;