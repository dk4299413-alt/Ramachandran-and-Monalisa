const loader = document.getElementById("loader");
const explore = document.getElementById("explore");
const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("musicAudio");

// ================================
// PAGE LOADER
// ================================

setTimeout(() => {
  if (loader) {
    loader.classList.add("hide");
  }
}, 1500);


// ================================
// EXPLORE INVITATION
// ================================

if (explore) {
  explore.addEventListener("click", async () => {

    // Start music after user taps
    try {
      if (audio) {
        audio.volume = 0.7;
        await audio.play();

        if (musicBtn) {
          musicBtn.classList.add("playing");
          musicBtn.textContent = "♫";
        }
      }
    } catch (error) {
      console.log("Music could not start:", error);
    }

    // Scroll to invitation
    const welcome = document.querySelector(".welcome");

    if (welcome) {
      welcome.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
}


// ================================
// MUSIC ON / OFF
// ================================

if (musicBtn) {
  musicBtn.addEventListener("click", async () => {

    try {

      if (audio.paused) {

        audio.volume = 0.7;

        await audio.play();

        musicBtn.classList.add("playing");
        musicBtn.textContent = "♫";

      } else {

        audio.pause();

        musicBtn.classList.remove("playing");
        musicBtn.textContent = "♪";

      }

    } catch (error) {

      console.log("Music error:", error);

    }

  });
}


// ================================
// SECTION ANIMATIONS
// ================================

const sections = document.querySelectorAll(".reveal-section");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.14
  }
);

sections.forEach((section) => {
  observer.observe(section);
});


// ================================
// WHATSAPP NUMBERS
// ================================
//
// IMPORTANT:
// No + sign
// No spaces
// No hyphens
//
// India country code = 91
//

const WHATSAPP = {
  groom: "919150751177",
  bride: "919551555093"
};


// ================================
// WEDDING WISHES
// ================================

const guestName = document.getElementById("guestName");
const wishTo = document.getElementById("wishTo");
const wishMessage = document.getElementById("wishMessage");
const sendWish = document.getElementById("sendWish");


// Quick wish buttons
document.querySelectorAll(".quick-wishes button").forEach((button) => {

  button.addEventListener("click", () => {

    if (wishMessage) {
      wishMessage.value = button.dataset.msg;
      wishMessage.focus();
    }

  });

});


// Send WhatsApp wish
if (sendWish) {

  sendWish.addEventListener("click", () => {

    const name =
      guestName && guestName.value.trim()
        ? guestName.value.trim()
        : "A well-wisher";

    const message =
      wishMessage && wishMessage.value.trim()
        ? wishMessage.value.trim()
        : "Wishing you both a lifetime filled with love, happiness and togetherness. Congratulations! ❤️";

    const target = wishTo ? wishTo.value : "both";

    const createWhatsAppURL = (number, recipient) => {

      const whatsappMessage =
        `Dear ${recipient},\n\n` +
        `${message}\n\n` +
        `With love,\n${name}`;

      return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;
    };


    // =========================
    // SEND ONLY TO GROOM
    // =========================

    if (target === "groom") {

      const url = createWhatsAppURL(
        WHATSAPP.groom,
        "Ramachandran G"
      );

      window.location.href = url;
      return;
    }


    // =========================
    // SEND ONLY TO BRIDE
    // =========================

    if (target === "bride") {

      const url = createWhatsAppURL(
        WHATSAPP.bride,
        "Monalisa B"
      );

      window.location.href = url;
      return;
    }


    // =========================
    // SEND TO BOTH
    // =========================

    if (target === "both") {

      const groomURL = createWhatsAppURL(
        WHATSAPP.groom,
        "Ramachandran G"
      );

      const brideURL = createWhatsAppURL(
        WHATSAPP.bride,
        "Monalisa B"
      );


      // Open groom WhatsApp first
      window.open(groomURL, "_blank");


      // Open bride WhatsApp after a short delay
      setTimeout(() => {

        window.open(brideURL, "_blank");

      }, 1500);

    }

  });

}
