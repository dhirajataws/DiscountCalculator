const assert = require('assert')

describe('dependency', () => {
    it('should test all requires are deployed', () => {
        const babel = require('babel-core');
        assert(babel !== undefined)
        const babelPreset = require('babel-preset-es2015');
        assert(babelPreset !== undefined)
    })
    it('should test all simulated files for database exists', () => {
        const rules = require('../database/rules.json');
        assert(rules !== undefined)
        const product = require('../database/products.json');
        assert(product !== undefined)
    })
})