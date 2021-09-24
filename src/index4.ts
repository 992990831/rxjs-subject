import { Subject } from "rxjs";

namespace Index4 {
    let subjectFoo = new Subject();

    //自定义装饰器
    function MySubject(title: string) {
        return function (constructor: Function) {
            constructor.prototype.title = title;
            subjectFoo.subscribe(action => {
                switch(action) {
                    case actions.add: 
                        constructor.prototype.handleAdd();
                    break;
                    case actions.minus: 
                        constructor.prototype.handleMinus();
                    break;
                    default: break;
                }
            });
        }
    }
      
    enum actions {
        add = 0,
        minus
    }


    class ToolBar {
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

    @MySubject('add')
    class Left { 
        constructor() {
            console.log((this as any).title);
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

    @MySubject('add')
    class Right {
        public handleAdd() {
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }
        public handleMinus() {
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)-1).toString();
        }
    }

    @MySubject('add')
    class Middle {
        public handleAdd() {
            const counter = document.getElementById('middleCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }
        public handleMinus() {
            const counter = document.getElementById('middleCount');
            counter.innerText = (parseInt(counter.innerText)-1).toString();
        }
    }

    class App {
        private toolBar: ToolBar;
        private leftCom: Left;
        private rightCom: Right;
        private midCom: Middle;


        constructor() {
            this.leftCom = new Left();
            this.rightCom = new Right();
            this.midCom = new Middle();
            this.toolBar = new ToolBar();
        }
    }

    const app = new App();

}