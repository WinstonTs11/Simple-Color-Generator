let selectedColors = [];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(`Copied ${text}`, text);
    });
}

function showNotification(message, color) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = color;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    notification.style.bottom = '20px';

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.bottom = '10px';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 2000);
}

function generateColors() {
    const colorContainer = document.getElementById('colorContainer');
    colorContainer.innerHTML = '';
    let gradientColors = [];
    selectedColors = [];

    for (let i = 0; i < 30; i++) {
        const color = getRandomColor();
        gradientColors.push(color);

        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        colorBox.innerHTML = `<span>${color}</span>`;
        colorBox.addEventListener('click', () => {
            selectedColors.push(color);
            colorBox.style.border = '3px solid #fff';
        });
        colorContainer.appendChild(colorBox);
    }

    const gradient = `linear-gradient(45deg, ${gradientColors.join(', ')})`;
    document.body.style.background = gradient;
}

function copySelectedColors() {
    const colorCount = parseInt(document.getElementById('colorCount').value, 10);
    const colorsToCopy = selectedColors.slice(0, colorCount).join(', ');

    if (colorsToCopy) {
        copyToClipboard(colorsToCopy);
    } else {
        alert("Please select colors to copy");
    }
}

// Generate colors on page load
window.onload = generateColors;