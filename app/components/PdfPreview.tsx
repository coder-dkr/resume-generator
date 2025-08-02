import { useEffect, useRef } from 'react';

interface PdfPreviewProps {
  data: {
    name: string;
    email: string;
    phone: string;
    position: string;
    description: string;
  };
}

export default function PdfPreview({ data }: PdfPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = generatePdfContent(data);
    }
  }, [data]);

  const generatePdfContent = (data: PdfPreviewProps['data']) => {
    return `
      <div style="padding: 2rem; max-width: 42rem; margin: 0 auto; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.6;">
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
                <p style="margin: 0; font-weight: 600; color: #2c3e50; white-space: wrap;">${data.email || 'your@email.com'}</p>
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

  return (
    <div
      ref={previewRef}
      style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: '#fff' }}
    />
  );
};
