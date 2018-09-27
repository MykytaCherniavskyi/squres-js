window.onload = (e) => {

    //controls
    let minusTop = document.querySelector('.up').firstElementChild;
    let minusLeft = document.querySelector('.left').firstElementChild;
    let plusRight = document.querySelector('.right').firstElementChild;
    let plusBottom = document.querySelector('.bottom').firstElementChild;

    //environment
    let center = document.querySelector('.center');
    let offsetLeftMinus = 0;
    let offsets;

    // squeres array
    let rows = document.getElementsByClassName('row');

//Временно не активно
/*    document.body.onmouseover = function (e) {
        console.log(e.target);
        let target = e.target || e.srcElement;
        let tdParent = target.parentNode;
        let attrInnerSQ = document.getElementsByClassName('row')[0].children[0].getAttribute('data-action');

        //фильтруем объекты TD
        if (target.hasAttribute('spy')) {
            //console.log("squere");
            target.onclick = function () {
                //console.log("click squere");
                tdParent.removeChild(target); //удаляем текущий объект
            }

        }
    };*/


    //фильтрация чисто элементов центральной таблицы (контролы удалены)
    var testElements = document.getElementsByClassName('squere');
    var testDivs = Array.prototype.filter.call(testElements, function(testElement){
        return testElement.className === 'squere';
    });


    //for future fichers
    let centerSize =
        {
          width: center.getBoundingClientRect().width,
          height: center.getBoundingClientRect().height
        };

    let up = minusTop.parentElement;
    up.style.width = centerSize.width + 'px';

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
            let singleSquere = document.querySelector('.row .squere').cloneNode(true);
            row.appendChild(singleSquere);
            if  (typeof rows[0].childNodes[3] === 'undefined') {
                minusTop.style.visibility = 'hidden';
            } else {
                minusTop.style.visibility = 'visible';
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

        //Динамическое удаление
        if (currentRow != null) {
            nextRow = currentRow.nextElementSibling;
        }

        if (currentRow != null) {
            center.removeChild(currentRow);
        }

        currentRow = nextRow;

        //Скрытие контрола при последней строке
        if (rows.length === 1) {
            minusLeft.style.visibility = 'hidden';
        }

    });

    let currentInnerDiv = center.children[0].children[0];
    let itemPlace = 0;
    let naiberItemPlace = 1;
    //removeColumn разобрпать
    minusTop.addEventListener('click', (e) => {


        //Нахождение текущего элемента в массиве
        itemPlace = 0;
        naiberItemPlace = 1;
        //TODO доделать отслеживания по всей таблице, а не только по первому ряду
        if (currentInnerDiv != null) {
                for (let x = 0; x < rows[0].children.length; x++) {
                    let item = rows[0].children[x];
                    if (item !== currentInnerDiv) {
                        itemPlace++;
                    } else  {
                        naiberItemPlace = itemPlace + 1;
                    }
                }

        }



        //Удаление конкретного div-а
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];

            if (row.children.length <= 1) {
                return false;
            }

            let item = row.children[itemPlace];
            console.log(item);
            console.log(row.children[naiberItemPlace]);
            console.log("Итерация");
            item.remove();
            if (row.children.length <= 1) {
                minusTop.style.visibility = 'hidden';
            }
        }

        itemPlace = naiberItemPlace;
        naiberItemPlace = 0;

    });

    let currentRow = center.firstElementChild;

    //visible or hidden minusControl buttons
    center.addEventListener('mouseover', (e) => {
        minusTop.style.visibility = 'visible';
        minusLeft.style.visibility = 'visible';

        let targetAttr = e.target.getAttribute('data-action');

        // Проверяю, что фокус именно на эллементе таблицы
        if (targetAttr) {
            currentRow = e.target.parentNode;
            currentInnerDiv = e.target;
        }

        offsets =
            {
                offsetLeft: e.target.getBoundingClientRect().top - center.getBoundingClientRect().top,
                offsetTop: e.target.getBoundingClientRect().left - center.getBoundingClientRect().left
            };

        minusLeft.style.top = offsets.offsetLeft + 'px';

        minusTop.style.left = offsets.offsetTop + 'px';

    });

    // document.body.onmouseover = function (e) {
    //     console.log(e.target);
    //     let target = e.target || e.srcElement;
    //     let tdParent = target.parentNode;
    //     let attrInnerSQ = document.getElementsByClassName('row')[0].children[0].getAttribute('data-action');
    //
    //     //фильтруем объекты TD
    //     if (target.hasAttribute('spy')) {
    //         //console.log("squere");
    //         target.onclick = function () {
    //             //console.log("click squere");
    //             tdParent.removeChild(target); //удаляем текущий объект
    //         }
    //
    //     }
    // };

    // center.addEventListener('mouseout', (e) => {
    //     minusTop.style.visibility = 'hidden';
    //     minusLeft.style.visibility = 'hidden';
    //     //console.log(currentRow);
    // });
    //
    // minusLeft.addEventListener('mouseover', (e) => {
    //     minusTop.style.visibility = 'visible';
    //     minusLeft.style.visibility = 'visible';
    // });
    // minusLeft.addEventListener('mouseout', (e) => {
    //     minusTop.style.visibility = 'hidden';
    //     minusLeft.style.visibility = 'hidden';
    // });
    //
    // minusTop.addEventListener('mouseover', (e) => {
    //     minusTop.style.visibility = 'visible';
    //     minusLeft.style.visibility = 'visible';
    // });
    // minusTop.addEventListener('mouseout', (e) => {
    //     minusTop.style.visibility = 'hidden';
    //     minusLeft.style.visibility = 'hidden';
    // });

};