let params = (new URL(document.location)).searchParams;
let displayId = params.get('orderId')
console.log(displayId)

document.getElementById("orderId").innerHTML = `${displayId}`