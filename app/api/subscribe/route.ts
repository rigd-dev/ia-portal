import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, score } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Se ha configurado para usar tu dominio raulgzz.com
    // IMPORTANTE: Asegúrate de verificar el dominio en Resend agregando los DNS en Hostinger.
    const { data, error } = await resend.emails.send({
      from: 'Raúl González <hola@raulgzz.com>',
      to: [email],
      subject: 'Tu Guía Rápida de Fluidez en IA 🚀',
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #1C1C1C; background-color: #FAF7EE; padding: 40px; border-radius: 8px;">
          <h1 style="color: #0E0E0E; font-size: 24px; margin-bottom: 20px;">¡Hola ${name || 'futuro experto'}!</h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #6A6050;">
            Lograste <strong>${score} puntos</strong> en el desafío de Fluidez en IA. Como lo prometido es deuda, aquí tienes tu Guía Rápida de Referencia.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #6A6050;">
            Contiene el framework de las 4D, los modos de trabajo y la lista visual de qué delegar a la IA. Está optimizada para que la guardes como PDF o la imprimas directamente.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://ai-fluency-quiz-seven.vercel.app/guia" 
               style="background-color: #FFD000; color: #0E0E0E; padding: 16px 32px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 4px; display: inline-block;">
              Descargar Guía (PDF)
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6A6050; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px;">
            Sigue dominando la Inteligencia Artificial con <a href="https://www.youtube.com/@RaulGonzalez-1" style="color: #1C1C1C; text-decoration: underline;">nuestro canal de YouTube</a>.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
