// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Hide all things that need to be hidden
const hiddenForm = document.getElementById('form');
const xName = document.getElementById('xName');
const xLabel = document.getElementById('xLabel'); 
const xRange = document.getElementById('xRange');
const yName = document.getElementById('yName');
const yLabel = document.getElementById('yLabel');
const yRange = document.getElementById('yRange');
const pyName = document.getElementById('pyName');
const pyLabel = document.getElementById('pyLabel');
const pyRange = document.getElementById('pyRange');
const hName = document.getElementById('hName');
const hLabel = document.getElementById('hLabel');
const hRange = document.getElementById('hRange');
hiddenForm.style.display = 'none';
xName.style.display = 'none';
xLabel.style.display = 'none';
xRange.style.display = 'none';
yName.style.display = 'none';
yLabel.style.display = 'none';
yRange.style.display = 'none';
pyName.style.display = 'none';
pyLabel.style.display = 'none';
pyRange.style.display = 'none';
hName.style.display = 'none';
hLabel.style.display = 'none';
hRange.style.display = 'none';

function getSelectedRadioValue() {
    const selectedRadio = document.querySelector('input[name="exampleRadios"]:checked');

    if (selectedRadio) {
        return selectedRadio.value;
    } else {
        return null; // Or handle the case where no radio button is selected.
    }
}

function f(t, y) {
    var x, y, px
    var py = y
    var dx = px
    var dy = py
    var dpx = -x - 2 * x * y
    var dpy = -y - x ** 2 + y ** 2
    return [dx, dy, dpx, dpy]
}

function H(x, y, px, py){
    var h = 0.5 * (px ** 2 + py ** 2) + 0.5 * (x ** 2 + y ** 2) + x ** 2 * y - (y ** 3 / 3)
    return h
}

function px0(yo, po, H0){
    var px0 = Math.sqrt(2 * H0 - (yo ** 2) + ((2 / 3) * (yo ** 3)) - po ** 2)
    return px0
}

// Define the initial conditions and the time span
let y0 = []; // initial state vector

const t_span = [0, 10000] // time span from 0 to 1000000

function fx(t, y) {
    dx = y
    return dx
}

function fy(t, y) { 
    dy = y
    return dy
}

function fpx(t, y) {
    dpx = -t - 2 * (t * y)
    return dpx
}

function fpy(t, y){
    dpy = -y - (t ** 2) + (0.3**2)
    return dpy
}

function rk4(f, x0, yo){
    h = 0.09
    k1 = h * f(x0, yo)
    k2 = h * f(x0 + 0.5 * h, yo + 0.5 * k1)
    k3 = h * f(x0 + 0.5 * h, yo + 0.5 * k2)
    k4 = h * f(x0 + h, yo + k3)
    yo = (k1 + 2 * k2 + 2 * k3 + k4) / 6
    x0 += h
    return yo
}

const data = [];

function plotChart() {
    let xpos = []
    let ypos = []
    let pxMomentum = []
    let pyMomentum = []

    /*xnext = 0
    ynext = 0.3
    pxnext = 0.4219004621945797//Math.sqrt(2 * (0.167) - (0.3 ** 2) + ((2 / 3) * (0.3 ** 3)) - 0 ** 2)
    pynext = 0
*/
    let xnext = y0[0];
    let ynext = y0[1];
    let pxnext = y0[2];//Math.sqrt(2 * (hRange.value) - (y0[1] ** 2) + ((2 / 3) * (y0[1] ** 3)) - y0[3] ** 2);
    let pynext = y0[3];

    console.error("##$## : " + y0[0] + " " + y0[1] + " " + y0[2] + " " + y0[3])

    xpos.push(xnext)
    ypos.push(ynext)
    pxMomentum.push(pxnext)
    pyMomentum.push(pynext)

    for (let i = 0; i <= 1000; i++) {

        xnext = xnext + rk4(fx, xnext, pxnext)
        ynext = ynext + rk4(fy, xnext, pynext)
        pxnext = pxnext + rk4(fpx, xnext, ynext)
        pynext = pynext + rk4(fpy, xnext, ynext)
        xpos.push(xnext)
        ypos.push(ynext)
        pxMomentum.push(pxnext)
        pyMomentum.push(pynext)

        data.push({ x: xnext, y: ynext })

    }

/*    //Update the chart object
    pieChart.data.datasets[0].data = updatedData;
    //Update the chart
    pieChart.update();
*/
    drawGraph();

    xpos.length = 0;
    ypos.length = 0;
    pxMomentum.length = 0;
    pyMomentum.length = 0;
    data.length = 0;
   // y.length = 0;
    
}

