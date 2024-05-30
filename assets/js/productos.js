const vinilosSection = document.getElementById('vinilos-list');

// Función para renderizar los cómics
function renderVinilos(vinilos) {
  const vinilosContainer = $('#vinilos-list');
  vinilosContainer.empty();

  vinilos.forEach((vinilo, index) => {
    const viniloCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="http://localhost:3000${vinilo.foto}" class="card-img-top" alt="${vinilo.nombre}">
          <div class="card-body">
            <h5 class="card-title">${vinilo.nombre}</h5>
            <p class="card-text">Precio: $${vinilo.precio}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viniloModal${index}">Ver más</button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="viniloModal${index}" tabindex="-1" role="dialog" aria-labelledby="viniloModalLabel${index}" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="viniloModalLabel${index}">${vinilo.nombre}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <img src="http://localhost:3000${vinilo.foto}" class="img-fluid" alt="${vinilo.nombre}">
                </div>
                <div class="col-md-8">
                <p><strong>Artista:</strong> ${vinilo.artista}</p>
                  <p><strong>Descripción:</strong> ${vinilo.descripcion}</p>
                  <p><strong>Precio:</strong> $${vinilo.precio}</p>
                  <p><strong>Stock:</strong> ${vinilo.stock}</p>
                  <button type="button" class="btn btn-success" data-vinilo-id="${vinilo.id}">Agregar al carrito</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    vinilosContainer.append(viniloCard);
  });
}

function agregarAlCarrito(viniloId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el vinilo ya está en el carrito
    const viniloExistente = carrito.find(item => item.id === viniloId);
    
    if (viniloExistente) {
      // Si el vinilo ya está en el carrito, aumentar la cantidad
      viniloExistente.cantidad++;
    } else {
      // Si el vinilo no está en el carrito, agregarlo con cantidad 1
      carrito.push({ id: viniloId, cantidad: 1 });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Opcional: Mostrar un mensaje de éxito o actualizar la interfaz del carrito
    console.log('Vinilo agregado al carrito');
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Obtener el índice del producto de la URL (si existe)
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');

// Obtener los vinilos de la API
fetch('http://localhost:3000/api/vinilos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los vinilos');
    }
    return response.json();
  })
  .then(vinilos => {
    renderVinilos(vinilos);

    // Mostrar la ventana emergente del producto correspondiente al índice (si existe)
    if (index !== null) {
      $(`#vinilosModal${index}`).modal('show');
    }
  })
  .catch(error => {
    console.error('Error al obtener los cómics:', error);
  });