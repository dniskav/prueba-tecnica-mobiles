# Phone Store

Aplicación de tienda de teléfonos móviles desarrollada con React, TypeScript y Vite.

## Requisitos previos

- Node.js 18 o superior
- pnpm 8 o superior

## Instalación

```bash
# Instalar dependencias
pnpm install
```

## Scripts disponibles

### Modo desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
pnpm dev
```

Esto iniciará el servidor de desarrollo en [http://localhost:3000](http://localhost:3000) con recarga en caliente y apuntará a la API de desarrollo según las variables de entorno en `.env.development`.

### Construir para producción

Para construir la aplicación para producción:

```bash
pnpm build
pnpm start
```

Este comando generará los archivos optimizados en la carpeta `dist` utilizando las variables de entorno de `.env.production`.

### Construir para entorno de desarrollo

Si necesitas generar una build de desarrollo:

```bash
pnpm build:dev
```

### Previsualizar la build

Para previsualizar la build generada:

```bash
pnpm preview
```

### Servir la aplicación de producción

Para construir y servir la aplicación como en producción:

```bash
pnpm serve:prod
```

Este comando construirá la aplicación con configuración de producción y la servirá en el puerto 4173.

## Configuración de entornos

La aplicación utiliza archivos `.env` para configurar diferentes entornos:

- `.env.development`: Variables para desarrollo local
- `.env.production`: Variables para entorno de producción

Las variables disponibles son:

| Variable                | Descripción                               |
| ----------------------- | ----------------------------------------- |
| VITE_API_KEY            | Clave de API para autenticación           |
| VITE_API_BASE_URL       | URL base de la API                        |
| VITE_ENABLE_CACHE       | Habilitar caché (true/false)              |
| VITE_DEFAULT_PAGE_SIZE  | Tamaño de página predeterminado           |
| VITE_CACHE_TIME_MINUTES | Tiempo de caché en minutos                |
| VITE_DEBUG_MODE         | Habilitar modo de depuración (true/false) |

## Características

- Aplicación React con TypeScript y Vite
- Enrutamiento con React Router
- Gestión de estado con Context API
- Organización de código por módulos y dominios
- Configuración de entornos (desarrollo/producción)
- Optimizaciones específicas por entorno

## Estructura del proyecto

```
src/
  ├── assets/           # Recursos estáticos
  ├── core/             # Funcionalidad central y compartida
  │   ├── components/   # Componentes reutilizables
  │   ├── hooks/        # Hooks personalizados
  │   └── infrastructure/ # Servicios e infraestructura
  ├── modules/          # Módulos de dominio
  │   ├── product/      # Módulo de productos
  │   └── cart/         # Módulo de carrito
  └── ui/               # Componentes de interfaz de usuario
      ├── components/   # Componentes de UI
      ├── stores/       # Estado global
      └── views/        # Vistas/páginas
```
