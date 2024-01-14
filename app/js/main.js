'use strict'

const tabItem = document.querySelectorAll('.tabs__btn-item'),
    tabContent = document.querySelectorAll('.tabs__content-item');

tabItem.forEach(item => {
    item.addEventListener('click', open);
});

function open(event) {
    const tabTarget = event.currentTarget;
    const btn = tabTarget.dataset.btn;

    tabItem.forEach(item => {
        item.classList.remove('tabs__btn-item-active');
    });
    tabContent.forEach(item => {
        item.classList.remove('tabs__content-item-active');
    });

    tabTarget.classList.add('tabs__btn-item-active');

    document.querySelector(`#${btn}`).classList.add('tabs__content-item-active');
}

const menuBtn = document.querySelector('.menu-btn'),
    menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('menu-active');
});