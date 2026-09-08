const loader=document.getElementById("loader");
const explore=document.getElementById("explore");
const musicBtn=document.getElementById("musicBtn");
const audio=document.getElementById("musicAudio");

window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),700));
explore.addEventListener("click",()=>document.querySelector(".welcome").scrollIntoView({behavior:"smooth"}));

const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})
},{threshold:.14});
document.querySelectorAll(".reveal-section").forEach(x=>obs.observe(x));

musicBtn.addEventListener("click",async()=>{
  try{
    if(audio.paused){await audio.play();musicBtn.classList.add("playing");musicBtn.textContent="♫"}
    else{audio.pause();musicBtn.classList.remove("playing");musicBtn.textContent="♪"}
  }catch(err){alert("Please keep wedding.mp3 in the same folder as index.html.")}
});

/*
  IMPORTANT:
  Replace these with the real WhatsApp numbers.
  Country code only, no +, spaces or dashes.
  Example: India 919876543210
*/
const WHATSAPP={
  groom:"+919150751177",
  bride:"+919551555093"
};

const guest=document.getElementById("guestName");
const wishTo=document.getElementById("wishTo");
const wishMessage=document.getElementById("wishMessage");
const sendWish=document.getElementById("sendWish");

document.querySelectorAll(".quick-wishes button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    wishMessage.value=btn.dataset.msg;
    wishMessage.focus();
  });
});

sendWish.addEventListener("click",()=>{
  const name=guest.value.trim()||"A well-wisher";
  const message=wishMessage.value.trim()||"Wishing you both a lifetime filled with love, happiness and togetherness. Congratulations! ❤️";
  const target=wishTo.value;
  let number=WHATSAPP.groom;
  let recipient="Ramachandran G";

  if(target==="bride"){number=WHATSAPP.bride;recipient="Monalisa B";}
  if(target==="both"){
    number=WHATSAPP.groom;
    recipient="Ramachandran G & Monalisa B";
  }

  const text=`Dear ${recipient},%0A%0A${encodeURIComponent(message)}%0A%0AWith love,%0A${encodeURIComponent(name)}`;
  const url=`https://wa.me/${number}?text=${text}`;
  window.open(url,"_blank","noopener");
});
