
// script.js - control simple navegación y demo
document.addEventListener('DOMContentLoaded', ()=>{

  // fake-login (client-side). Replace with real DB in the future.
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const user = document.getElementById('user').value.trim();
      const pass = document.getElementById('pass').value.trim();
      if(!user || !pass){ alert('Ingrese usuario y contraseña'); return; }
      // Simular llamada a backend (placeholder)
      // TODO: conectar a base de datos / API
      localStorage.setItem('user', user);
      window.location.href = 'pantalla2.html';
    });
  }

  // Navigation links active state
  const navlinks = document.querySelectorAll('.nav a');
  navlinks.forEach(a=>{
    if(a.href === location.href || location.pathname.endsWith(a.getAttribute('data-page'))){
      a.classList.add('active');
    }
    a.addEventListener('click', (e)=>{
      // normal link behavior
    });
  });

  // Sensor demo: intentar leer DeviceOrientation / Motion en navegadores móviles
  const sensorBtn = document.getElementById('startSensors');
  if(sensorBtn){
    sensorBtn.addEventListener('click', async ()=>{
      const out = document.getElementById('sensorOutput');
      out.textContent = 'Solicitando permisos y eventos...';
      try{
        // iOS 13+ requires permission prompt for devicemotion
        if(typeof(DeviceMotionEvent) !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function'){
          const res = await DeviceMotionEvent.requestPermission();
          if(res !== 'granted'){ out.textContent='Permiso denegado para DeviceMotion'; return; }
        }
        window.addEventListener('devicemotion', ev=>{
          const a = ev.accelerationIncludingGravity || ev.acceleration || {};
          out.textContent = `Aceleración ≈ x:${a.x?.toFixed(2)} y:${a.y?.toFixed(2)} z:${a.z?.toFixed(2)}`;
        }, {passive:true});
        out.textContent = 'Escuchando eventos de movimiento (mueve el dispositivo)...';
      }catch(err){
        out.textContent = 'Error al iniciar sensores: '+err.message;
      }
    });
  }

  // Example: show stored user
  const who = document.getElementById('whoami');
  if(who){
    who.textContent = localStorage.getItem('user') || 'Invitado';
  }

});
