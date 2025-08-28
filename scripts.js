// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
function initializeApp() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupFormHandling();
    setupHeaderScrollEffect();
    setupStatsAnimation();
}

// ===== NAVEGACIÓN SUAVE =====
function setupSmoothScrolling() {
    // Seleccionar todos los enlaces de navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular offset para el header fijo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMACIONES AL HACER SCROLL =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Crear intersection observer para animaciones
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Añadir animación con delay escalonado para cards de servicios
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${cardIndex * 0.2}s`;
                }
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });
}

// ===== EFECTO DE HEADER AL HACER SCROLL =====
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Cambiar opacity del header basado en scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(44, 85, 48, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c5530 0%, #4a7c59 100%)';
            header.style.backdropFilter = 'none';
        }

        // Ocultar/mostrar header al hacer scroll (opcional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== ANIMACIÓN DE CONTADORES EN ESTADÍSTICAS =====
function setupStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// ===== FUNCIÓN PARA ANIMAR CONTADORES =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
        const suffix = counter.innerText.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 60; // Duración de la animación
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.innerText = Math.floor(current) + suffix;
        }, 30);
    });
}

// ===== MANEJO DE FORMULARIOS =====
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        setupFormValidation();
    }
}

// ===== VALIDACIÓN DE FORMULARIO =====
function setupFormValidation() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    
    formInputs.forEach(input => {
        // Validación en tiempo real
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Limpiar errores al escribir
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// ===== VALIDAR CAMPO INDIVIDUAL =====
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Limpiar errores previos
    clearFieldError(field);

    // Validaciones específicas
    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Este campo es requerido';
            } else if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
            break;

        case 'tel':
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido';
            }
            break;

        case 'text':
        case 'textarea':
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Este campo es requerido';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Mínimo 2 caracteres requeridos';
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// ===== MOSTRAR ERROR EN CAMPO =====
function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#e74c3c';
    
    // Crear o actualizar mensaje de error
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// ===== LIMPIAR ERROR EN CAMPO =====
function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== MANEJAR ENVÍO DE FORMULARIO =====
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validar todos los campos
    const formData = new FormData(e.target);
    const formInputs = e.target.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Por favor corrige los errores en el formulario', 'error');
        return;
    }
    
    // Simular envío del formulario
    showLoadingState(true);
    
    // Aquí se enviarían los datos al servidor
    setTimeout(() => {
        showLoadingState(false);
        showNotification('¡Gracias por tu consulta! Nos pondremos en contacto contigo muy pronto.', 'success');
        e.target.reset();
    }, 2000);
}

// ===== MOSTRAR ESTADO DE CARGA =====
function showLoadingState(isLoading) {
    const submitButton = document.querySelector('.form-submit');
    
    if (isLoading) {
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
    } else {
        submitButton.textContent = 'Enviar Consulta';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Eliminar notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.9rem',
        zIndex: '9999',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    // Colores según el tipo
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== EFECTOS ADICIONALES =====

// Efecto parallax suave para secciones
function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Lazy loading para imágenes (si se añaden más adelante)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Efecto de tipeo para el título principal
function setupTypingEffect() {
    const titleElement = document.querySelector('.hero h1');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid #FFA500';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remover cursor después de completar
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Iniciar efecto después de un delay
        setTimeout(typeWriter, 1000);
    }
}

// ===== UTILIDADES ADICIONALES =====

// Throttle function para optimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function para optimizar eventos de resize
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Detectar si el dispositivo es móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ===== INICIALIZACIÓN ADICIONAL =====
window.addEventListener('load', function() {
    // Inicializar efectos adicionales después de que todo esté cargado
    setupParallaxEffect();
    setupLazyLoading();
    
    // Añadir clase para indicar que la página está completamente cargada
    document.body.classList.add('loaded');
});

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== EXPORTAR FUNCIONES (si se necesitan en otros archivos) =====
window.AgrodesarrolloApp = {
    showNotification,
    validateField,
    animateCounters
};