//  shared/js/pdf_export_task.js
export async function taskHtmlToPdf(htmlString, filenameBase){
    if(!window.html2pdf){
        await import('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
    }
    const holder = document.createElement('div');
    holder.innerHTML = htmlString;
    holder.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(holder);

    await html2pdf().set({
        margin:10,
        filename:`${filenameBase}_${new Date().toISOString().slice(0,10)}.pdf`,
        jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' },
        html2canvas:{ scale:2, useCORS:true }
    }).from(holder).save();

    document.body.removeChild(holder);
}