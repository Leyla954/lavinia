import React from 'react'

const addToCard = (item) => {
    let cart = JSON.parse(localStorage.getItem("card")) || [];
    const existingItem = cart.find((data) => data.id === item.id);
    if (existingItem) {
        existingItem.number += 1;
    } else {
        item.number = 1;
        cart.push(item);

        alert("sebete elave olundu")
    }
    localStorage.setItem("card", JSON.stringify(cart));
};


export default addToCard

