function generateRandomSaturatedColor() {
    const hue = Math.random(); // Random hue value between 0 and 1
    const h = hue * 360; // Convert to degrees
    const s = 1; // Full saturation
    const v = 1; // Full brightness

    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;

    let r, g, b;
    if (h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (h < 180) {
        [r, g, b] = [0, c, x];
    } else if (h < 240) {
        [r, g, b] = [0, x, c];
    } else if (h < 300) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}


function calculateHueShift(r, g, b) {
    // Helper function to convert RGB to HSL
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l;

        l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Achromatic (grey)
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return [h * 360, s, l];
    }

    // Convert yellow (RGB 255, 255, 0) to HSL
    const yellowHsl = rgbToHsl(255, 255, 0);
    const yellowHue = yellowHsl[0];

    // Convert target color to HSL
    const targetHsl = rgbToHsl(r, g, b);
    const targetHue = targetHsl[0];

    // Calculate hue shift
    let hueShift = targetHue - yellowHue;
    if (hueShift < 0) hueShift += 360;

    return hueShift;
}

function hexToRgb(hex){
    return [
        parseInt(hex.substring(1, 3), 16),
        parseInt(hex.substring(3, 5), 16),
        parseInt(hex.substring(5, 7), 16),
    ];
}

