// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando aplicación...');
    initializeApp();
});

// También ejecutar cuando la ventana esté completamente cargada
window.addEventListener('load', function() {
    console.log('Ventana cargada completamente');
    // Forzar visibilidad de elementos si no se han mostrado
    forceShowElements();
});

// ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
function initializeApp() {
    console.log('Inicializando aplicación...');
    
    // Mostrar elementos inmediatamente si no hay JavaScript de animaciones
    setTimeout(() => {
        forceShowElements();
    }, 100);
    
    setupSmoothScrolling();
    setupScrollAnimations();
    setupFormHandling();
    setupHeaderScrollEffect();
    setupStatsAnimation();
    setupEmailLinks();
    
    console.log('Aplicación inicializada correctamente');
}

// ===== FORZAR MOSTRAR ELEMENTOS =====
function forceShowElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const serviceCards = document.querySelectorAll('.service-card');
    
    console.log('Elementos fade-in encontrados:', fadeElements.length);
    console.log('Tarjetas de servicio encontradas:', serviceCards.length);
    
    // Forzar visibilidad de todos los elementos fade-in
    fadeElements.forEach((element, index) => {
        element.classList.add('visible');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        console.log(`Elemento ${index + 1} mostrado`);
    });
    
    // Asegurar que las tarjetas de servicio sean visibles
    serviceCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.classList.add('visible');
        console.log(`Tarjeta de servicio ${index + 1} mostrada`);
    });
}

// ===== CONFIGURACIÓN DE ENLACES DE EMAIL =====
function setupEmailLinks() {
    const emailInfoItem = document.getElementById('emailInfoItem');
    if (emailInfoItem) {
        emailInfoItem.addEventListener('click', function() {
            openEmailClient('', 'Consulta desde sitio web - AGRODESARROLLO INTEGRAL');
        });
    }

    // Configurar todos los enlaces de email en el footer
    const footerEmailLinks = document.querySelectorAll('a[href="mailto:agrodesarrollointegral@gmail.com"]');
    footerEmailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openEmailClient('', 'Consulta desde sitio web - AGRODESARROLLO INTEGRAL');
        });
    });
    
    console.log('Enlaces de email configurados');
}

// ===== FUNCIÓN PARA ABRIR CLIENTE DE EMAIL =====
function openEmailClient(body = '', subject = '') {
    const email = 'agrodesarrollointegral@gmail.com';
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    window.open(mailtoLink, '_self');
}

// ===== NAVEGACIÓN SUAVE =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('Navegación suave configurada');
}

