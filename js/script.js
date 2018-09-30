window.onload = (e) => {

    //controls
    let minusTop = document.querySelector('.up').firstElementChild;
    let minusLeft = document.querySelector('.left').firstElementChild;
    let plusRight = document.querySelector('.right').firstElementChild;
    let plusBottom = document.querySelector('.bottom').firstElementChild;

    //environment
    let center = document.querySelector('.center');
    let offsets;
    let invisibleTop = false;
    let invisibleLeft = false;

    // squeres array
    let rows = document.getElementsByClassName('row');

    //addRows
    plusBottom.addEventListener('click', (e) => {
        let row = rows[0].cloneNode(true);
        center.appendChild(row);
        if (rows.length > 1) {
            minusLeft.style.visibility = 'visible';
            invisibleLeft = false;
        }
    });
    //addColumn
    plusRight.addEventListener('click', (e) => {
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let singleSquere = document.querySelector('.row .squere').cloneNode(true);
            row.appendChild(singleSquere);
            if (rows[0].children.length > 1) {
                minusTop.style.visibility = 'visible';
                invisibleTop = false;
            }
        }

    });

    let nextRow = center.firstElementChild;
    //removeRow
    minusLeft.addEventListener('click', (e) => {
        //Проверка, чтобы не удалялась последняя строка
        if (rows.length === 1) {
            return false;
        }

        //Удаление
        if (currentRow != null) {
            nextRow = currentRow.nextElementSibling;
        }

        if (currentRow != null) {
            center.removeChild(currentRow);
        }

        // Удаление последней строки и смещение контрола
        if (nextRow == null) {

            offsets.offsetLeft = e.target.getBoundingClientRect().top - center.getBoundingClientRect().top;
            minusLeft.style.top = offsets.offsetLeft - 52 + 'px';

            nextRow = rows[rows.length - 1];
        }

        currentRow = nextRow;



        currentInnerDiv = center.children[0].children[0];

        //Скрытие контрола при последней строке
        if (rows.length === 1) {
            minusLeft.style.visibility = 'hidden';
            invisibleLeft = true;
        }

    });


    let currentInnerDiv = center.children[0].children[0];
    let itemPlace = 0;
    //removeColumn
    minusTop.addEventListener('click', (e) => {



        //Нахождение текущего элемента в коллекции
        if (currentInnerDiv != null) {
           outer: for (let i = 0; i < rows.length; i++) {
               let row = rows[i];

               itemPlace = 0;
                for (let x = 0; x < row.children.length; x++) {
                    let item = row.children[x];
                    if (item !== currentInnerDiv) {
                        itemPlace++;
                    } else  {
                        break outer;
                    }
                }

            }
        }

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];

            if (row.children.length <= 1) {
                minusTop.style.visibility = 'hidden';
                return false;
            }

            let item = row.children[itemPlace];

            if (item == null) item = row.children[row.children.length - 1];


            if (item.nextElementSibling == null) {
                offsets.offsetTop = e.target.getBoundingClientRect().left - center.getBoundingClientRect().left;
                minusTop.style.left = offsets.offsetTop - 52 + 'px';
            }

            item.remove();

            if (row.children.length <= 1) {
                minusTop.style.visibility = 'hidden';
                invisibleTop = true;
            }

        }

        currentInnerDiv = null;
    });

    let currentRow = center.firstElementChild;

    //visible or hidden minusControl buttons
    center.addEventListener('mouseover', (e) => {

        checkVisible();


        offsets =
            {
                offsetLeft: e.target.getBoundingClientRect().top - center.getBoundingClientRect().top,
                offsetTop: e.target.getBoundingClientRect().left - center.getBoundingClientRect().left
            };


        //Фильтрация чисто элементов центральной таблицы (контролы удалены)
        let allSquares = document.getElementsByClassName('squere');
        let inCenterSquares = Array.prototype.filter.call(allSquares, function(allSquares){
            return allSquares.className === 'squere';
        });

        // Проверяю, что фокус именно на эллементе таблицы
        for (let i = 0; i < inCenterSquares.length; i++) {

            if  (inCenterSquares[i] === e.target) {

                currentRow = e.target.parentNode;
                currentInnerDiv = e.target;

                minusTop.style.left = offsets.offsetTop + 'px';
                minusLeft.style.top = offsets.offsetLeft + 'px';

            }

        }

    });
    center.addEventListener('mouseout', (e) => {

        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';

    });

    center.addEventListener('mouseout', (e) => {
        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';
    });

    minusLeft.addEventListener('mouseover', (e) => {
        checkVisible();
    });
    minusLeft.addEventListener('mouseout', (e) => {
        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';
    });

    minusTop.addEventListener('mouseover', (e) => {
        checkVisible();
    });
    minusTop.addEventListener('mouseout', (e) => {
        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';
    });

    function checkVisible() {
        if (invisibleTop) {
            minusTop.style.visibility = 'hidden';
        } else {
            minusTop.style.visibility = 'visible';
        }

        if (invisibleLeft) {
            minusLeft.style.visibility = 'hidden';
        } else {
            minusLeft.style.visibility = 'visible';
        }
    }

};