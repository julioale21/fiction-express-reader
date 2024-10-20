<p align="center">
  <img width="400" src="https://es.fictionexpress.com/static/images/logo/fiction-express.svg" alt="Fiction Express Logo">
</p>

# Fiction Express Reader App - Test Técnico (Frontend)

## Descripción del Proyecto

Este proyecto es un test técnico que simula el desarrollo del frontend para una aplicación de lectura infantil. El objetivo es demostrar habilidades en el desarrollo de aplicaciones web modernas, centrándose en la creación de una interfaz intuitiva y funcional para una plataforma de lectura digital.

## Tecnologías y Herramientas Utilizadas

### Next.js 14 con TypeScript

Elegí Next.js 14 para este test por su eficiencia en el renderizado del lado del servidor y su nuevo sistema de App Router. La integración con TypeScript añade un nivel adicional de seguridad de tipos, crucial para proyectos escalables.

### Material UI (MUI)

MUI fue seleccionado para crear una interfaz de usuario coherente y atractiva. Su sistema de componentes predefinidos permitió un desarrollo rápido, ideal para las limitaciones de tiempo de un test técnico.

### NextAuth para Autenticación

Implementé NextAuth para simular un sistema de autenticación robusto. Aunque para este test no se requiere una autenticación completa, NextAuth demuestra cómo se manejaría la seguridad en una aplicación real.

### React Query (TanStack)

React Query se utilizó para gestionar el estado y las solicitudes al servidor. Su implementación muestra cómo se puede optimizar el rendimiento y la experiencia del usuario en una aplicación de lectura.

### Axios

Axios se empleó para las llamadas a la API simulada. Su configuración en este proyecto demuestra cómo se manejarían las comunicaciones cliente-servidor en un entorno de producción.

### Lottie y Motion Animations

Incorporé animaciones Lottie y Motion para mostrar cómo se pueden crear interfaces interactivas y atractivas, especialmente importantes en aplicaciones dirigidas a niños.

## Estructura del Proyecto

```
├── docs                 # Documentación para el README
├── public               # Archivos estáticos
├── src
    ├── animations
    ├── app              # Sistema de rutas de Next.js
        ├── api            # Configuración de NextAuth
        ├── auth            # vistas y componentes de la autenticación
        ├── books
            ├── [id]         # Ruta dinámica para detalles del libro
            ├── components   # Componentes específicos
            ├── contexts     # Contextos
            ├── hooks        # Custom hooks y React Query hooks
            ├── types        # Interfaces y tipos
        ├── metrics            # Componentes y vistas para manejar las métricas
        ├── common         # Componentes y utilidades compartidas
        ├── config         # Configuraciones
        ├── constants
        ├── infrastructure # Datos mock para simular backend
        ├── utils
        - middleware      # protección de rutas
└── README.md
.env.local
```

Esta estructura demuestra una organización modular y escalable del código, esencial para proyectos de gran escala.

## Configuración y Ejecución Local

Para ejecutar este proyecto de test en tu entorno local:

1. Clona el repositorio:
   ```
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Navega al directorio del proyecto:
   ```
   cd fiction-express-reader-test
   ```

3. Copia `.env.example` a `.env.local` y configura las variables:
   ```
   NEXT_PUBLIC_BOOKS_SERVER_URL=http://localhost:3002/api/v1
   NEXTAUTH_SECRET=cualquier_cadena_secreta_para_el_test
   ```

4. Instala las dependencias:
   ```
   npm install
   ```

5. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

6. Abre `http://localhost:3000` en tu navegador

## Funcionalidades Implementadas

- Listado de libros mock
- Detalle de libro individual
- Simulación de autenticación de usuario
- Métricas de lectura simuladas (tiempo por página, tiempo total)
- Interfaz responsive

## Notas Adicionales

- Este proyecto es un test técnico y no una aplicación en producción.
- Las funcionalidades están simuladas y no conectan con un backend real.
- El enfoque principal es demostrar habilidades de frontend y arquitectura de aplicaciones.

## Áreas de Mejora (en un escenario real)

- Implementación de tests unitarios y de integración
- Optimización de rendimiento para carga de libros extensos
- Integración con un backend real para gestión de usuarios y contenido

---

Este proyecto de test técnico demuestra capacidades en desarrollo frontend moderno, arquitectura de aplicaciones y uso de tecnologías actuales en el contexto de una aplicación de lectura digital.
