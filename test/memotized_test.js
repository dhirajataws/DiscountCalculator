const assert = require('assert');

describe('addRule function', () => {
    let memotized;

    beforeEach(() => {
        memotized = require('../src/index').memotized();
    })
    afterEach(() => {
    })
    it('should test MacBookPro_VGA  offer', () => {
        const ruleList = [
            {
                "header": {
                    "name": "MacBookPro_VGA",
                    "functionName": "MacBookPro_VGA",
                    "priority": 1
                },
                "condition": {
                    "sku": "mbp",
                    "thresholdValue": 4
                },
                "action": {
                    "discount": {
                        "type": "item",
                        "value": "vga"
                    }
                }
            }]
        let order = memotized({
            "SKU": "mbp",
            "quantity": 3
        }, ruleList)
        assert(order[0].discountName !== undefined)
        assert(order[0].action !== undefined)
    })
    it('should test 3 for 2 Apple TV offer', () => {
        const ruleList = [
            {
                "header": {
                    "name": "3 for 2 Apple TV",
                    "functionName": "atv_3for2",
                    "priority": 3
                },
                "condition": {
                    "sku": "atv",
                    "thresholdValue": 3
                }
            }]
        let order = memotized({
            "SKU": "atv",
            "quantity": 2
        }, ruleList)
        assert(order[0].discountName === undefined)
        order = memotized({
            "SKU": "atv",
            "quantity": 1
        }, ruleList)
        assert(order[0].discountName !== undefined)
        order = memotized({
            "SKU": "atv",
            "quantity": 1
        }, ruleList)
        assert(order[0].discountName !== undefined)
        assert(order[1].discountName !== undefined)
        assert(order[2].discountName === undefined)
    })
    it('should test SuperIpad 4 offer', () => {
        const ruleList = [
            {
                "header": {
                    "name": "SuperIpad",
                    "functionName": "SuperIpad_4",
                    "priority": 1
                },
                "condition": {
                    "sku": "ipd",
                    "thresholdValue": 4
                }
            }]
        let order = memotized({
            "SKU": "ipd",
            "quantity": 3
        }, ruleList)
        assert(order[0].discountName === undefined)
        order = memotized({
            "SKU": "ipd",
            "quantity": 1
        }, ruleList)
        assert(order[0].discountName === undefined)
        order = memotized({
            "SKU": "ipd",
            "quantity": 1
        }, ruleList)
        assert(order[0].discountName !== undefined)
        assert(order[1].discountName !== undefined)
        assert(order[2].discountName !== undefined)
    })
})
