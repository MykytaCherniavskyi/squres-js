window.onload = (e) => {

    //controls
    let minusTop = document.querySelector('.up').firstElementChild;
    let minusLeft = document.querySelector('.left').firstElementChild;
    let plusRight = document.querySelector('.right').firstElementChild;
    let plusBottom = document.querySelector('.bottom').firstElementChild;

    //environment
    let center = document.querySelector('.center');

    // squeres array
    let rows = document.getElementsByClassName('row');

    console.dir(minusLeft.parentElement);
    console.log(minusLeft.parentElement.offsetHeight + 100);

    //Вселенский смысл в том, чтобы взять высоту на которой расположен дочерний эллемент
    // в родителе и задать такой же offset для контрола для его перемещения.
    //

    //addRows
    plusBottom.addEventListener('click', (e) => {
        let row = rows[0].cloneNode(true);
        center.appendChild(row);
        if (rows.length === 2) {
            minusLeft.style.visibility = 'visible';
        }
    });
    //addColumn
    plusRight.addEventListener('click', (e) => {
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let singleSquere = document.querySelector('.squere-center').cloneNode(true);
            let spacing = center.childNodes[0].cloneNode(true);
            row.appendChild(singleSquere);
            row.appendChild(spacing);
            console.log(rows[0].childNodes[3]);
            if  (typeof rows[0].childNodes[3] === 'undefined') {
                minusTop.style.visibility = 'hidden';
            } else {
                minusTop.style.visibility = 'visible';
            }
        }


    });
    //removeRow
    minusLeft.addEventListener('click', (e) => {

        if (rows.length === 1) {
            return false;
        }

        center.removeChild(rows[rows.length - 1]);

        if (rows.length === 1) {
            minusLeft.style.visibility = 'hidden';
        }

    });
    //removeColumn
    minusTop.addEventListener('click', (e) => {
        outer :for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.childNodes.length <= 3) {
                return false;
            }
            for (let x = 0; x < row.childNodes.length; x++) {
                let item = row.childNodes[x];
                item.parentNode.removeChild(row.childNodes[row.childNodes.length - 1]);
                item.parentNode.removeChild(row.childNodes[row.childNodes.length - 1]);
                if (row.childNodes.length <= 3) {
                    minusTop.style.visibility = 'hidden';
                }
                continue outer;
            }
        }
        console.log(rows[0].childNodes[3]);
    });

};


//Кастыльный блок
// для коректной работы нужно указывать в continue метку outer на внешнем цикле
/*for (let x = 0; x < innerRow.childNodes.length; x++) {
    let item = innerRow.childNodes[x];
    if (item.nodeName === "DIV") {
        let singleSquere = document.querySelector('.squere-center').cloneNode(true);
        item.parentNode.appendChild(singleSquere);
        continue outer;
    }
}*/
