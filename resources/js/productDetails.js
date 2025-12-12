console.log('productDetails.js loaded')
document.addEventListener('DOMContentLoaded', () => {
    const qtyInput = document.getElementById('qty');
    const qtyHidden = document.getElementById('qty-hidden');

    qtyInput.addEventListener('input', () => {
        qtyHidden.value = qtyInput.value;
    });
});