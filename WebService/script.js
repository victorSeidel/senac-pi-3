function generatePDFReport() 
{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    function formatDate(date) 
    {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const today = new Date();
    const formattedDate = formatDate(today);

    const totalSales = allSales.reduce((total, sale) => total + sale.money, 0);
    const totalWithdrawals = allWithdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);
    const totalValue = totalSales - totalWithdrawals;

    const titleFontSize = 16;
    const subtitleFontSize = 12;
    const bodyFontSize = 10;
    const titleColor = '#2c3e50';
    const subtitleColor = '#34495e';
    const totalColor = '#27ae60';

    doc.setFontSize(titleFontSize);
    doc.setTextColor(titleColor);
    doc.setFont('helvetica', 'bold');
    doc.text('MoneyFlow - Report', 10, 20);

    doc.setFontSize(subtitleFontSize);
    doc.setTextColor(subtitleColor);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${formattedDate}`, 10, 30);

    doc.setFontSize(subtitleFontSize);
    doc.setTextColor(totalColor);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Money: R$ ${totalValue.toFixed(2)}`, 10, 40);

    function addCategoryToPDF(title, data) 
    {
        doc.addPage();
        doc.setFontSize(titleFontSize);
        doc.setTextColor(titleColor);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 10, 20);

        doc.setFontSize(bodyFontSize);
        doc.setTextColor(subtitleColor);
        doc.setFont('helvetica', 'normal');

        let y = 30;

        data.forEach((item, index) => 
        {
            const text = Object.values(item).join(' - ');
            doc.text(text, 10, y + (index * 10));
        });
    }

    addCategoryToPDF('Items', allItems);
    addCategoryToPDF('Sales', allSales);
    addCategoryToPDF('Withdrawals', allWithdrawals);

    doc.save('report.pdf');
}