// ===== ANIMACIONES AL HACER SCROLL =====
function setupScrollAnimations() {
    // Verificar si IntersectionObserver está disponible
    if (!window.IntersectionObserver) {
        console.log('IntersectionObserver no disponible, mostrando todos los elementos');
        forceShowElements();
        return;
    }
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${cardIndex * 0.15}s`;
                }
            }
        });
    }, observerOptions);

    const fadeInElements = document.querySelectorAll('.fade-in');
    console.log('Configurando observador para', fadeInElements.length, 'elementos');
    
    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Fallback: mostrar elementos después de 2 segundos si no se han mostrado
    setTimeout(() => {
        fadeInElements.forEach(element => {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 2000);
}

// ===== EFECTO DE HEADER AL HACER SCROLL =====
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;

    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.background = 'rgba(26, 71, 42, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(26, 71, 42, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }

        if (scrollTop > lastScrollTop && scrollTop > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 16));
    
    console.log('Efecto de header configurado');
}

// ===== ANIMACIÓN DE CONTADORES =====
function setupStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
    console.log('Animación de estadísticas configurada');
}

// ===== FUNCIÓN PARA ANIMAR CONTADORES =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    console.log('Animando', counters.length, 'contadores');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
        const suffix = counter.innerText.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.innerText = Math.floor(current) + suffix;
        }, 25);
    });
}

// ===== MANEJO DE FORMULARIOS =====
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        setupFormValidation();
        console.log('Formulario de contacto configurado');
    } else {
        console.warn('Formulario de contacto no encontrado');
    }
}

// ===== VALIDACIÓN DE FORMULARIO =====
function setupFormValidation() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

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

    clearFieldError(field);

    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'El correo electrónico es requerido';
            } else if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un correo electrónico válido';
            }
            break;

        case 'tel':
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido (mínimo 10 dígitos)';
            }
            break;

        default:
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Este campo es requerido';
            } else if (value && value.length < 2) {
                isValid = false;
                errorMessage = 'Mínimo 2 caracteres requeridos';
            }
            break;
    }

    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Por favor selecciona una opción';
    }

    if (field.tagName === 'TEXTAREA' && field.hasAttribute('required') && value.length < 10) {
        isValid = false;
        errorMessage = 'Por favor proporciona más detalles (mínimo 10 caracteres)';
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
    
    const formInputs = e.target.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Por favor corrige los errores en el formulario antes de continuar', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    showLoadingState(true);
    
    enviarEmail(formObject)
        .then(() => {
            showLoadingState(false);
            showNotification('¡Gracias por tu consulta! Nos pondremos en contacto contigo en menos de 24 horas para brindarte la mejor asesoría especializada.', 'success');
            e.target.reset();
        })
        .catch((error) => {
            showLoadingState(false);
            console.error('Error al enviar formulario:', error);
            showNotification('Hubo un error al enviar tu consulta. Por favor intenta nuevamente o contáctanos directamente a agrodesarrollointegral@gmail.com', 'error');
        });
}

// ===== FUNCIÓN PARA ENVIAR EMAIL =====
async function enviarEmail(datos) {
    const emailBody = `
Nueva Consulta desde el Sitio Web - AGRODESARROLLO INTEGRAL

═══════════════════════════════════════════════════════════
INFORMACIÓN DEL CLIENTE
═══════════════════════════════════════════════════════════
• Nombre Completo: ${datos.nombre}
• Empresa/Organización: ${datos.empresa || 'No especificada'}
• Correo Electrónico: ${datos.email}
• Teléfono: ${datos.telefono || 'No proporcionado'}
• Servicio de Interés: ${getServiceName(datos.servicio)}

═══════════════════════════════════════════════════════════
MENSAJE DEL CLIENTE
═══════════════════════════════════════════════════════════
${datos.mensaje}

═══════════════════════════════════════════════════════════
INFORMACIÓN ADICIONAL
═══════════════════════════════════════════════════════════
• Fecha y Hora: ${new Date().toLocaleString('es-MX', {
    timeZone: 'America/Hermosillo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}
• Formulario de Contacto: Sitio Web Oficial
• Ubicación: Ciudad Obregón, Sonora, México

Esta consulta requiere seguimiento dentro de las próximas 24 horas.

---
AGRODESARROLLO INTEGRAL
Asesoría Integral en Agronegocios
www.agrodesarrollointegral.com
    `.trim();

    const subject = encodeURIComponent(`🌾 Nueva Consulta - ${datos.nombre} - ${getServiceName(datos.servicio)}`);
    const body = encodeURIComponent(emailBody);
    
    const mailtoLink = `mailto:agrodesarrollointegral@gmail.com?subject=${subject}&body=${body}`;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        window.open(mailtoLink, '_self');
        
        console.log('Datos del formulario enviados:', {
            timestamp: new Date().toISOString(),
            cliente: datos.nombre,
            servicio: datos.servicio,
            email: datos.email
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error('Error al abrir cliente de email:', error);
        return Promise.reject(error);
    }
}

// ===== OBTENER NOMBRE COMPLETO DEL SERVICIO =====
function getServiceName(serviceId) {
    const services = {
        'vinculacion': 'Vinculación a Mercados',
        'asesoria': 'Asesoría Integral',
        'financiamiento': 'Gestión de Financiamiento',
        'proyectos': 'Proyectos Agropecuarios',
        'consultoria': 'Consultoría General'
    };
    
    return services[serviceId] || serviceId;
}

// ===== MOSTRAR ESTADO DE CARGA =====
function showLoadingState(isLoading) {
    const submitButton = document.querySelector('.form-submit');
    if (!submitButton) return;
    
    const submitText = submitButton.querySelector('.submit-text');
    const loadingText = submitButton.querySelector('.loading-text');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        if (submitText) submitText.style.display = 'none';
        if (loadingText) loadingText.style.display = 'inline-flex';
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        if (submitText) submitText.style.display = 'inline';
        if (loadingText) loadingText.style.display = 'none';
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const icons = {
        success: '✓',
        error: '⚠',
        warning: '⚡',
        info: 'ℹ'
    };
    
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.8rem;">
            <span style="font-size: 1.2rem; flex-shrink: 0;">${icon}</span>
            <span style="line-height: 1.4;">${message}</span>
        </div>
    `;
    
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 6000);
}

// ===== UTILIDADES =====
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

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ===== EFECTOS ADICIONALES =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setupParallaxEffect();
});

