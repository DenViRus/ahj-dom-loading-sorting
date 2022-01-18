import data from './getData.js';
import DataTable from './DataTable.js';
import intervalSortTableData from './intervalSortTableData.js';

const newData = data();
const dataTable = new DataTable();
dataTable.getTableParams(newData);
dataTable.drawTable();
dataTable.addDataTable();

const tablecontainer = document.getElementById('mainContainer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

intervalSortTableData(tablecontainer, startButton, stopButton);
