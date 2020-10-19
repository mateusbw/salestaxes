const salesTaxes = require("./salesTaxes.js");

const productsList = `1 imported bottle of perfume at 27.99
2 bottle of perfume at 18.99`;
describe("Sales Taxes", () => {

    describe("Parse Products", () => {
        it("should return parsed products", () => {
            expect(salesTaxes.parseProducts(productsList)).toEqual(
                [
                    {
                        quantity: "1",
                        name: 'imported bottle of perfume',
                        price: "27.99"
                    },
                    {
                        quantity: "2",
                        name: 'bottle of perfume',
                        price: "18.99"
                    }
                ]
            );
        })
    })

    describe("Add tax to products", () => {
        it("should add tax to products", () => {
            const products = salesTaxes.parseProducts(productsList);
            expect(salesTaxes.addTaxToProducts(products)).toEqual(
                [
                    {
                        quantity: "1",
                        name: 'imported bottle of perfume',
                        price: "27.99",
                        tax: 4.2,
                        total: "32.19",
                    },
                    {
                        quantity: "2",
                        name: 'bottle of perfume',
                        price: "18.99",
                        tax: 3.8,
                        total: "41.78"
                    }
                ]
            );
        })
    })

    describe("Parse name", () => {
        it('should return name parsed', () => {
            expect(salesTaxes.parseName(['1', 'imported bottle of perfume', 'at', '27.99'])).toEqual('imported bottle of perfume')
        })
    })

    describe("Is imported", () => {
        it('should return true', () => {
            expect(salesTaxes.isImported({ name: 'imported bottle of perfume' })).toBe(true)
        })
        it('should return false', () => {
            expect(salesTaxes.isImported({ name: 'book' })).toBe(false)
        })
    })

    describe("Is Exempt", () => {
        it('should return true', () => {
            expect(salesTaxes.isExempt({ name: 'book' })).toBe(true)
        })
        it('should return false', () => {
            expect(salesTaxes.isExempt({ name: 'imported bottle of perfume' })).toBe(false)
        })
    })

    describe("Calculate Tax", () => {
        it('should return false', () => {
            expect(salesTaxes.calculateTax({
                quantity: "2",
                name: 'bottle of perfume',
                price: "18.99",
            })).toEqual(3.8)
        })
    })

})