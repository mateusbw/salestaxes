window.addEventListener("load", function () {
    document.getElementById('products-form').addEventListener("submit", (e) => {
        e.preventDefault();
        const productsList = document.getElementById("product-list").value;
        const products = parseProducts(productsList);
        const productsWithTax = addTaxToProducts(products);
        let receiptContainer = document.getElementById("receipt");
        let content = productsWithTax.map(product => `<p>${product.quantity} ${product.name}: 
        ${product.total.toFixed(2)}</p>`).join('');
        content += `<p><strong>Sales Taxes: ${productsWithTax.reduce((totalTaxes, product) => totalTaxes += product.tax, 0).toFixed(2)}</strong></p>`
        content += `<p><strong>Total: ${productsWithTax.reduce((total, product) => total += (product.total), 0).toFixed(2)}</strong></p>`
        receiptContainer.innerHTML = content;
    });
});