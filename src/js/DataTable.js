export default class DataTable {
  constructor() {
    this.data = [];
    this.rows = null;
    this.columns = null;
    this.container = null;
    this.table = null;
    this.cells = [];
    this.headingRow = null;
    this.headingCells = [];
    this.dataRows = [];
    this.dataCells = [];
  }

  getTableParams(data) {
    this.data = JSON.parse(data);
    this.rows = this.data.length;
    this.columns = Object.keys(this.data[0]).length;
  }

  drawTable() {
    this.container = document.getElementById('mainContainer');
    this.table = document.createElement('table');
    this.table.className = 'table data-table';
    this.table.id = 'dataTable';
    this.container.append(this.table);
    this.table.style.height = '100%';
    this.table.style.width = '100%';
    this.table.style.borderSpacing = '5px';

    const headingRow = document.createElement('tr');
    headingRow.className = 'row heading-row';
    this.table.append(headingRow);
    for (let i = 0; i < this.columns; i++) {
      const headingCell = document.createElement('th');
      headingCell.className = 'cell heading-cell';
      headingCell.style.border = '4px solid black';
      headingCell.style.borderRadius = '20%';
      headingCell.style.backgroundColor = 'lightgreen';
      headingRow.append(headingCell);
    }

    for (let i = 0; i < this.rows; i++) {
      const dataRow = document.createElement('tr');
      dataRow.className = 'row data-row';
      this.table.append(dataRow);

      for (let j = 0; j < this.columns; j++) {
        const dataCell = document.createElement('td');
        dataCell.className = 'cell data-cell';
        dataCell.style.border = '2px solid black';
        dataCell.style.borderRadius = '20%';
        dataCell.style.textAlign = 'center';
        dataCell.style.backgroundColor = 'lightblue';
        dataRow.append(dataCell);
      }
    }
  }

  addDataTable() {
    this.headingRow = document.querySelector('.heading-row');
    this.headingCells = [...document.querySelectorAll('.heading-cell')];
    const headerItems = Object.keys(this.data[0]);
    const needElem = headerItems[headerItems.length - 2];
    headerItems[headerItems.length - 2] = headerItems[headerItems.length - 1];
    headerItems[headerItems.length - 1] = needElem;

    for (let i = 0; i < this.columns; i++) {
      this.headingCells[i].textContent = headerItems[i];
    }
    const cellClientHeight = `${
      (this.table.clientHeight / (3 * this.rows))
    }px`;
    this.headingRow.style.fontSize = cellClientHeight;

    this.dataRows = [...document.querySelectorAll('.data-row')];
    this.dataCells = [...document.querySelectorAll('.data-cell')];

    for (let i = 0; i < this.rows; i++) {
      const dataRow = this.dataRows[i];
      const rowCells = [...dataRow.querySelectorAll('.data-cell')];
      const dataItems = Object.entries(this.data[i]);
      const needarr = dataItems[dataItems.length - 2];
      dataItems[dataItems.length - 2] = dataItems[dataItems.length - 1];
      dataItems[dataItems.length - 1] = needarr;

      for (let j = 0; j < this.columns; j++) {
        const dataProp = `data-${dataItems[j][0]}`;
        let dataVal = `${dataItems[j][1]}`;
        if (dataProp === 'data-imdb') {
          dataVal = `imdb: ${parseFloat(dataItems[j][1]).toFixed(2)}`;
        } else if (dataProp === 'data-year') {
          dataVal = `(${dataItems[j][1]})`;
        }

        dataRow.setAttribute(dataProp, dataVal);
        rowCells[j].textContent = dataVal;
      }
    }

    const dataCellHeight = `${(this.table.clientHeight / (5 * this.rows))}px`;
    for (const row of this.dataRows) {
      row.style.fontSize = dataCellHeight;
      row.style.fontWeight = 'bold';
    }
  }
}
