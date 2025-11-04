document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentCode = document.getElementById('student-code').value;
    const message = document.getElementById('message');

    // Cargar los datos de los estudiantes
    fetch('students.json')
        .then(response => response.json())
        .then(students => {
            // Buscar el estudiante por código
            const student = students.find(s => s.codigo === studentCode);

            if (student) {
                // Si el estudiante existe, generar el certificado
                message.textContent = `Generando certificado para: ${student.nombre}`;
                generateCertificate(student);
            } else {
                // Si no se encuentra el código, mostrar mensaje de error
                message.textContent = 'Código no encontrado. Intenta de nuevo.';
                message.style.color = 'red';
            }
        });
});

function generateCertificate(student) {
    // Usar jsPDF para generar el certificado
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar texto al PDF
    doc.setFontSize(20);
    doc.text('Certificado de Participación', 60, 40);
    doc.setFontSize(16);
    doc.text(`Este es un certificado que acredita la participación de:`, 20, 60);
    doc.text(`${student.nombre}`, 20, 70);
    doc.text('En el evento XYZ', 20, 80);

    // Descargar el PDF
    doc.save(`${student.nombre}_certificado.pdf`);
}
