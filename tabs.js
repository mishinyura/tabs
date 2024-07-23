const errors = {
    amountDifferent: 'Проверьте соответсвие количества кнопок, \nк количеству показываемых элементов!',
    notFound: 'Не удается найти переданный элемент',
    presenceAttributes: 'Проверьте отсутствие атрибутов data-btn и data-item на элементах',
}

class Tabs {
    constructor(objName, param) {
        this.obj = document.querySelector(objName);
        this.btnAttr = 'data-btn';
        this.itemAttr = 'data-item';
        this.btnsContainer = this.obj ? this.obj.querySelector(param.btnsBlockName || 'div') : null
        this.itemsContainer = this.obj ? this.obj.querySelector(param.itemsBlockName || 'ul') : null
        this.btns = this.btnsContainer ? this.btnsContainer.children : -1
        this.items = this.itemsContainer ? this.itemsContainer.children : -1
        this.active = param.activeNumItem >= 0 ? param.activeNumItem : -1
        

        let status = this.searchErrors()
        if (status) {
            console.log(status)
        } else {
            this.setParam();
            if (this.active >= 0) this.showItem(this.active);
            this.trakingActions()
        }
    }

    hideItem() {
        /*
        Функция удаляет активный класс
        */
        this.items[this.active].classList.remove('active')
        this.btns[this.active].classList.remove('active')
    }

    showItem(num) {
        /*
        Функция меняет активный элемент и добавляет классы
        */
        this.hideItem()
        this.active = num
        this.btns[num].classList.add('active')
        this.items[num].classList.add('active')
    }

    searchErrors() {
        /*
        Функция после инициализации экзмепляра класса осуществляет проверку
        используемого элемента DOM на соответствие требованиям скрипта.
        return: 
        -Если ошибок не найдено вернет true и скрипт начнет работать
        -Иначе вернет сообщение об ошибке в консоль и вернет false
        */
        if (!this.obj) return errors.notFound
        else if (this.btns < 0 || this.btns < 0 || this.btns.length != this.items.length)
            return errors.amountDifferent
        for (let i = 0; i < this.btns.length; ++i) {
            if (this.btns[i].dataset.btn || this.items[i].dataset.item) return errors.presenceAttributes
        }
        return false
    }

    setParam() {
        /*
        Функция устанавливает необходимые атрибуты и классы стилизации
        */
        for (let i = 0; i < this.btns.length; ++i) {
            this.btns[i].setAttribute(this.btnAttr, i);
            this.items[i].setAttribute(this.itemAttr, i);
        }
    }

    trakingActions() {
        /*
        Все обработчики событий объявлены в этой функции
        */
        for (let btn of this.btns) {
            btn.addEventListener('click', () => {
                this.showItem(btn.dataset[this.btnAttr.slice(5,)])
            })
        }
    }

}