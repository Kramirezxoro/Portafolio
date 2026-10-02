document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Botón "Volver Arriba"
    const btnTop = document.getElementById("btnTop");
    
    window.addEventListener("scroll", () => {
        // Muestra el botón si se baja más de 300px
        if (window.scrollY > 300) {
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    });

    btnTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Desplazamiento suave
        });
    });


    // 2. Animación de aparición (Fade-in) con IntersectionObserver
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15, // Ejecuta cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            // Si el elemento es visible, le agrega la clase 'visible'
            entry.target.classList.add('visible');
            
            // Animación de las barras de progreso si estamos en la sección de habilidades
            if (entry.target.id === 'habilidades') {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
            
            // Deja de observar el elemento una vez que ya apareció
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });


    // 3. Validación del formulario de contacto
    const form = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que se recargue la página
            
            // Verifica si el formulario cumple con las validaciones de HTML5
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated'); // Muestra los errores de Bootstrap
                mostrarAlerta('Por favor, completa correctamente todos los campos.', 'danger');
                return;
            }

            // Simula el envío exitoso
            mostrarAlerta('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            form.reset(); // Limpia los campos
            form.classList.remove('was-validated');
        });
    }

    // Función auxiliar para mostrar alertas en el formulario
    function mostrarAlerta(mensaje, tipo) {
        formAlert.className = `alert alert-${tipo} mt-3`;
        formAlert.textContent = mensaje;
        formAlert.classList.remove('d-none');
        
        // Ocultar alerta después de 4 segundos
        setTimeout(() => {
            formAlert.classList.add('d-none');
        }, 4000);
    }
});
