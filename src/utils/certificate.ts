import { jsPDF } from 'jspdf';

export const generateCertificate = (userName: string, score: number, date: string) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Background
  doc.setFillColor(14, 14, 14); // #0E0E0E
  doc.rect(0, 0, 297, 210, 'F');

  // Border
  doc.setDrawColor(255, 208, 0); // #FFD000
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);
  
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 273, 186);

  // Content
  doc.setTextColor(255, 208, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.text('CERTIFICADO DE LOGRO', 148.5, 60, { align: 'center' });

  doc.setTextColor(250, 247, 238); // #FAF7EE
  doc.setFontSize(20);
  doc.setFont('helvetica', 'normal');
  doc.text('Este documento certifica que', 148.5, 85, { align: 'center' });

  doc.setFontSize(35);
  doc.setFont('helvetica', 'bold');
  doc.text(userName.toUpperCase(), 148.5, 105, { align: 'center' });

  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.text('Ha completado con éxito el', 148.5, 125, { align: 'center' });
  
  doc.setTextColor(255, 208, 0);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('DESAFÍO DE FLUIDEZ EN IA', 148.5, 138, { align: 'center' });

  doc.setTextColor(106, 96, 80); // #6A6050
  doc.setFontSize(14);
  doc.text(`PUNTUACIÓN FINAL: ${score} PTS`, 148.5, 160, { align: 'center' });
  doc.text(`FECHA: ${date}`, 148.5, 170, { align: 'center' });

  // Branding
  doc.setTextColor(255, 208, 0);
  doc.setFontSize(12);
  doc.text('ANTIGRAVITY / @RaulGonzalez-1', 148.5, 190, { align: 'center' });

  // Save/Download
  doc.save(`Certificado_AI_Fluency_${userName.replace(/\s+/g, '_')}.pdf`);
};
