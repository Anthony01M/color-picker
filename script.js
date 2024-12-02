document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('colorInput');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');

    colorInput.addEventListener('input', () => {
        const color = colorInput.value;
        hexValue.textContent = color;
        rgbValue.textContent = hexToRgb(color);
        hslValue.textContent = hexToHsl(color);
        addColorToHistory(color);
    });

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-copy-target');
            const targetText = document.getElementById(targetId).textContent;
            navigator.clipboard.writeText(targetText).then(() => {
                alert(`Copied ${targetText} to clipboard`);
            });
        });
    });

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    function hexToHsl(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 7) {
            r = parseInt(hex.slice(1, 3), 16) / 255;
            g = parseInt(hex.slice(3, 5), 16) / 255;
            b = parseInt(hex.slice(5, 7), 16) / 255;
        }
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max != min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        s = s * 100;
        l = l * 100;
        return `hsl(${Math.round(h * 360)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    }
});