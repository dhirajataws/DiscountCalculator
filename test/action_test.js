import {calculateBill} from "../src/index";

const assert = require('assert')

describe('calculateBill function ', () => {
    it('should test action for MacBookPro_VGA rule', () => {

        let orderList = [{
            SKU: 'mbp',
            discountName: 'MacBookPro_VGA',
            action: {discount: {type: 'item', value: 'vga'}}
        }]

        let orderListWithDiscount = calculateBill(orderList);
        assert(orderListWithDiscount[0].discountItem !== undefined);

        orderList = [{
            SKU: 'mbp'
        }]
        orderListWithDiscount = calculateBill(orderList);
        assert(orderListWithDiscount[0].discountItem === undefined);
    })
    it('should test action for SuperIpad rule', () => {
        let orderList = [{
            SKU: 'ipd'
        }]
        let orderListWithDiscount = calculateBill(orderList);
        assert(orderListWithDiscount[0].discountedPrice === undefined);
        orderList = [{
            SKU: 'ipd',
            action: {discount: {type: 'flat', value: 499.99}}
        }]
        orderListWithDiscount = calculateBill(orderList);
        assert(orderListWithDiscount[0].discountedPrice !== undefined);
        assert(orderListWithDiscount[0].discountedPrice == 499.99);
    })

    it('should test action for 3 for 2 Apple TV rule', () => {
        let orderList = [{
            SKU: 'atv'
        }]
        let orderListWithDiscount = calculateBill(orderList, [{
            "SKU": "atv",
            "Name": "AppleTV",
            "Price": 100
        }]);
        assert(orderListWithDiscount[0].discountedPrice === undefined);
        orderList = [{
            SKU: 'atv',
            action: {discount: {type: 'percentage', value: 10}}
        }]
        orderListWithDiscount = calculateBill(orderList, [{
            "SKU": "atv",
            "Name": "AppleTV",
            "Price": 100
        }]);
        assert(orderListWithDiscount[0].discountedPrice !== undefined);
        assert(orderListWithDiscount[0].discountedPrice == 90);
    })
})
