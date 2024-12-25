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


function calculateHueShift([r, g, b]) {
    function rgbToHue(r, g, b) {
        r /= 255.0;
        g /= 255.0;
        b /= 255.0;

        const cMax  = Math.max(r,g,b);
        const cMin  = Math.min(r,g,b);
        const delta = cMax - cMin;
    
        if (!delta) return 0;
        
        let hue;
        switch (cMax) {
            case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
            case g: hue = (b - r) / delta + 2; break;
            case b: hue = (r - g) / delta + 4; break;
        }
        return hue * 60;
    }

    // Convert yellow RGB(255, 255, 0) and target color to hue
    const yellowHue = rgbToHue(255, 255, 0);
    const targetHue = rgbToHue(r, g, b);

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

