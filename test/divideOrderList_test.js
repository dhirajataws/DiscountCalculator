import {divideOrderList} from '../src/index';

const assert = require('assert')

describe('divideOrderList function', () => {
    it('should test rule not attached when quantity less then threshold', () => {
        let rule =
            {
                "header": {
                    "name": "3 for 2 Apple TV",
                    "functionName": "atv_3for2",
                    "priority": 3
                },
                "condition": {
                    "sku": "atv",
                    "thresholdValue": 3
                },
                "action": {
                    "discount": {
                        "type": "percentage",
                        "value": 33.33
                    }
                }
            };
        let orderList = [{
            "SKU": "atv",
            "quantity": 2
        }];
        let result = divideOrderList(orderList, rule)
        assert(result[0].length === 0)
    })
    it('should test order divided when quantity less then threshold', () => {
        let rule =
            {
                "header": {
                    "name": "3 for 2 Apple TV",
                    "functionName": "atv_3for2",
                    "priority": 3
                },
                "condition": {
                    "sku": "atv",
                    "thresholdValue": 3
                },
                "action": {
                    "discount": {
                        "type": "percentage",
                        "value": 33.33
                    }
                }
            };
        let orderList = [{
            "SKU": "atv",
            "quantity": 3
        }];
        let result = divideOrderList(orderList, rule)
        assert(result[0].length > 0)
        assert(result[0][0].discountName !== undefined)
    })
})
