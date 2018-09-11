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

    //addRows
    plusBottom.addEventListener('click', (e) => {
        let row = rows[0].cloneNode(true);
        center.appendChild(row);
    });
    //addColumn
    plusRight.addEventListener('click', (e) => {
        for (let i = 0; i < rows.length; i++) {
            let innerRow = rows[i];
            let singleSquere = document.querySelector('.squere-center').cloneNode(true);
            let spacing = center.childNodes[0].cloneNode(true);
            rows[i].appendChild(singleSquere);
            rows[i].appendChild(spacing);


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
        }
    });
    //removeRow
    minusLeft.addEventListener('click', (e) => {
       console.log("Удалить строку");
    });
    //removeColumn
    minusTop.addEventListener('click', (e) => {
        console.log("Удалить столбец");
    });

};

