export default function intervalSortTableData(
  tableData,
  startButton,
  stopButton,
) {
  const cloneTableData = tableData.querySelector('.data-table');
  const needTableData = tableData.querySelector('.data-table');
  const headerCells = [...needTableData.querySelectorAll('.heading-cell')];
  const dataRows = [...needTableData.querySelectorAll('.data-row')];

  const buttonStart = startButton;
  const buttonStop = stopButton;
  let runInterval = 'run';

  let counter = 0;
  let header = headerCells[counter].textContent;
  const arrowUp = '\u{2191}';
  const arrowDown = '\u{2193}';
  let tableOrder = 'normal';

  const changeHeadercell = () => {
    headerCells[counter - 1].textContent = header;
    headerCells[counter - 1].style.backgroundColor = 'lightgreen';
    headerCells[counter - 1].style.color = 'black';
    const headerCell = headerCells[counter];
    header = headerCell.textContent;
    headerCell.textContent = `${header} ${arrowDown}`;
    headerCell.style.backgroundColor = 'green';
    headerCell.style.color = 'white';

    tableOrder = headerCell.textContent;
  };

  const changedataRows = () => {
    dataRows.forEach((row) => {
      const needRow = row;
      const needCells = [...needRow.querySelectorAll('.data-cell')];
      const needCell = needCells[counter];
      const lastCell = needCells[counter - 1];
      needCell.style.backgroundColor = 'blue';
      lastCell.style.backgroundColor = 'lightblue';
      needCell.style.color = 'white';
      lastCell.style.color = 'black';
      needTableData.append(needRow);
    });
  };

  const returnOrder = () => {
    headerCells[counter - 1].textContent = header;
    headerCells[counter - 1].style.backgroundColor = 'lightgreen';
    headerCells[counter - 1].style.color = 'black';

    dataRows.forEach((row) => {
      const needRow = row;
      const needCells = [...needRow.querySelectorAll('.data-cell')];
      const lastCell = needCells[counter - 1];
      lastCell.style.backgroundColor = 'lightblue';
      lastCell.style.color = 'black';
      needTableData.append(needRow);
    });

    needTableData.replaceWith(cloneTableData);
    counter = 0;
    header = headerCells[counter].textContent;
    tableOrder = 'normal';
  };

  const reversOrder = () => {
    const headerCell = headerCells[counter];
    headerCell.textContent = `${header} ${arrowUp}`;
    dataRows.reverse();
    dataRows.forEach((row) => {
      needTableData.append(row);
    });
    counter++;
    tableOrder = headerCell.textContent;
  };

  const changeOrder = () => {
    if (counter >= dataRows.length - 1) {
      returnOrder();
      return;
    }

    if (tableOrder === `${header} ${arrowDown}`) {
      reversOrder();
      return;
    }

    if (tableOrder === 'normal') {
      const headerCell = headerCells[counter];
      header = headerCell.textContent;
      headerCell.textContent = `${header} ${arrowDown}`;
      headerCell.style.backgroundColor = 'green';
      headerCell.style.color = 'white';

      dataRows.sort(
        (a, b) => parseFloat(a.dataset[header]) - parseFloat(b.dataset[header]),
      );

      dataRows.forEach((row) => {
        const needRow = row;
        const needCells = [...needRow.querySelectorAll('.data-cell')];
        const needCell = needCells[counter];
        needCell.style.backgroundColor = 'blue';
        needCell.style.color = 'white';
        needTableData.append(needRow);
      });
      tableOrder = headerCell.textContent;
      return;
    }

    if (tableOrder === `${header} ${arrowUp}`) {
      changeHeadercell();

      dataRows.sort((a, b) => {
        if (
          a.dataset[header].replace(/ё/gi, 'е').toLowerCase()
          < b.dataset[header].replace(/ё/gi, 'е').toLowerCase()
        ) {
          return -1;
        }
        if (
          a.dataset[header].replace(/ё/gi, 'е').toLowerCase()
          > b.dataset[header].replace(/ё/gi, 'е').toLowerCase()
        ) {
          return 1;
        }
        return 0;
      });

      changedataRows();
      return;
    }

    if (tableOrder === `${header} ${arrowUp}`) {
      changeHeadercell();

      dataRows.sort(
        (a, b) => parseFloat(a.dataset[header].replace(/^.|.$/g, ''))
          - parseFloat(b.dataset[header].replace(/^.|.$/g, '')),
      );
      changedataRows();
      return;
    }

    if (tableOrder === `${header} ${arrowUp}`) {
      changeHeadercell();
      dataRows.sort(
        (a, b) => parseFloat(a.dataset[header].replace(/[^\d.]/g, ''))
          - parseFloat(b.dataset[header].replace(/[^\d.]/g, '')),
      );
      changedataRows();
    }
  };

  buttonStart.onclick = () => {
    if (runInterval === 'run') {
      const intervalChanging = setInterval(() => {
        changeOrder();
      }, 2000);
      buttonStop.onclick = () => {
        clearInterval(intervalChanging);
        runInterval = 'run';
      };
      runInterval = 'stop';
    }
  };
}
