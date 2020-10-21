
const parseProducts = (productsList) => productsList.split('\n').map(line => {
    const parsedProduct = line.split(' ');
    return {
        quantity: parsedProduct[0],
        name: parseName(parsedProduct),
        price: parsedProduct[parsedProduct.length - 1]
    }
});

const addTaxToProducts = (products) => products.map(product => (
    {
        ...product,
        tax: calculateTax(product), 
        total: (product.quantity * product.price + calculateTax(product)).toFixed(2)
    }));

const parseName = (parsedProduct) => parsedProduct.reduce(
    (product, value, index) => (
        index != 0 &&
        index != parsedProduct.length - 1 &&
        index != parsedProduct.length - 2)
        ? product += `${value} ` : product, '').trim();

const isImported = ({ name }) => name.includes('imported');

const isExempt = ({ name }) => {
    const exemptProducts = [
        "packet of headache pills",
        "boxes of chocolates",
        "box of chocolates",
        "chocolate bar",
        "book",
    ];
    const parsedName = isImported({ name }) ? name.split('imported ')[1] : name;
    return exemptProducts.includes(parsedName);
}

const calculateTax = ({ quantity, name, price }) => {
    const baseTax = isExempt({ name }) ? 0 : roundTax(price * 0.1) * quantity;
    const importantionTax = isImported({ name }) ? roundTax(price * 0.05) * quantity : 0;
    return parseFloat((baseTax + importantionTax).toFixed(2));
}

const roundTax = (tax) => Math.ceil(tax.toFixed(2) * 20) / 20;

module.exports = {
    parseProducts,
    addTaxToProducts,
    parseName,
    isImported,
    isExempt,
    calculateTax
}