window.onload = (e) => {

    class Table {

        constructor (idElement){

            this.table = document.getElementById(idElement);

            this.minusTop = this.table.getElementsByClassName('up')[0].firstElementChild;
            this.minusLeft = this.table.getElementsByClassName('left')[0].firstElementChild;
            this.plusRight = this.table.getElementsByClassName('right')[0].firstElementChild;
            this.plusBottom = this.table.getElementsByClassName('bottom')[0].firstElementChild;

            //environment
            this.center = this.table.querySelector('.center');
            this.offsets = {
                offsetLeft: 0,
                offsetTop: 0
            };
            this.positions = {
                div: 0,
                row: 0
            };


            // squeres array
            this.rows = this.table.getElementsByClassName('row');

            this.createElement = (type, outerItem, innerItem) => {

                const div = document.createElement('div');

                switch (type) {

                    case 'div':
                        div.classList.add(...outerItem);
                        return div;
                    case 'row':
                        //cloneNode = false для обратной совместимости firefox 13 и т.д.
                        const row = div.cloneNode(false);
                        row.classList.add(...outerItem);

                        const count = this.center.firstElementChild.childElementCount;

                        for (let i = 0; i < count; i++) row.append(div.cloneNode(false));

                        for (let div of row.children) div.classList.add(...innerItem);


                        return row;

                }
            };


            //addRows
            this.plusBottom.addEventListener('click', (e) => {
                //let row = rows[0].cloneNode(true);
                let row = this.createElement('row',['row'],['squere']);
                this.center.appendChild(row);
                const count = this.rows.length;
                if (count > 1) {
                    this.minusLeft.style.visibility = 'visible';
                }
            });
            //addColumn
            this.plusRight.addEventListener('click', (e) => {
                const countRows = this.rows.length;
                for (let i = 0; i < countRows; i++) {
                    let row = this.rows[i];
                    let div = this.createElement('div',['squere']);
                    row.appendChild(div);
                    const countRowChildren = this.rows[0].children.length;
                    if (countRowChildren > 1) {
                        this.minusTop.style.visibility = 'visible';
                    }
                }

            });

            //removeRow
            this.minusLeft.addEventListener('click', (e) => {
                //Проверка, чтобы не удалялась последняя строка
                if (this.rows.length === 1) return false;

                let row = this.rows[this.positions.row];

                if (row == null) row = this.rows[this.rows.length - 1];

                if (row.nextElementSibling == null) {
                    this.offsets.offsetLeft = e.target.getBoundingClientRect().top - this.center.getBoundingClientRect().top;
                    this.minusLeft.style.top = this.offsets.offsetLeft - 55 + 'px';
                }


                row.remove();

                //Скрытие контрола при последней строке
                if (this.rows.length === 1) this.minusLeft.style.visibility = 'hidden';

            });

            //removeColumn
            this.minusTop.addEventListener('click', (e) => {

                for (let row of this.rows) {

                    if (row.children.length === 1) return false;

                    let div = row.children[this.positions.div];

                    if (div == null) div = row.children[row.children.length - 1];

                    if (div.nextElementSibling == null) {
                        this.offsets.offsetTop = e.target.getBoundingClientRect().left - this.center.getBoundingClientRect().left;
                        this.minusTop.style.left = this.offsets.offsetTop - 54.5 + 'px';
                    }

                    div.remove();

                    if (row.children.length <= 1) this.minusTop.style.visibility = 'hidden';

                }

            });

            this.table.addEventListener('mouseout', (e) => {

                const target = e.target;

                if (target === this.center
                    || target === target.parentElement
                    || target.classList.contains('squere')) {

                    this.minusLeft.style.visibility = 'hidden';
                    this.minusTop.style.visibility = 'hidden';

                }

            });

            this.table.addEventListener('mouseover', (e) => {

                const target = e.target;

                if (target === this.center
                    || target === target.parentElement
                    || target.classList.contains('squere')) {

                    const rowsL = this.center.childElementCount;
                    const divsL = this.center.firstElementChild.childElementCount;

                    if  (rowsL > 1) this.minusLeft.style.visibility = 'visible';
                    else this.minusLeft.style.visibility = 'hidden';
                    if  (divsL > 1) this.minusTop.style.visibility = 'visible';
                    else this.minusTop.style.visibility = 'hidden';

                    this.offsets.offsetLeft = e .target.getBoundingClientRect().top - this.center.getBoundingClientRect().top - 3;
                    this.offsets.offsetTop = e.target.getBoundingClientRect().left - this.center.getBoundingClientRect().left - 3;

                    //Фильтрация чисто элементов центральной таблицы (контролы удалены)
                    let allSquares = this.table.getElementsByClassName('squere');
                    let inCenterSquares = Array.prototype.filter.call(allSquares, function(allSquares){
                        return allSquares.className === 'squere';
                    });

                    // Проверяю, что фокус именно на эллементе таблицы
                    if  (inCenterSquares.includes(e.target)) {

                        const currentRow = e.target.parentElement;
                        const currentInnerDiv = e.target;

                        this.positions.row = Array.from(this.center.children).indexOf(currentRow);
                        this.positions.div = Array.from(currentRow.children).indexOf(currentInnerDiv);

                        this.minusTop.style.left = this.offsets.offsetTop + 'px';
                        this.minusLeft.style.top = this.offsets.offsetLeft + 'px';

                    }

                }

            });

        }


    }


    const t1 = new Table('first');

};