// ===== EFECTO PARALLAX =====
function setupParallaxEffect() {
    if (!isMobileDevice()) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }
}

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.AgrodesarrolloApp = {
    showNotification,
    validateField,
    animateCounters,
    enviarEmail,
    openEmailClient,
    forceShowElements
};

// ===== CONFIGURACIÓN DE ENLACES DE EMAIL =====
function setupEmailLinks() {
    const emailInfoItem = document.getElementById('emailInfoItem');
    if (emailInfoItem) {
        emailInfoItem.addEventListener('click', function() {
            openEmailClient('', 'Consulta desde sitio web - AGRODESARROLLO INTEGRAL');
        });
    }

    // Configurar todos los enlaces de email en el footer
    const footerEmailLinks = document.querySelectorAll('a[href="mailto:agrodesarrollointegral@gmail.com"]');
    footerEmailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openEmailClient('', 'Consulta desde sitio web - AGRODESARROLLO INTEGRAL');
        });
    });
}

// ===== FUNCIÓN PARA ABRIR CLIENTE DE EMAIL =====
function openEmailClient(body = '', subject = '') {
    const email = 'agrodesarrollointegral@gmail.com';
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    window.open(mailtoLink, '_self');
}

// ===== NAVEGACIÓN SUAVE =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
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
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${cardIndex * 0.15}s`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        fadeInObserver.observe(element);
    });
}

// ===== EFECTO DE HEADER AL HACER SCROLL =====
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.background = 'rgba(26, 71, 42, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(26, 71, 42, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }

        if (scrollTop > lastScrollTop && scrollTop > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 16));
}

// ===== ANIMACIÓN DE CONTADORES =====
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
    }, { threshold: 0.3 });

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
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.innerText = Math.floor(current) + suffix;
        }, 25);
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
        input.addEventListener('blur', function() {
            validateField(this);
        });

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

    clearFieldError(field);

    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'El correo electrónico es requerido';
            } else if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un correo electrónico válido';
            }
            break;

        case 'tel':
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido (mínimo 10 dígitos)';
            }
            break;

        default:
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Este campo es requerido';
            } else if (value && value.length < 2) {
                isValid = false;
                errorMessage = 'Mínimo 2 caracteres requeridos';
            }
            break;
    }

    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Por favor selecciona una opción';
    }

    if (field.tagName === 'TEXTAREA' && field.hasAttribute('required') && value.length < 10) {
        isValid = false;
        errorMessage = 'Por favor proporciona más detalles (mínimo 10 caracteres)';
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
    
    const formInputs = e.target.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Por favor corrige los errores en el formulario antes de continuar', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    showLoadingState(true);
    
    enviarEmail(formObject)
        .then(() => {
            showLoadingState(false);
            showNotification('¡Gracias por tu consulta! Nos pondremos en contacto contigo en menos de 24 horas para brindarte la mejor asesoría especializada.', 'success');
            e.target.reset();
        })
        .catch((error) => {
            showLoadingState(false);
            console.error('Error al enviar formulario:', error);
            showNotification('Hubo un error al enviar tu consulta. Por favor intenta nuevamente o contáctanos directamente a agrodesarrollointegral@gmail.com', 'error');
        });
}

// ===== FUNCIÓN PARA ENVIAR EMAIL =====
async function enviarEmail(datos) {
    const emailBody = `
