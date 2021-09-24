import { Subject } from "rxjs";

namespace Index3 {
    enum actions {
        add = 0,
        minus
    }

    let subjectFoo = new Subject();

    interface IAdd {
        handleAdd: ()=>void;
    }

    interface IMinus {
        handleMinus: ()=>void;
    }

    class EventPublisher {
        private btnAdd: HTMLElement;
        private btnMinus: HTMLElement;

        constructor() {
            this.btnAdd = document.getElementById("btnCount");
            this.btnAdd.onclick = this.AddClickHandler.bind(this);

            this.btnMinus = document.getElementById("btnMinus");
            this.btnMinus.onclick = this.MinusClickHandler.bind(this);
        }

        private AddClickHandler() {
            subjectFoo.next(actions.add);
        }

        private MinusClickHandler() {
            subjectFoo.next(actions.minus);
        }
    }

    class Left implements IAdd, IMinus {
        public handleMinus() {
            const counter = document.getElementById('leftCount');
            counter.innerText = (parseInt(counter.innerText)-1).toString();
        }

        public handleAdd() {
            const counter = document.getElementById('leftCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }
    }

    class Right implements IAdd, IMinus { 
        public handleAdd() {
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }

        public handleMinus() {
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)-1).toString();
        }
    }

    class EventHub {
        private components: any[] = [];

        constructor() {
            this.components.push(new Left());
            this.components.push(new Right());

            subjectFoo.subscribe(action => {
                switch(action) {
                    case actions.add: 
                        this.handleAdd();
                    break;
                    case actions.minus: 
                        this.handleMinus();
                    break;
                    default: break;
                }
            })
        }

        public handleAdd() {
            this.components.forEach(com => {
                (com as IAdd).handleAdd && (com as IAdd).handleAdd();
            });
        }
        public handleMinus() {
            this.components.forEach(com => {
                (com as IMinus).handleMinus && (com as IMinus).handleMinus();
            });
        }
    }

    const hub = new EventHub();
    const publisher = new EventPublisher();
}