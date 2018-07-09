'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.memotized = undefined;
exports.makeTree = makeTree;
exports.divideOrderList = divideOrderList;

var _checkers = require('./checkers');

var _rules = require('../database/rules.json');

var rules = _interopRequireWildcard(_rules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var memotized = exports.memotized = function memotized() {
    var orderList = [];
    function calculatePayment(order) {
        var rulesList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rules.rulesList;

        orderList.push(order);
        var applicableRulesList = rulesList.filter(function (rule) {
            return rule.condition.sku === order.SKU;
        });
        var applicableOrders = orderList.filter(function (orderItem) {
            return orderItem.SKU === order.SKU;
        });
        var nonApplicableOrders = orderList.filter(function (orderItem) {
            return orderItem.SKU !== order.SKU;
        });
        var newOrders = makeTree(applicableOrders, applicableRulesList);
        orderList = [].concat(_toConsumableArray(nonApplicableOrders), _toConsumableArray(newOrders));
        return orderList;
    }
    return calculatePayment;
};

function makeTree(orderList, ruleList) {
    // consider rule List is sorted by priority
    // apply rule 0
    var rule = ruleList.shift();
    // Divide orderList into two groups. one which has this rule applicable and other which is not
    if (rule === undefined || rule.length === 0) {
        return orderList;
    } else {
        var nodes = divideOrderList(orderList, rule);
        var returnOrderList = [];

        if (nodes[0].length !== 0) returnOrderList = [].concat(_toConsumableArray(returnOrderList), _toConsumableArray(nodes[0]));

        if (nodes[1].length > 0) {
            var returnMakeTree = makeTree(nodes[1], ruleList);
            returnOrderList = [].concat(_toConsumableArray(returnOrderList), _toConsumableArray(returnMakeTree));
        }
        return returnOrderList;
    }
}

function divideOrderList(orderList, rule) {
    return _checkers.ruleFunctions[rule.header.functionName](orderList, rule);
}