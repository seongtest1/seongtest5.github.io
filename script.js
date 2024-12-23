#debug

const wireCount = 5;
const targetCount = wireCount;

const wires = [];
const targets = [];
const wireColors = [];
const targetColors = [];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomizePositions() {
    const gameArea = document.getElementById("game-area");
    const areaWidth = gameArea.offsetWidth;
    const areaHeight = gameArea.offsetHeight;

    targets.forEach(target => {
        let isColliding;
        let targetLeft, targetTop;
        
        do {
            isColliding = false;
            targetLeft = Math.random() * (areaWidth - 100);
            targetTop = Math.random() * (areaHeight - 40);

            for (const wire of wires) {
                const wireLeft = wire.offsetLeft;
                const wireTop = wire.offsetTop;
                const wireWidth = wire.offsetWidth;
                const wireHeight = wire.offsetHeight;

                if (
                    targetLeft < wireLeft + wireWidth &&
                    targetLeft + 100 > wireLeft &&
                    targetTop < wireTop + wireHeight &&
                    targetTop + 40 > wireTop
                ) {
                    isColliding = true;
                    break;
                }
            }
        } while (isColliding);

        target.style.left = `${targetLeft}px`;
        target.style.top = `${targetTop}px`;
    });
}

window.onload = () => {
    const gameArea = document.getElementById("game-area");

    for (let i = 0; i < wireCount; i++) {
        const wire = document.createElement("div");
        wire.classList.add("wire");
        wire.id = `wire${i + 1}`;
        wire.setAttribute("draggable", "true");
        wire.setAttribute("ondragstart", "drag(event)");
        wire.setAttribute("ondragend", "endDrag(event)");
        const wireColor = getRandomColor();
        wire.style.backgroundColor = wireColor;
        wireColors.push(wireColor);
        gameArea.appendChild(wire);
        wires.push(wire);

        const target = document.createElement("div");
        target.classList.add("target");
        target.id = `target${i + 1}`;
        target.setAttribute("ondrop", "drop(event)");
        target.setAttribute("ondragover", "allowDrop(event)");
        const targetColor = wireColor;
        target.style.backgroundColor = targetColor;
        targetColors.push(targetColor);
        gameArea.appendChild(target);
        targets.push(target);
    }

    resetWires();
    randomizePositions();
};

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add("dragging");
}

function endDrag(ev) {
    ev.target.classList.remove("dragging");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const wire = document.getElementById(data);
    const target = ev.target;

    const wireColor = wire.style.backgroundColor;
    const targetColor = target.style.backgroundColor;

    if (wireColor === targetColor) {
        wire.style.top = target.offsetTop + 'px';
        wire.style.left = target.offsetLeft + 'px';
        target.style.backgroundColor = "#28a745";
        wire.draggable = false;
        wire.classList.remove("dragging");

        checkSuccess();
    } else {
        target.style.backgroundColor = "#dc3545";
        setTimeout(() => {
            target.style.backgroundColor = targetColor;
        }, 1000);
    }
}

function checkSuccess() {
    const connectedWires = wires.filter(wire => wire.draggable === false);
    if (connectedWires.length === wireCount) {
        document.getElementById("status").innerHTML = "<span id='correct'>모든 전선이 성공적으로 연결되었습니다! 시스템이 복구되었습니다.</span>";
    }
}

function resetWires() {
    wires.forEach((wire, index) => {
        wire.style.top = "0px";
        wire.style.left = `${index * 120 + 20}px`;
        wire.draggable = true;
    });
}