Nueva Consulta desde el Sitio Web - AGRODESARROLLO INTEGRAL

═══════════════════════════════════════════════════════════
INFORMACIÓN DEL CLIENTE
═══════════════════════════════════════════════════════════
• Nombre Completo: ${datos.nombre}
• Empresa/Organización: ${datos.empresa || 'No especificada'}
• Correo Electrónico: ${datos.email}
• Teléfono: ${datos.telefono || 'No proporcionado'}
• Servicio de Interés: ${getServiceName(datos.servicio)}

═══════════════════════════════════════════════════════════
MENSAJE DEL CLIENTE
═══════════════════════════════════════════════════════════
${datos.mensaje}

═══════════════════════════════════════════════════════════
INFORMACIÓN ADICIONAL
═══════════════════════════════════════════════════════════
• Fecha y Hora: ${new Date().toLocaleString('es-MX', {
    timeZone: 'America/Hermosillo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}
• Formulario de Contacto: Sitio Web Oficial
• Ubicación: Ciudad Obregón, Sonora, México

Esta consulta requiere seguimiento dentro de las próximas 24 horas.

---
AGRODESARROLLO INTEGRAL
Asesoría Integral en Agronegocios
www.agrodesarrollointegral.com
    `.trim();

    const subject = encodeURIComponent(`🌾 Nueva Consulta - ${datos.nombre} - ${getServiceName(datos.servicio)}`);
    const body = encodeURIComponent(emailBody);
    
    const mailtoLink = `mailto:agrodesarrollointegral@gmail.com?subject=${subject}&body=${body}`;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        window.open(mailtoLink, '_self');
        
        console.log('Datos del formulario enviados:', {
            timestamp: new Date().toISOString(),
            cliente: datos.nombre,
            servicio: datos.servicio,
            email: datos.email
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error('Error al abrir cliente de email:', error);
        return Promise.reject(error);
    }
}

// ===== OBTENER NOMBRE COMPLETO DEL SERVICIO =====
function getServiceName(serviceId) {
    const services = {
        'vinculacion': 'Vinculación a Mercados',
        'asesoria': 'Asesoría Integral',
        'financiamiento': 'Gestión de Financiamiento',
        'proyectos': 'Proyectos Agropecuarios',
        'consultoria': 'Consultoría General'
    };
    
    return services[serviceId] || serviceId;
}

// ===== MOSTRAR ESTADO DE CARGA =====
function showLoadingState(isLoading) {
    const submitButton = document.querySelector('.form-submit');
    const submitText = submitButton.querySelector('.submit-text');
    const loadingText = submitButton.querySelector('.loading-text');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        if (submitText) submitText.style.display = 'none';
        if (loadingText) loadingText.style.display = 'inline-flex';
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        if (submitText) submitText.style.display = 'inline';
        if (loadingText) loadingText.style.display = 'none';
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const icons = {
        success: '✓',
        error: '⚠',
        warning: '⚡',
        info: 'ℹ'
    };
    
    const icon = icons[type] || icons.info;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.8rem;">
            <span style="font-size: 1.2rem; flex-shrink: 0;">${icon}</span>
            <span style="line-height: 1.4;">${message}</span>
        </div>
    `;
    
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 6000);
}

// ===== UTILIDADES =====
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

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ===== EFECTOS ADICIONALES =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setupParallaxEffect();
});

// ===== EFECTO PARALLAX =====
function setupParallaxEffect() {
    if (!isMobileDevice()) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }
}

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.AgrodesarrolloApp = {
    showNotification,
    validateField,
    animateCounters,
    enviarEmail,
    openEmailClient
};