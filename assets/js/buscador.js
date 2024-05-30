function filterVinilos(vinilos, searchTerm) {
  return vinilos.filter(vinilo => {
    const name = vinilo.nombre.toLowerCase();
    const description = vinilo.descripcion.toLowerCase();
    const term = searchTerm.toLowerCase();
    return name.includes(term) || description.includes(term);
  });
}

function renderVinilos(vinilos, filteredVinilos, searchTerm) {
  $('#filtered-vinilos-list').empty();
  $('#all-vinilos-list').empty();
  // ...

  if (searchTerm) {
    filteredVinilos.forEach(vinilo => {
      const tracklistHtml = vinilo.descripcion.split('<br><br><b>TRACKLIST</b><br><br>')[1]
        .split('<br><br>').map(track => `<li>${track}</li>`).join('');

        const viniloCard = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="http://localhost:3000${vinilo.foto}" class="card-img-top" alt="${vinilo.nombre}">
            <div class="card-body">
              <h5 class="card-title">${vinilo.nombre}</h5>
              <p class="card-text">Precio: $${vinilo.precio}</p>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viniloModal${vinilo.id}">Ver más</button>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="viniloModal${vinilo.id}" tabindex="-1" role="dialog" aria-labelledby="viniloModalLabel${vinilo.id}" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viniloModalLabel${vinilo.id}">${vinilo.nombre}</h5>
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
                    <p><strong>Descripción:</strong> ${vinilo.descripcion.split('<br><br><b>TRACKLIST</b><br><br>')[0]}</p>
                    <p><strong>Tracklist:</strong></p>
                    <ol>${tracklistHtml}</ol>
                    <p><strong>Precio:</strong> $${vinilo.precio}</p>
                    <p><strong>Stock:</strong> ${vinilo.stock}</p>
                    <button type="button" class="btn btn-success">Agregar al carrito</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      filteredVinilosContainer.append(viniloCard);
    });
    } else {
      vinilo.forEach(vinilo => {
        const viniloCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="http://localhost:3000${vinilo.foto}" class="card-img-top" alt="${vinilo.nombre}">
              <div class="card-body">
                <h5 class="card-title">${vinilo.nombre}</h5>
                <p class="card-text">Precio: $${vinilo.precio}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#viniloModal${vinilo.id}">Ver más</button>
              </div>
            </div>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="viniloModal${vinilo.id}" tabindex="-1" role="dialog" aria-labelledby="viniloModalLabel${vinilo.id}" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="viniloModalLabel${vinilo.id}">${vinilo.nombre}</h5>
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
                      <p><strong>Descripción:</strong> ${vinilo.descripcion}</p>
                      <p><strong>Precio:</strong> $${vinilo.precio}</p>
                      <p><strong>Stock:</strong> ${vinilo.stock}</p>
                      <button type="button" class="btn btn-success">Agregar al carrito</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        allVinilosContainer.append(viniloCard);
      });
    }
  }
  // Agregar un event listener para el botón de búsqueda
  $('#search-btn').on('click', function() {
    const searchTerm = $('#search-input').val().trim();
    fetch('http://localhost:3000/api/vinilos')
      .then(response => response.json())
      .then(vinilos => {
        const filteredVinilos = filterVinilos(vinilos, searchTerm);
        renderVinilos(vinilos, filteredVinilos, searchTerm);
      })
      .catch(error => console.error('Error al obtener los vinilos:', error));
  });