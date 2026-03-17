// Nama dinamik
const params = new URLSearchParams(window.location.search);
let nama = params.get("nama") || prompt("Siapa nama anda?");
document.getElementById("nama").innerHTML = `سلامت هاري راي ${nama} 🌙`;

// Typing effect
let text = `Bulan Syawal menjelma lagi,
Tangan dihulur maaf dipinta.
Andai ada salah dan silap,
Harap dimaafkan dengan penuh keikhlasan.

سلامت هاري راي
Maaf Zahir dan Batin 💚

Daripada Norisam dan Kartina Family 🌙`;

let i = 0;
function type() {
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(type,40);
  }
}
type();

// Share WhatsApp
function share() {
  let t = `سلامت هاري راي 🌙 Maaf Zahir dan Batin daripada ${nama} - Daripada Norisam dan Kartina Family`;
  window.open("https://wa.me/?text=" + encodeURIComponent(t));
}

// Audio Play / Mute (gabungkan auto-play)
let audio = document.getElementById("audio");
let audioBtn = document.getElementById("audioBtn");
let audioPlaying = false;

// Auto-play try
audio.play().catch(()=>{}); // cuba main terus, tapi ignore error

window.addEventListener('click', ()=>{
  if(audio.paused){
    audio.play();
    audioPlaying = true;
    audioBtn.textContent = "🔇 Mute";
  }
}, {once:true});

// Button Play / Mute
audioBtn.addEventListener('click', () => {
  if(audioPlaying){
    audio.pause();
    audioPlaying = false;
    audioBtn.textContent = "🔊 Play";
  } else {
    audio.play();
    audioPlaying = true;
    audioBtn.textContent = "🔇 Mute";
  }
});

// Three.js Fireworks (fungsi asal)
let canvas = document.getElementById("scene3d");
let renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

let fireworks = [];
function createFirework() {
  let colors = [0x00ff00,0x66ff66,0xccff00,0xffff33];
  for(let i=0;i<80;i++){
    let geometry = new THREE.SphereGeometry(Math.random()*0.6+0.2,8,8);
    let material = new THREE.MeshBasicMaterial({color: colors[Math.floor(Math.random()*colors.length)]});
    let particle = new THREE.Mesh(geometry,material);
    particle.position.set((Math.random()-0.5)*40,0,(Math.random()-0.5)*40);
    particle.vx=(Math.random()-0.5)*1; particle.vy=Math.random()*1.8; particle.vz=(Math.random()-0.5)*1;
    particle.life=120;
    fireworks.push(particle);
    scene.add(particle);
  }
}
setInterval(createFirework,700);

function animate3D() {
  requestAnimationFrame(animate3D);
  fireworks.forEach((p,index)=>{
    p.position.x += p.vx;
    p.position.y += p.vy;
    p.position.z += p.vz;
    p.vy -= 0.025;
    p.life--;
    if(p.life<=0){ scene.remove(p); fireworks.splice(index,1); }
  });
  renderer.render(scene,camera);
}
animate3D();

// Ketupat confetti on click (fungsi asal)
document.addEventListener("click", function(){
  for(let i=0;i<60;i++){
    let k = document.createElement("div");
    k.className = "ketupat";
    let emojis = ["💚","💛","💜","⭐"];
    k.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
    k.style.left = Math.random()*100+"%";
    k.style.animationDuration = (3+Math.random()*3)+"s";
    k.style.transform = `rotate(${Math.random()*360}deg) scale(${0.5+Math.random()})`;
    document.body.appendChild(k);
    setTimeout(()=>k.remove(),4500);
  }
});

// Responsive (fungsi asal)
window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});