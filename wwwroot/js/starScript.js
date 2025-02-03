// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

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
const y0 = [0, 0.30266681750031454, 0.49057789051960615, -2.7003030887706725e-13] // initial state vector

const t_span = [0, 1000] // time span from 0 to 1000000

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

function rk4(f, x0, y0){
    h = 0.09
    k1 = h * f(x0, y0)
    k2 = h * f(x0 + 0.5 * h, y0 + 0.5 * k1)
    k3 = h * f(x0 + 0.5 * h, y0 + 0.5 * k2)
    k4 = h * f(x0 + h, y0 + k3)
    y0 = (k1 + 2 * k2 + 2 * k3 + k4) / 6
    x0 += h
    return y0
}

xpos = []
ypos = []
pxMomentum = []
pyMomentum = []

xnext = 0
ynext = 0.3
pxnext = Math.sqrt(2 * (0.167) - (0.3 ** 2) + ((2 / 3) * (0.3 ** 3)) - 0 ** 2)
pynext = 0

xpos.push(xnext)
ypos.push(ynext)
pxMomentum.push(pxnext)
pyMomentum.push(pynext)

const data = [];
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

new Chart("starChart", {
    type: "scatter",
    data: {
       // labels: xpos,
        datasets: [{
            data: data,
            borderColor: "red",
            fill: true
        }]
    }
    //options: { ...}
});