function drawGraph() {

        starScatterPlot = new Chart(ctx, {
            type: "scatter",
            data: {
                // labels: xpos,
                datasets: [{
                    label: 'Star position',
                    data: data,
                    borderColor: "red",
                    fill: true
                }]
            }/*,
            options: {
                scales: {
                    x: {
                        min: - 0.8, // Set a lower minimum for x
                        max: 0.8  // Set a higher maximum for x
                    },
                    y: {
                        min: -0.5, // Set a lower minimum for y
                        max: 0.5  // Set a higher maximum for y
                    }
                }
            }*/
        });


/*    //Update the chart object
    starScatterPlot.data.datasets[0].data = data;
    //Update the chart
    starScatterPlot.update();*/

    
}


const option1 = document.getElementById('exampleRadios1');
const option2 = document.getElementById('exampleRadios2');

const submitButton = document.getElementById('submitBtn');

hiddenForm.style.display = 'none'; 

// Add event listeners to both radio buttons (more robust)
option1.addEventListener('change', handleRadioChange);
option2.addEventListener('change', handleRadioChange);
submitButton.addEventListener('click', submitButtonClicked )

let starScatterPlot = new Chart();
const ctx = document.getElementById('starChart').getContext('2d');

// The sliders
xRange.addEventListener('input', function () {
    xLabel.textContent = xRange.value; // Update label text
});
yRange.addEventListener('input', function () {
    yLabel.textContent = yRange.value; // Update label text
});
pyRange.addEventListener('input', function () {
    pyLabel.textContent = pyRange.value; // Update label text
});
hRange.addEventListener('input', function () {
    hLabel.textContent = hRange.value; // Update label text
});

function submitButtonClicked() {
    if (Chart.getChart("starChart")) {
        Chart.getChart("starChart")?.destroy();
        starScatterPlot.destroy(); // Destroy existing chart if any
        starScatterPlot = null;
    }
/*
    if (this.starScatterPlot) {
       this.starScatterPlot.destroy();
        *//*        starScatterPlot.destroy(); // Destroy existing chart if any
                starScatterPlot = null;*//*
    }*/

    if (option1.checked) {

       // y0 = [0, 0.30266681750031454, 0.49057789051960615, -2.7003030887706725e-13];
        y0 = [0, 0.3, 0.4219004621945797, 0];
        plotChart();
    }
    else if (option2.checked) {
        const xVal = parseFloat(xRange.value);
        const yVal = parseFloat(yRange.value);
        const pxVal = parseFloat(px0(yRange.value, pyRange.value, hRange.value));
        const pyVal = parseFloat(pyRange.value);
        y0 = [xVal, yVal, pxVal, pyVal];
        //y0 = [xRange.value, yRange.value, px0(yRange.value, pyRange.value, hRange.value), pyRange.value];
        /*console.error("##$## : " + xRange.value + " " + yRange.value + " " + px0(yRange.value, pyRange.value, hRange.value) + " " + pyRange.value)*/
        plotChart();
    }

}
function handleRadioChange() {
    if (option2.checked) {
        hiddenForm.style.display = 'block'; // Show the form
        xName.style.display = 'block';
        xLabel.style.display = 'block';
        xRange.style.display = 'block';
        yName.style.display = 'block';
        yLabel.style.display = 'block';
        yRange.style.display = 'block';
        pyName.style.display = 'block';
        pyLabel.style.display = 'block';
        pyRange.style.display = 'block';
        hName.style.display = 'block';
        hLabel.style.display = 'block';
        hRange.style.display = 'block';

        if (Chart.getChart("starChart")) {
            Chart.getChart("starChart")?.destroy();
            starScatterPlot.destroy(); // Destroy existing chart if any
            starScatterPlot = null;
        }
    } else {

        hiddenForm.style.display = 'none'; // Hide the form
        xName.style.display = 'none';
        xLabel.style.display = 'none';
        xRange.style.display = 'none';
        yName.style.display = 'none';
        yLabel.style.display = 'none';
        yRange.style.display = 'none';
        pyName.style.display = 'none';
        pyLabel.style.display = 'none';
        pyRange.style.display = 'none';
        hName.style.display = 'none';
        hLabel.style.display = 'none';
        hRange.style.display = 'none';
    }
}



