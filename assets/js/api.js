$(document).ready(function() {
    function renderVinilos(Vinilos) {
        const vinilosContainer = $('#vinilos-list');
        vinilosContainer.empty();
  
        vinilos.forEach(vinilo => {
            const viniloCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="http://localhost:3000${vinilo.foto}" class="card-img-top" alt="${vinilo.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${vinilo.nombre}</h5>
                            <p class="card-text">${vinilo.artista}</p>
                            <p class="card-text">${vinilo.descripcion}</p>
                            <p class="card-text">Precio: $${vinilo.precio}</p>
                            <p class="card-text">Stock: ${vinilo.stock}</p>
                            <p class="card-text">Fecha: ${vinilo.fecha}</p>
                        </div>
                    </div>
                </div>
            `;
            vinilosContainer.append(viniloCard);
        });
    }
    fetch('http://localhost:3000/api/vinilos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los vinilos');
            }
            return response.json();
        })
        .then(vinilos => {
            renderVinilos(vinilos);
        })
        .catch(error => {
            console.error('Error al obtener los vinilos:', error);
        });
  });