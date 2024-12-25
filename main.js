let lamp = document.getElementById("lavalamp");
let lampContainer = document.getElementById("lamp-container");

lamp.addEventListener("click", function() {
    // Play vine boom sound
    const vineBoom = new Audio('vine_boom.mp3');
    vineBoom.play();

    // Create explosion element
    const explosion = document.createElement("div");
    explosion.style.position = "fixed";
    explosion.style.top = "0";
    explosion.style.left = "0";
    explosion.style.width = "100vw";
    explosion.style.height = "100vh";
    explosion.style.background = "radial-gradient(circle at center, #ff4500, #ff8c00, #ff0000)";
    explosion.style.opacity = "0";
    explosion.style.transition = "all 0.3s";
    explosion.style.zIndex = "1000";
    document.body.appendChild(explosion);

    // Animate lamp and explosion
    lampContainer.style.transition = "all 0.2s";
    lampContainer.style.transform = "scale(1.5)";
    lampContainer.style.opacity = "0";

    // Fade in explosion
    requestAnimationFrame(() => {
        explosion.style.opacity = "1";
    });

    setTimeout(() => {
        lampContainer.style.display = "none";
    }, 200);

    // Fade out and remove explosion after delay
    setTimeout(() => {
        explosion.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(explosion);
            window.location.href = "https://neurosama.shop";
        }, 1000); // Wait for fade out transition to complete
    }, 300); // Show explosion for 1 second
});

// Track current and target colors for smooth transitions
let currentHue = 0;
let targetHue = 0;

// assumes start is always in [0, wrappingPoint]
function circularLerp(start, end, t, wrappingPoint) {
    let delta = end - start;
    if (delta > wrappingPoint / 2){
        delta = delta - wrappingPoint;
    }
    else if (delta < -wrappingPoint / 2){
        delta = delta + wrappingPoint;
    }

    let result = (start + delta * t) % wrappingPoint;
    if (result < 0)
        result = wrappingPoint - result;

    return result
}

function updateLampColor() {
    // Lerp current color towards target
    const t = 0.03; // Adjust this value to control transition speed
    currentHue = circularLerp(currentHue, targetHue, t, 360);

    lamp.style = `filter: sepia(100%) saturate(200%) hue-rotate(${currentHue}deg)`;
}


let isRunningOnVedalsPC = true;
// Fetch new target color
function fetchTargetColor() {
    if (isRunningOnVedalsPC) {
        fetch("http://localhost:8000/lamp")
            .then(response => response.text())
            .then(response => response.trim())
            .then(hexColor => {
                targetHue = calculateHueShift(hexToRgb(hexColor));
            })
            .catch(error => {
                isRunningOnVedalsPC = false;
                targetHue = Math.random() * 360;
                console.error("Failed to fetch lamp color:", error);
            });
    }
    else {
        targetHue = Math.random() * 360;
    }
}

// Update interpolation frequently for smooth animation
setInterval(updateLampColor, 16); // ~60fps

// Fetch new target color less frequently
fetchTargetColor(); // Initial fetch
setInterval(fetchTargetColor, 3000);

// Create raining cats
function createCat() {
    const cat = document.createElement('img');
    cat.src = 'https://static.vecteezy.com/system/resources/previews/034/925/406/non_2x/ai-generated-shorthair-cat-on-transparent-background-image-png.png';
    cat.style.position = 'fixed';
    cat.style.zIndex = '0';
    cat.style.width = '50px';
    cat.style.opacity = '0.5';
    cat.style.left = Math.random() * window.innerWidth + 'px';
    cat.style.top = '-50px';

    document.body.appendChild(cat);

    // Animate falling
    let posY = -50;
    let rotation = Math.random() * 360;
    let speedY = 1 + Math.random() * 2;
    let speedRotation = -2 + Math.random() * 4;

    function animate() {
        posY += speedY;
        rotation += speedRotation;
        cat.style.top = posY + 'px';
        cat.style.transform = `rotate(${rotation}deg)`;

        // Remove when off screen
        if (posY > window.innerHeight) {
            cat.remove();
        } else {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// Create new cats periodically
setInterval(createCat, 200);
