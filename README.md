# Phone Store

Aplicación de tienda de teléfonos móviles desarrollada con React, TypeScript y Vite.

## Características

- Listado de productos
- Vista detallada de productos
- Carrito de compra con manejo de cantidades
- Almacenamiento del carrito en localStorage

## Requisitos

- Node.js (v18 o superior)
- pnpm (v10 o superior)

## Instalación

1. Clona este repositorio
2. Instala las dependencias:

```bash
pnpm install
```

## Ejecución

Para iniciar el proyecto en modo desarrollo:

```bash
pnpm dev
```

Para construir el proyecto para producción:

```bash
pnpm build
```

Para previsualizar la versión de producción:

```bash
pnpm preview
```

## Tests

El proyecto incluye tests unitarios para los componentes principales y el contexto de productos. Todos los tests están escritos en inglés y configurados para mostrar información detallada (verbose).

### Ejecutar todos los tests

```bash
pnpm test
```

### Ejecutar tests en modo watch

```bash
pnpm test
```

### Ejecutar tests una sola vez

```bash
pnpm test:run
```

### Ejecutar tests con cobertura

```bash
pnpm test:coverage
```

## Estructura de pruebas

El proyecto utiliza las siguientes bibliotecas para testing:

- Vitest: Framework de pruebas
- React Testing Library: Utilidades para probar componentes React
- @testing-library/user-event: Simulación de eventos de usuario
- jsdom: Simulación de DOM para testing

### Estructura de los archivos de test

- `src/test/setup.ts`: Configuración global para todos los tests
- `src/test/utils.tsx`: Utilidades comunes para testing, incluyendo renderizado con proveedores
- `src/ui/stores/productContext.test.tsx`: Tests del contexto de productos
- `src/ui/views/Cart/Cart.test.tsx`: Tests del componente de carrito
- `src/ui/views/Detail/Detail.test.tsx`: Tests del componente de detalle de producto

### Convenciones de tests

- Todos los tests están escritos en inglés
- Uso del modo verbose para visualizar información detallada
- Uso de selectores independientes del idioma para mayor robustez

## Posibles mejoras

- Añadir más tests para cubrir más componentes
- Implementar tests de integración
- Añadir tests E2E con Cypress o Playwright

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
