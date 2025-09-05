# 🌾 AGRODESARROLLO INTEGRAL - Sitio Web

## 📁 Estructura de Archivos

Tu sitio web mejorado ahora está organizado en 3 archivos separados:

```
proyecto/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS personalizados
├── script.js          # JavaScript funcionalidades
└── README.md          # Este archivo de instrucciones
```

## 🚀 Cómo Implementar

### 1. Crear los Archivos
1. Crea una carpeta nueva para tu proyecto
2. Crea los 3 archivos principales:
   - `index.html` (copia el código del primer artefacto)
   - `styles.css` (copia el código del segundo artefacto)
   - `script.js` (copia el código del tercer artefacto)

### 2. Estructura de Carpetas
```
tu-sitio-web/
├── index.html
├── styles.css
├── script.js
├── images/             # Para futuras imágenes locales
└── assets/             # Para recursos adicionales
```

## ✨ Características Implementadas

### 📧 **Sistema de Envío de Correos**
- Formulario conectado a **agrodesarrollointegral@gmail.com**
- Validación completa en tiempo real
- Formato profesional de emails
- Manejo de errores y confirmaciones

### 🎨 **Diseño Profesional**
- Inspirado en Grupo Agrocampo
- Colores corporativos verde-naranja
- Tipografía Inter profesional
- Efectos hover y animaciones suaves

### 📱 **Completamente Responsivo**
- Optimizado para móviles, tablets y escritorio
- Navegación adaptativa
- Imágenes que escalan correctamente

### 🖼️ **Imágenes de Alta Calidad**
- Hero section con agricultura profesional
- Sección "Nosotros" con campo mexicano
- Estadísticas con fondo de cultivos
- Efectos parallax en desktop

## 🛠️ Personalización

### Cambiar Información de Contacto
En `index.html`, actualiza:
```html
<!-- Teléfono -->
<a href="tel:+526441234567">TU_TELEFONO</a>

<!-- Email -->
<a href="mailto:agrodesarrollointegral@gmail.com">TU_EMAIL</a>

<!-- WhatsApp -->
<a href="https://wa.me/526441234567?text=...">TU_WHATSAPP</a>
```

### Modificar Colores
En `styles.css`, cambia las variables CSS:
```css
:root {
    --primary-green: #1a472a;    /* Verde principal */
    --orange: #FF6B35;           /* Naranja */
    --secondary-green: #2d5f3f;  /* Verde secundario */
    --accent-green: #4CAF50;     /* Verde acento */
}
```

### Cambiar Logo
Actualiza el logo en `index.html`:
```html
<div class="logo-img">
    A  <!-- Cambia por tu inicial o ícono -->
</div>
<div class="logo-text">TU EMPRESA</div>
```

### Actualizar Estadísticas
En `index.html`, modifica los números:
```html
<div class="stat-item">
    <h3>500+</h3>  <!-- Tu número -->
    <p>Tu Descripción</p>
</div>
```

## 🔧 Funcionalidades Técnicas

### Sistema de Email
- **Archivo**: `script.js` - función `enviarEmail()`
- **Destino**: agrodesarrollointegral@gmail.com
- **Formato**: Email estructurado con todos los datos del formulario
- **Validación**: Campos obligatorios y formato de email/teléfono

### Animaciones
- **Scroll suave** entre secciones
- **Fade in** para elementos al aparecer en pantalla
- **Contadores animados** en estadísticas
- **Parallax** en hero y estadísticas (solo desktop)
- **Hover effects** en tarjetas y botones

### Responsive Design
- **Breakpoints**: 1024px, 768px, 480px
- **Grid system**: CSS Grid y Flexbox
- **Typography**: Escalable con clamp()
- **Images**: Adaptables según dispositivo

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

### Dispositivos
- **Desktop**: 1200px+
- **Tablet**: 768px - 1024px
- **Mobile**: 320px - 767px

## 🎯 SEO Optimizado

### Meta Tags Incluidos
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
```

### Estructura Semántica
- Headers jerárquicos (H1, H2, H3)
- Alt text en imágenes
- Enlaces descriptivos
- Schema markup ready

## 🚀 Optimizaciones de Performance

### Recursos Externos Mínimos
- Bootstrap CSS/JS (CDN)
- Bootstrap Icons (CDN)
- Google Fonts (Inter)
- Imágenes Unsplash (optimizadas)

### Técnicas Implementadas
- **Lazy loading** preparado
- **Intersection Observer** para animaciones
- **Throttling** en eventos scroll
- **CSS animations** hardware-accelerated

## 📋 Lista de Verificación

### Antes de Publicar
- [ ] Actualizar información de contacto
- [ ] Cambiar números de teléfono reales
- [ ] Verificar email de destino
- [ ] Probar formulario de contacto
- [ ] Revisar enlaces de WhatsApp
- [ ] Validar texto en todos los dispositivos
- [ ] Comprobar velocidad de carga

### Testing
- [ ] Probar en móvil
- [ ] Validar en tablet
- [ ] Verificar en diferentes navegadores
- [ ] Testear formulario de contacto
- [ ] Revisar animaciones
- [ ] Comprobar enlaces externos

## 🔄 Actualizaciones Futuras

### Posibles Mejoras
1. **Galería de proyectos** con casos de éxito
2. **Blog/Noticias** del sector agropecuario
3. **Testimonios** con carrusel automático
4. **Chat en vivo** con WhatsApp Business
5. **Calculadora** de financiamiento
6. **Mapa interactivo** de ubicación

### Integraciones Posibles
- Google Analytics
- Facebook Pixel
- Google Maps
- EmailJS para envío directo
- CRM integration
- Payment gateway

## 📞 Soporte

Para dudas sobre implementación o customización:

1. **Email**: agrodesarrollointegral@gmail.com
2. **WhatsApp**: +52 644 123 4567
3. **Documentación**: Este archivo README

## 📝 Notas Importantes

### Email Functionality
El sistema actual utiliza `mailto:` que abre el cliente de email del usuario. Para envío automático considera:
- EmailJS (gratis hasta 200 emails/mes)
- Netlify Forms (si usas Netlify hosting)
- PHP mail() si tienes servidor propio

### Hosting Recomendado
- **Netlify** (gratis con dominio personalizado)
- **Vercel** (gratis para proyectos estáticos)
- **GitHub Pages** (gratis con repositorio público)

### Dominio Sugerido
- agrodesarrollointegral.com
- agrodesarrollointegral.mx
- agrodesarrollointegral.com.mx

---

*Sitio web creado con tecnologías modernas y optimizado para el sector agropecuario mexicano.*