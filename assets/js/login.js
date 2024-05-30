// Obtener el formulario de inicio de sesión
const loginForm = document.getElementById('login-form');

// Manejar el envío del formulario
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores de los campos
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Obtener los datos del usuario almacenados en localStorage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Verificar si el nombre de usuario y la contraseña son válidos
  if (username === storedUsername && password === storedPassword) {
    alert('Inicio de sesión exitoso');
    // Aquí puedes redirigir al usuario a la página principal o realizar otras acciones
  } else {
    alert('Nombre de usuario o contraseña incorrectos');
  }
});