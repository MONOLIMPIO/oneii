document.addEventListener("DOMContentLoaded", () => {
    // --- 1. LÓGICA DE LAS PESTAÑAS (VISTAS) ---
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".page-section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("data-target");

            sections.forEach(section => {
                section.classList.remove("active-section");
            });

            navLinks.forEach(nav => {
                nav.classList.remove("active");
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active-section");
                link.classList.add("active");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    // --- 2. LÓGICA DE LA TRIVIA ---
    const respuestasCorrectas = {
        "1": 0, // "El 7k"
        "2": 0, // "La psiconena"
        "3": 2, // "Robándose el pan"
        "4": 0  // "El ing"
    };

    const preguntas = document.querySelectorAll(".trivia-question");

    preguntas.forEach((pregunta) => {
        const numeroPregunta = pregunta.getAttribute("data-question");
        const botones = pregunta.querySelectorAll(".option-btn");
        const feedback = pregunta.querySelector(".trivia-feedback");

        botones.forEach((boton, index) => {
            boton.addEventListener("click", () => {
                botones.forEach(b => b.style.pointerEvents = "none");

                if (index === respuestasCorrectas[numeroPregunta]) {
                    boton.style.backgroundColor = "#d4edda";
                    boton.style.borderColor = "#c3e6cb";
                    boton.style.color = "#155724";
                } else {
                    boton.style.backgroundColor = "#f8d7da";
                    boton.style.borderColor = "#f5c6cb";
                    boton.style.color = "#721c24";
                    
                    botones[respuestasCorrectas[numeroPregunta]].style.backgroundColor = "#d4edda";
                    botones[respuestasCorrectas[numeroPregunta]].style.borderColor = "#c3e6cb";
                    botones[respuestasCorrectas[numeroPregunta]].style.color = "#155724";
                }

                feedback.style.display = "block";
            });
        });
    });

    // --- 3. INTERACTIVIDAD FOTO DE MICAELA ---
    const catPhotoBtn = document.getElementById("cat-photo-btn");
    const catGallery = document.getElementById("cat-gallery");

    if (catPhotoBtn && catGallery) {
        catPhotoBtn.addEventListener("click", () => {
            if (catGallery.style.display === "none" || catGallery.style.display === "") {
                catGallery.style.display = "block";
            } else {
                catGallery.style.display = "none";
            }
        });
    }

    // --- 4. GENERADOR DE RAZONES INTERACTIVAS ---
    const reasons = [
        "Por cómo te ríes de mis ocurrencias y chistes.",
        "Porque admiro muchísimo la pasión con la que estudias psicología.",
        "Por la paz y tranquilidad que me das cuando estamos juntos.",
        "Porque eres la persona más tierna y hermosa del mundo.",
        "Por cada plática bonita y los momentos que compartimos.",
        "Porque me impulsas a ser mejor cada día sin darte cuenta.",
        "Porque tus abrazos son mi lugar favorito en el mundo.",
        "Simplemente, porque eres tú y mi vida es más bonita a tu lado."
    ];

    const reasonText = document.getElementById("reason-text");
    const nextReasonBtn = document.getElementById("next-reason-btn");

    if (reasonText && nextReasonBtn) {
        let currentIndex = 0;
        nextReasonBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % reasons.length;
            
            reasonText.style.opacity = 0;
            setTimeout(() => {
                reasonText.textContent = reasons[currentIndex];
                reasonText.style.opacity = 1;
            }, 150);
        });
    }

    // --- 5. VISOR DE FOTOS (MODAL) ---
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".modal-close");
    
    // Seleccionamos las fotos de la galería general, la foto principal del inicio y las miniaturas del michi
    const zoomableImages = document.querySelectorAll(".hero-main-img, .photo-card img, .cat-mini-img");

    zoomableImages.forEach(img => {
        // Evitamos que la foto de perfil principal de Micaela abra el modal (para que abra su menú de fotos)
        if (img.closest('#cat-photo-btn')) return;

        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});