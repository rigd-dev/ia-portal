<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# IA Portal Architecture & Memory
**Dominio de Producción:** `https://ia.raulgzz.com`
**Repositorio GitHub:** `rigd-dev/ia-portal`
**Despliegue:** Vercel (Auto-deploy on push to `main`)

## Objetivo del Proyecto
Este portal es el hub centralizado para todos los recursos (freebies, herramientas interactivas, quizzes y landing pages) relacionados con el canal de YouTube de Inteligencia Artificial de Raúl González.

## Estrategia de Arquitectura (Escalabilidad Vertical)
- **Monorepo por Línea de Negocio:** Este repositorio es exclusivo para el canal de IA.
- **Enrutamiento por Recurso:** Cada recurso nuevo para un video debe vivir en su propia ruta dentro de `/app/recursos/[nombre-del-recurso]`.
- **Diseño "Editorial Tech":** Mantenemos una paleta de colores limpia (Cream `#FAF7EE`, Charcoal `#0E0E0E`, Accent `#FFD000`).

## Recursos Actuales
- `/recursos/fluidez-en-ia`: Cuestionario interactivo para perfilar el nivel de fluidez en IA del usuario.
- `/recursos/fluidez-en-ia/guia`: Versión web y generador PDF de la Guía de Fluidez (Framework 4D).

## Integraciones Clave
- **Resend:** Usado para el envío transaccional de correos (`hola@raulgzz.com`) y gestión de audiencia.
  - Ruta de API: `/app/api/subscribe/route.ts`
  - **Audiencia (CRM):** Se guardan todos los contactos automáticamente en la audiencia "General" (`RESEND_AUDIENCE_ID`).
  - **Lead Tracking:** El portal DEBE capturar parámetros UTM (`utm_source`, `utm_campaign`) y enviarlos como `properties` a Resend para segmentación.
  - *Nota: Usa `export const dynamic = 'force-dynamic';` para evitar errores de compilación estática en Vercel.*

## Vínculo con Obsidian
Para entender el "por qué" y el guion detrás de cada recurso, consulta la Bóveda de Obsidian de Raúl:
- **Área:** `02_Areas/Websites Hub.md`
- **Proyecto:** `01_Projects/IA Portal.md`
- Los scripts específicos de video residen en el Hub de la Serie o en las notas referenciadas.
