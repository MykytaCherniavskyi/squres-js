window.onload = (e) => {

    //controls
    let minusTop = document.querySelector('.up').firstElementChild;
    let minusLeft = document.querySelector('.left').firstElementChild;
    let plusRight = document.querySelector('.right').firstElementChild;
    let plusBottom = document.querySelector('.bottom').firstElementChild;

    //environment
    let center = document.querySelector('.center');
    let offsetLeftMinus = 0;

    // squeres array
    let rows = document.getElementsByClassName('row');

    center.removeChild(center.childNodes[center.childNodes.length - 1]);
    console.log(center.childNodes);

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

    let offsetTopMinus = 0;

    //visible or hidden minusControl buttons
    center.addEventListener('mouseover', (e) => {
        minusTop.style.visibility = 'visible';
        minusLeft.style.visibility = 'visible';
        if (e.target.nodeType === 1) {
            offsetLeftMinus = e.target.getBoundingClientRect().top - center.getBoundingClientRect().top;
            minusLeft.style.top = offsetLeftMinus + 'px';
        }

        if (e.target.nodeType === 1) {
            console.log(e.target);
            offsetTopMinus = e.target.getBoundingClientRect().left - center.getBoundingClientRect().left;
            minusTop.style.left = offsetTopMinus + 'px';
        }

    });
    center.addEventListener('mouseout', (e) => {
        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';
    });

    minusLeft.addEventListener('mouseover', (e) => {
        minusTop.style.visibility = 'visible';
        minusLeft.style.visibility = 'visible';
    });
    minusLeft.addEventListener('mouseout', (e) => {
        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';
    });

    minusTop.addEventListener('mouseover', (e) => {
        minusTop.style.visibility = 'visible';
        minusLeft.style.visibility = 'visible';
    });
    minusTop.addEventListener('mouseout', (e) => {
        minusTop.style.visibility = 'hidden';
        minusLeft.style.visibility = 'hidden';
    });

};