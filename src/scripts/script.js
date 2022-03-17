const devs = [
    'Grześ',
    'Łuki',
    'Mati',
    'Adam',
    'Ernest',
    'Rafik',
    'Kamil',
    'Zbyszek',
    'Domino',
    'Kevin'
];
const rouletteButton = document.getElementById('roulette-button');
const devContainer = document.getElementById('dev-list');

function renderDevs() {
    for (let x in devs) {
        let devElement = document.createElement('div');
        devElement.setAttribute('class', 'dev-element');
        devElement.setAttribute('id', `${x}`);

        let removeButton = document.createElement('div');
        removeButton.setAttribute('class', 'remove-button');
        removeButton.addEventListener('click', function() {
            removeFromRoulette(this.parentElement.getAttribute('id'));
        })
        removeButton.innerHTML = '&#x2716;';
        devElement.appendChild(removeButton);

        let devName = document.createElement('div');
        devName.setAttribute('class', 'dev-name');
        devName.innerHTML = devs[x];

        devElement.appendChild(devName);
        devContainer.appendChild(devElement);
    }
}

function toggleActive(id) {
    [...document.getElementsByClassName('dev-element')].forEach(element => {
        element.classList.remove('active');
    })

    document.getElementById(id).classList.add('active');
}

function removeFromRoulette(id) {
    devContainer.innerHTML = '';
    devs.splice(id, 1);

    renderDevs();
}

function pickRandomDevId() {
    return Math.floor(Math.random() * devs.length);
}

function startRoulette() {
    const picks = Math.floor(Math.random() * devs.length) + devs.length;

    animate(picks);
}

function animate(iterator) {
    if (iterator === 0) {
        rouletteButton.removeAttribute('disabled');
        rouletteButton.classList.remove('disabled');
        return;
    }

    setTimeout(() => {
        animate(--iterator);

        toggleActive(pickRandomDevId());
    }, 500 - (500 - iterator * 20))
}

rouletteButton.addEventListener('click', function() {
    if (devs.length === 0) {
        return;
    }

    startRoulette();

    this.setAttribute('disabled', 'disabled');
    this.classList.add('disabled');
});

renderDevs();
