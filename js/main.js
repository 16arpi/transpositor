// selectors
const selectUp = document.getElementById("select-up");
const selectDown = document.getElementById("select-down");

// canvas

const canvasUp = document.getElementById("canvas-up");
const canvasDown = document.getElementById("canvas-down");

const ctxUp = canvasUp.getContext("2d");
const ctxDown = canvasDown.getContext("2d");

// 0: ut, 1: sib, 2: mib
const transpos = [0, 0]
const selected = [-1, -1]

const names = ["Do","Do#","Re","Re#","Mi","Fa","Fa#","Sol","Sol#","La","La#","Si"]
const types = [true, false, true, false, true, true, false, true, false, true, false, true]
const order = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10];
const blanches = [0, 2, 4, 5, 7, 9, 11];
const noires = [1, 3, 6, 8, 10];

var selectedUp = -1;
var selectedDown = -1;

function draw_pianos() {

    var coords = [null, null, null, null, null, null, null, null, null, null, null, null]
    var j = 0;
    var k = 0;
    var l = 0;

    ctxUp.clearRect(0, 0, canvasUp.width, canvasUp.height);
    ctxDown.clearRect(0, 0, canvasDown.width, canvasDown.height);

    order.forEach(i => {

        if (blanches.includes(i)) {
            if (selectedUp == i) {
                ctxUp.fillStyle = "#0F0";
            } else {
                ctxUp.fillStyle = "#FFF";
            }

            if (selectedDown == i) {
                ctxDown.fillStyle = "#0F0";
            } else {
                ctxDown.fillStyle = "#FFF";
            }

            ctxUp.strokeStyle = "#000";
            ctxDown.strokeStyle = "#000";

            x = 10 + 40 * j;
            y = 10;
            w = 40;
            h = 120;

            ctxUp.fillRect(x, y, w, h);
            ctxUp.strokeRect(x, y, w, h);

            ctxDown.fillRect(x, y, w, h);
            ctxDown.strokeRect(x, y, w, h);

            coords[i] = [x, y, x + w, y + h]

            ++j;

        } else if ([1, 3].includes(i)) {

            if (selectedUp == i) {
                ctxUp.fillStyle = "#0F0";
            } else {
                ctxUp.fillStyle = "#000";
            }

            if (selectedDown == i) {
                ctxDown.fillStyle = "#0F0";
            } else {
                ctxDown.fillStyle = "#000";
            }

            ctxUp.strokeStyle = "#FFF";
            ctxDown.strokeStyle = "#FFF";

            x = 30 + 40 * k;
            y = 10;
            w = 40;
            h = 70;

            ctxUp.fillRect(x, y, w, h);
            ctxUp.strokeRect(x, y, w, h);

            ctxDown.fillRect(x, y, w, h);
            ctxDown.strokeRect(x, y, w, h);

            coords[i] = [x, y, x + w, y + h]

            ++k;
        } else if ([6, 8, 10].includes(i)) {
            if (selectedUp == i) {
                ctxUp.fillStyle = "#0F0";
            } else {
                ctxUp.fillStyle = "#000";
            }

            if (selectedDown == i) {
                ctxDown.fillStyle = "#0F0";
            } else {
                ctxDown.fillStyle = "#000";
            }

            ctxUp.strokeStyle = "#FFF";
            ctxDown.strokeStyle = "#FFF";

            x = 150 + 40 * l;
            y = 10;
            w = 40;
            h = 70;

            ctxUp.fillRect(x, y, w, h);
            ctxUp.strokeRect(x, y, w, h);

            ctxDown.fillRect(x, y, w, h);
            ctxDown.strokeRect(x, y, w, h);

            coords[i] = [x, y, x + w, y + h]

            ++l;
        }
    });

    return coords;
}

function transposeFrom(key) {
    var transposFrom = transpos[0];
    var transposTo = transpos[1];

    var keyUt = ((key - transposFrom) % 12 + 12) % 12;
    return ((keyUt + transposTo) % 12 + 12) % 12;
}

function click(key) {
    selectedUp = key
    selectedDown = transposeFrom(key)
    draw_pianos()
}

canvasUp.addEventListener('click', (e) => {
    const rect = canvasUp.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const possibles = []
    for (var i = 0; i < 12; i++) {
        [x1, y1, x2, y2] = coords[i];

        if (x1 <= x && x < x2 && y1 <= y && y < y2) {
            possibles.push(i)
        }
    }

    if (possibles.length == 1) {
        click(possibles[0])
    } else if (possibles.length > 1) {
        possibles.forEach(k => {
            if (!types[k]) {
                click(k)
                return
            }
        });
    }
});

selectUp.addEventListener("change", e => {
    t = e.target.value

    if (t == "ut") {
        transpos[0] = 0
    } else if (t == "sib") {
        transpos[0] = 2
    } else if (t == "mib") {
        transpos[0] = -3
    }

    click(selectedUp)
});

selectDown.addEventListener("change", e => {
    t = e.target.value

    if (t == "ut") {
        transpos[1] = 0
    } else if (t == "sib") {
        transpos[1] = 2
    } else if (t == "mib") {
        transpos[1] = -3
    }

    click(selectedUp)
});

selectUp.value = "ut"
selectDown.value = "ut"

const coords = draw_pianos();
