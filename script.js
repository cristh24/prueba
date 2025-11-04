// URL del archivo CSV de Google Sheets
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-wOFz0aTqidjt0Z-sDMg1FlQsgRve1wTwFDD7MN_xTyzRP_XETmatUrELJ8hS6g/pub?output=csv';

// Función para cargar el CSV y buscar el estudiante
$(document).ready(function() {
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        
        // Obtener el DNI o código ingresado
        const input = $('#dni-input').val().trim();
        
        // Realizar la búsqueda en el CSV
        $.ajax({
            url: csvUrl,
            type: 'GET',
            dataType: 'text',
            success: function(data) {
                const rows = data.split('\n');
                let found = false;

                // Iterar sobre las filas del CSV
                rows.forEach(function(row) {
                    const columns = row.split(',');
                    const dni = columns[2].trim(); // Suponiendo que el DNI está en la columna 3
                    const name = columns[1].trim(); // Nombre en la columna 2
                    const pdfUrl = columns[3].trim(); // URL del PDF en la columna 4

                    if (dni === input || columns[0].trim() === input) {
                        // Mostrar los resultados en el modal
                        $('#student-name').text('Nombre: ' + name);
                        $('#download-link').attr('href', pdfUrl);
                        $('#result-modal').fadeIn();
                        found = true;
                    }
                });

                if (!found) {
                    alert('No se encontró el estudiante.');
                }
            },
            error: function() {
                alert('Hubo un error al cargar el archivo.');
            }
        });
    });

    // Cerrar el modal al hacer clic en la "X"
    $('.close').click(function() {
        $('#result-modal').fadeOut();
    });
});
