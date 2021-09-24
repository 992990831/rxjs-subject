// import * as Rx from "rxjs";

// console.log(Rx.observable);
namespace Index {
    
    type addClickEvent = () => void;

    class ToolBar {
        private btnAdd: HTMLElement;
        private addCB: addClickEvent

        constructor(_addCallBack: addClickEvent) {
            this.btnAdd = document.getElementById("btnCount");
            this.btnAdd.onclick = this.AddClickHandler.bind(this);

            this.addCB = _addCallBack;
        }

        private AddClickHandler() {
            this.addCB && this.addCB();
        }
    }

    class Left {
        public handleAdd() {
            const counter = document.getElementById('leftCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }
    }

    class Right {
        public handleAdd() {
            const counter = document.getElementById('rightCount');
            counter.innerText = (parseInt(counter.innerText)+1).toString();
        }
    }

    class App {
        private toolBar: ToolBar;
        private leftCom: Left;
        private rightCom: Right;

        constructor() {
            this.leftCom = new Left();
            this.rightCom = new Right();
            this.toolBar = new ToolBar(this.onAddClick.bind(this));
        }

        private onAddClick() {
            this.leftCom.handleAdd();
            this.rightCom.handleAdd();
        }
    }

    const app = new App();


}