import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './style.css'

const message = document.querySelector('.click-some')

if(message) {
    message.addEventListener('click', e => {
        removeElement(message)
    })
    setTimeout(() => {
        removeElement(message)
    }, 5000)
}

function removeElement(item) {
    fadeOut(item, 300)
    setTimeout(() => {
        item.remove();
    }, 300);
}

function fadeOut(element, duration) {
    let opacity = 1;
    const interval = 10;
    const perIntervalOpacityChange = opacity / (duration / interval);

    const fadeOutInterval = setInterval(() => {
        opacity -= perIntervalOpacityChange;
        element.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fadeOutInterval);
        }
    }, interval);
}