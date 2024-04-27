window.onload = function() {
    // Function to set value in a specific cell
    function setCellValue(cellId, value) {
        var cell = document.getElementById(cellId);
        if (cell) {
            cell.innerText = value;
        }
    }

    // Function to add event listener for "Print" button
    function addPrintButtonListener() {
        var printButton = document.getElementById('print-button');
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Function to create and add a time picker to a specific cell
    function addTimePicker(cellId) {
        var cell = document.getElementById(cellId);
        if (cell) {
            var timePicker = document.createElement('input');
            timePicker.type = 'time';
            cell.appendChild(timePicker);
        }
    }

    // Function to prompt user for input
    function promptInput(cellId) {
        var value = prompt("Enter value for " + cellId.split('-')[0].toUpperCase() + " " + cellId.split('-')[1] + ":");
        if (value !== null) {
            setCellValue(cellId, value);
        }
    }

    // Function to add value picker button to each cell
    function addValuePicker(cellId) {
        var cell = document.getElementById(cellId);
        if (cell) {
            var addButton = document.createElement('button');
            addButton.textContent = 'ADD';
            addButton.classList.add('add-button');
            addButton.setAttribute('data-cell-id', cellId);
            addButton.addEventListener('click', function() {
                promptInput(cellId);
            });
            cell.appendChild(addButton);
        }
    }

    // Add initial time picker and value picker buttons
    function initializeTable() {
        addTimePicker('time-monday-start');
        addTimePicker('time-monday-end');
        var valueCells = document.querySelectorAll('.value-picker');
        valueCells.forEach(function(cell) {
            var cellId = cell.id;
            addValuePicker(cellId);
        });
    }

    // Add initial event listeners
    addPrintButtonListener();
    initializeTable();

    // Function to add time picker and value picker for new rows
    function addNewRow(rowId) {
        addTimePicker('time-' + rowId + '-start');
        addTimePicker('time-' + rowId + '-end');
        var valueCells = document.querySelectorAll('.value-picker');
        valueCells.forEach(function(cell) {
            if (!cell.id.includes('time')) {
                var cellId = cell.id + '-' + rowId;
                addValuePicker(cellId);
            }
        });
    }

    // Function to add a new row
    function addRow() {
        var rowCount = document.querySelectorAll('#timetable tr').length;
        var newRowId = 'row-' + rowCount;
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td class="time-picker" id="time-' + newRowId + '-start"></td>' +
            '<td class="time-picker" id="time-' + newRowId + '-end"></td>' +
            '<td class="value-picker" id="monday-' + newRowId + '"></td>' +
            '<td class="value-picker" id="tuesday-' + newRowId + '"></td>' +
            '<td class="value-picker" id="wednesday-' + newRowId + '"></td>' +
            '<td class="value-picker" id="thursday-' + newRowId + '"></td>' +
            '<td class="value-picker" id="friday-' + newRowId + '"></td>' +
            '<td class="value-picker" id="saturday-' + newRowId + '"></td>';
        document.getElementById('timetable').appendChild(newRow);
        addNewRow(newRowId);
    }

    // Add event listener for the "Add Row" button
    var addRowButton = document.getElementById('add-row-button');
    addRowButton.addEventListener('click', addRow);
};
