# BarrioStock — Mi Tienda (Expo SDK 54)

**Estudiante:** Gustavo Cruz  
**Código:** 0182120011

Aplicación React Native + Expo Router + TypeScript con SQLite (Drizzle ORM) como fuente de verdad, Supabase Auth y sincronización manual. Proyecto alternativo con interfaz y organización propias.

## Preparación

1. Extrae el ZIP y abre **la carpeta que contiene `package.json`** en VS Code.
2. Crea un proyecto propio en https://supabase.com/dashboard.
3. En Authentication → Providers → Email, desactiva **Confirm email** para iniciar sesión inmediatamente tras registrarte.
4. En SQL Editor ejecuta todo el contenido de `supabase/schema.sql`.
5. Copia `.env.example` a `.env` y completa **solo** la URL y la publishable key de tu proyecto.
6. Ejecuta `npm install`, luego `npx expo install --fix` y `npx expo start -c`.
7. Abre Expo Go y escanea el QR.

> Nunca subas `.env` ni una clave secreta a GitHub. El repositorio debe incluir `.env.example`.

## Uso

- Regístrate o inicia sesión.
- Agrega productos, edítalos tocándolos o elimínalos con el botón **Eliminar** (pide confirmación).
- Activa modo avión y comprueba que el CRUD sigue funcionando.
- Al recuperar internet, pulsa **Sincronizar**. Primero baja los faltantes y luego sube los pendientes.
- El indicador **Pendiente / Respaldado** muestra el estado de cada producto.

## Capturas reales para la entrega

Toma las siete capturas desde tu dispositivo y guarda los archivos en `capturas/`. No se incluyen imágenes simuladas como evidencia.

![Login](capturas/01-login.png)
![Registro](capturas/02-registro.png)
![Principal](capturas/03-principal.png)
![Formulario](capturas/04-formulario.png)
![Sin conexión](capturas/05-sin-conexion.png)
![Sincronizado](capturas/06-sincronizado.png)
![Supabase](capturas/07-supabase.png)

## Estado y limitaciones

Código preparado; requiere configurar Supabase y comprobarlo en un dispositivo real. La sincronización manual no contempla borrados en la nube ni resolución avanzada de conflictos (fuera del alcance básico del parcial). No se ha publicado automáticamente en GitHub.

## GitHub

Crea un repositorio público `parcial-mi-tienda-conrado` y realiza al menos cuatro commits **reales** durante tu trabajo; no fabriques capturas ni historial de commits. Incluye `AI-LOG.md` y explica los cambios que hagas.
