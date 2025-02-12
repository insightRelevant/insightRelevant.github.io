const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Headless mode
  });

  
  const page = await browser.newPage();
  
  // Ajusta esta ruta a la ubicación correcta del archivo botAlert.html
  const filePath = `file://${__dirname}/botAlert.html`;
  
  try {
    console.log(`Navegando a ${filePath}`);
    await page.goto(filePath, { waitUntil: 'networkidle2' });
    console.log('Navegación exitosa, generando PDF...');
    
    // Esperar a que todos los elementos se carguen
    await page.waitForSelector('video');
    await page.evaluate(() => {
      const video = document.querySelector('video');
      video.pause();
    });

    await page.pdf({
      path: 'open-bar-experience.pdf',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size:10px; text-align:center; width:100%;"><span class="title"></span></div>',
      footerTemplate: '<div style="font-size:10px; text-align:center; width:100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: {
        top: '60px',
        bottom: '60px',
        left: '40px',
        right: '40px'
      }
    });

    console.log('PDF generado exitosamente.');
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  } finally {
    await browser.close();
  }
})();