const puppeteer = require('puppeteer');

module.exports = async function (context, req) {
    try {
        let options = {
            printBackground: true,
            format: 'a4',
            displayHeaderFooter: false,
            preferCSSPageSize: true, buffer: true,
            margin: {
                top: '12mm',
                right: '12mm',
                bottom: '12mm',
                left: '12mm'
            }
        };
        
        const browser = await puppeteer.launch({ headless: true, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ] });

        const page = await browser.newPage();        
        await page.goto('https://image.google.com');
        
        // Generate PDF
        const pdfBuffer = await page.pdf(options); // Generate PDF as buffer

        // Close the browser
        await browser.close();
        context.res = {
            headers: {
                'Content-Type': 'application/pdf'
            },
            body: pdfBuffer,
            isRaw: true
        };

    } catch (error) {
        context.log.error('[ Generate PDF ] ', error);
        context.res = {
            status: 500,
            body: '[ Generate PDF ] ' + error.toString()
        };
    }
};
