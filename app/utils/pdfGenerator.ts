import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  description: string;
  fileName: string;
}

const generatePdfContent = (data: FormData) => {
  return `
    <div style="padding: 4rem; max-width: 42rem; margin: 0 auto; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.6;">
      <div style="background-color: #fff; border-radius: 0.5rem; padding: 2rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <header style="text-align: center; margin-bottom: 1.5rem; border-bottom: 2px solid #3498db; padding-bottom: 1rem;">
          <h1 style="font-size: 2rem; font-weight: bold; color: #2c3e50; margin: 0;">${data.name || 'Your Name'}</h1>
          <p style="margin: 0.5rem 0 0; color: #7f8c8d;">${data.position || 'Your Position'}</p>
        </header>

        <section style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #3498db; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Contact Information</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <p style="margin: 0; color: #7f8c8d; font-size: 0.875rem;">Email</p>
              <p style="margin: 0; font-weight: 600; color: #2c3e50;">${data.email || 'your@email.com'}</p>
            </div>
            <div>
              <p style="margin: 0; color: #7f8c8d; font-size: 0.875rem;">Phone</p>
              <p style="margin: 0; font-weight: 600; color: #2c3e50;">${data.phone || '(123) 456-7890'}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #3498db; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Professional Summary</h2>
          <p style="margin: 0; color: #34495e; white-space: pre-line;">${data.description || 'A brief summary of your professional background, skills, and what you bring to the table.'}</p>
        </section>
      </div>
    </div>
  `;
};

export const generatePdf = async (data: FormData, download: boolean = false) => {
  const element = document.createElement('div');
  element.innerHTML = generatePdfContent(data);
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);

  const canvas = await html2canvas(element as HTMLElement, {
    useCORS: true,
    allowTaint: true,
  });

  document.body.removeChild(element);
  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = canvas.width * 0.75 / 72;
  const pdfHeight = canvas.height * 0.75 / 72;

  const pdf = new jsPDF({
    orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
    unit: 'in',
    format: [pdfWidth, pdfHeight],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  if (download) {
    pdf.save(`${data.fileName || 'resume'}.pdf`);
  }

  return pdf;
};
