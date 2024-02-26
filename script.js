 const multipleTablesBtn = document.getElementById('multipleTablesBtn');
const tableOptions = document.getElementById('tableOptions');
const mathTable = document.getElementById('mathTable');
let selectedTables = new Set(); // To store selected table numbers

  selectOption('multiple');
  generateOptions(20, true); // Generate options

function selectOption(option) {
  if (option === 'single') {
    multipleTablesBtn.style.backgroundColor = 'gray';
  } else {
    multipleTablesBtn.style.backgroundColor = 'green';
  }
}

function generateOptions(count, allowMultiple) {
    tableOptions.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const optionBtn = document.createElement('button');
      optionBtn.textContent = i;
      optionBtn.classList.add('option-btn');
      if (!allowMultiple) {
        optionBtn.addEventListener('click', () => {
          showSingleMathTable(i);
        });
      } else {
        optionBtn.addEventListener('click', () => {
          toggleTableSelection(optionBtn, i);
          generateMathTables();
        });
      }
      tableOptions.appendChild(optionBtn);
    }
  }

  function toggleTableSelection(button, tableNumber) {
    if (selectedTables.has(tableNumber)) {
      selectedTables.delete(tableNumber); // Deselect if already selected
      button.style.backgroundColor = ''; // Remove custom background color
    } else {
      selectedTables.add(tableNumber); // Select if not already selected
      button.style.backgroundColor = 'green'; // Apply custom background color
    }
  }
  function generateMathTables() {
    
    mathTable.innerHTML = ''; // Clear the existing math tables
  
    if (selectedTables.size === 0) {
      return; // If no table is selected, do nothing
    }
    if(selectedTables.size > 6){
      alert("Please Select Maximum of 6 Tables for Better View. You can de-select existing tables by Clicking again!!!");
      let arrayFromSet = Array.from(selectedTables);
      let removedTabled=arrayFromSet.pop();
      selectedTables=new Set(arrayFromSet);
      
    }
    const table = document.createElement('table');
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    row.appendChild(cell);
    
    selectedTables.forEach(num => {
      const table1 = generateMathTable(num);
      const cell1 = document.createElement('td');
      cell1.appendChild(table1);
      row.appendChild(cell1);
      mathTable.appendChild(table); // Append the generated math table to mathTable element
    });
    table.appendChild(row);
    mathTable.appendChild(table);
  }

  function generateMathTable(num) {
    const table = document.createElement('table');
    table.classList.add('math-table');
  
    for (let i = 1; i <= 10; i++) {
      const row = document.createElement('tr');
      const equation = `${num} x ${i} =`;
      const cell = document.createElement('td');
      cell.textContent = equation;
      row.appendChild(cell);
  
      const inputCell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.dataset.solution = num * i;
      input.addEventListener('blur', checkAnswer);
      inputCell.appendChild(input);
      row.appendChild(inputCell);
  
      table.appendChild(row);
    }
  
    return table;
  }

  function showSingleMathTable(num) {
    mathTable.innerHTML = ''; // Clear the existing math tables
    const table = generateMathTable(num);
    mathTable.appendChild(table); // Append the generated math table to mathTable element
  }

  function checkAnswer(event) {
    const input = event.target;
    const solution = input.dataset.solution;
    const userAnswer = input.value.trim(); // Trim the input value to remove whitespace
  
    if (userAnswer === '') {
      // Empty input, no formatting
      input.parentNode.classList.remove('wrong');
      input.parentNode.classList.remove('correct');
      input.nextSibling.innerHTML = '';
    } else if (userAnswer === solution) {
      // Correct answer, format as green
      input.parentNode.classList.remove('wrong');
      input.parentNode.classList.add('correct');
      input.nextSibling.innerHTML = '';
    } else {
      // Incorrect answer, format as red
      input.parentNode.classList.add('wrong');
      input.parentNode.classList.remove('correct');
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-times');
      input.nextSibling.innerHTML = '';
      input.nextSibling.appendChild(icon);
    }
  }
