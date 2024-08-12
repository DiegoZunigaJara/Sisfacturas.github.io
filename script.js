document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;
    
    document.getElementById("invoiceForm").addEventListener("submit", (event) => {
        event.preventDefault();
        
        const doc = new jsPDF();

        // Datos del cliente
        const clientName = document.getElementById("clientName").value;
        const clientAddress = document.getElementById("clientAddress").value;
        const clientEmail = document.getElementById("clientEmail").value;
        const clientPhone = document.getElementById("clientPhone").value;

        // Datos de la empresa
        const companyName = document.getElementById("companyName").value;
        const companyAddress = document.getElementById("companyAddress").value;
        const companyEmail = document.getElementById("companyEmail").value;
        const companyPhone = document.getElementById("companyPhone").value;

        // Detalles de la factura
        const date = document.getElementById("date").value;
        const paymentMethod = document.getElementById("paymentMethod").value;
        const note = document.getElementById("note").value;

        // Conceptos
        const concepts = [];
        document.querySelectorAll("#conceptsTable tbody tr").forEach((row, index) => {
            const concept = row.querySelector(`[name="concepts[${index}][concept]"]`).value;
            const quantity = row.querySelector(`[name="concepts[${index}][quantity]"]`).value;
            const price = row.querySelector(`[name="concepts[${index}][price]"]`).value;
            const total = row.querySelector(`[name="concepts[${index}][total]"]`).value;
            concepts.push({ concept, quantity, price, total });
        });

        // Encabezado de la factura
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text("NOMEMPRESA", 105, 20, null, null, "center");

        // Datos del cliente y empresa
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Datos del Cliente:\nNombre: ${clientName}\nDirección: ${clientAddress}\nEmail: ${clientEmail}\nTeléfono: ${clientPhone}`, 10, 30);
        doc.text(`Datos de la Empresa:\nNombre: ${companyName}\nDirección: ${companyAddress}\nEmail: ${companyEmail}\nTeléfono: ${companyPhone}`, 140, 30);

        // Fecha y forma de pago
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.text(`Fecha: ${date}`, 10, 70);
        doc.text(`Forma de Pago: ${paymentMethod}`, 140, 70);

        // Conceptos
        let startY = 90;
        doc.setFontSize(10);
        doc.setTextColor(40);
        doc.text("Concepto", 10, startY);
        doc.text("Cantidad", 70, startY);
        doc.text("Precio", 110, startY);
        doc.text("Total", 150, startY);

        startY += 10;

        concepts.forEach((concept, index) => {
            doc.text(concept.concept, 10, startY + (index * 10));
            doc.text(concept.quantity, 70, startY + (index * 10));
            doc.text(concept.price, 110, startY + (index * 10));
            doc.text(concept.total, 150, startY + (index * 10));
        });

        // Nota
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Nota:\n${note}`, 10, startY + (concepts.length * 10) + 10);

        doc.save("factura.pdf");
    });

    document.getElementById("addConcept").addEventListener("click", () => {
        const table = document.getElementById("conceptsTable").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const newCell1 = newRow.insertCell(0);
        const newCell2 = newRow.insertCell(1);
        const newCell3 = newRow.insertCell(2);
        const newCell4 = newRow.insertCell(3);

        const index = table.rows.length - 1;

        newCell1.innerHTML = `<input type="text" name="concepts[${index}][concept]" required>`;
        newCell2.innerHTML = `<input type="number" name="concepts[${index}][quantity]" required>`;
        newCell3.innerHTML = `<input type="number" name="concepts[${index}][price]" required>`;
        newCell4.innerHTML = `<input type="number" name="concepts[${index}][total]" required readonly>`;
    });
});
