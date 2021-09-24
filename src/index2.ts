import { Subject } from "rxjs";

namespace Index2 {
    enum actions {
        add = 0,
        minus
    }

    let subjectFoo = new Subject();

    class ToolBar {
        private btnAdd: HTMLElement;

        constructor() {
            this.btnAdd = document.getElementById("btnCount");
            this.btnAdd.onclick = this.AddClickHandler.bind(this);
        }

        private AddClickHandler() {
            subjectFoo.next(actions.add);
        }
    }

    class Left {
        constructor()
        {
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
            const counter = document.getElementById('leftCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }

        public handleMinus() {
            const counter = document.getElementById('leftCount');
            counter.innerText = (parseInt(counter.innerText)-1).toString();
        }
    }

    class Right {
        constructor()
        {
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
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }
        public handleMinus() {
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)-1).toString();
        }
    }

    class App {
        private toolBar: ToolBar;
        private leftCom: Left;
        private rightCom: Right;

        constructor() {
            this.leftCom = new Left();
            this.rightCom = new Right();
            this.toolBar = new ToolBar();
        }
    }

    const app = new App();

}