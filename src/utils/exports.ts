import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

export const convertBlobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(blob);
  });
};

const exportPDF = async ({
  table,
  fileName,
  columns = [],
  options = {
    orientation: 'landscape',
    format: 'a1',
  },
}) => {
  const doc = new jsPDF(options);
  const reader = new FileReader();

  reader.onload = async () => {
    doc.setFontSize(16);
    doc.setFillColor(242, 244, 245);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
    doc.setTextColor(0);
    doc.setFontSize(20);
    doc.setFont('Arial', 'bold');
    doc.setTextColor(0, 90, 150);
    doc.text(`${fileName.toUpperCase()}`, 14, 20);
    doc.setTextColor(0);
    doc.setFontSize(10);

    const noValues = Array.from(
      { length: table?.options?.data.length },
      (_, index) => index + 1
    );

    const exportData = table?.options?.data.map((row, index) => {
      return {
        id: noValues[index],
        ...row,
      };
    });

    doc.autoTable({
      startY: 30,
      columns: columns
        .filter((column) => column?.accessorKey !== 'actions')
        .map((column) => column?.header),
      body: exportData.map((row, index) => {
        const rowData = columns.map((header) => {
          return row[header?.accessorKey || 'NO'];
        });
        return { index, ...rowData };
      }),
      theme: 'grid',
      headStyles: {
        fillColor: [0, 90, 150],
        textColor: 255,
        fontSize: 10,
        halign: 'start',
        cellPadding: 3,
      },
      styles: {
        fontSize: 10,
        textColor: 0,
        cellPadding: 3,
      },
    });

    doc.setFontSize(12);
    doc.setFont('Arial', 'bold');
    doc.text(
      `Date: ${moment().format('DD-MM-YYYY HH:mm:ss')}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`${fileName}.pdf`);
  };
};

export default exportPDF;
