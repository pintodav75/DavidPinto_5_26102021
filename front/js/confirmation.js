// AFFICHAGE DU NUMERO DE COMMANDE SANS LE STOCKER //

// accede a l'URL
let params = (new URL(document.location)).searchParams;
// cherche le parametre orderId dans l'URL
// et le met dasn displayId
let displayId = params.get('orderId')
// affiche l'orderId
document.getElementById("orderId").innerHTML = `${displayId}`