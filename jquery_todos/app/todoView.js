/**
 * Created by Greedyint390 on 14-9-5.
 */
//命名空间
var Todos=Todos||{};

//TodoView 定义
Todos.TodoView=function(){
    var _this = this;
    this.argument = arguments;
    this.model = new Todos.TodoModel();
    this.todoInit = function () {
        //model初始化
        if (this.argument.length > 0) {
            this.model = this.argument[0].model ? this.argument[0].model : this.model;
            this.el = this.argument[0].el;
        }
        this.el.find("#todoValue").text(this.model.get("todoText")); //Label初始化
        //绑定事件
        $(this.model).bind("showAll", showAll);   //显示全部
        $(this.model).bind("showActive", showActive);//显示todo
        $(this.model).bind("showComplete", showComplete);//显示已完成
        $(this.model).bind("deleteComplete", deleteComplete);//删除已完成
        $(this.model).bind("toggleAll", toggleAll);   //点击toggleAll
        this.el.find("#todoValue").on("dblclick", inputShow); //绑定双击编辑事件
        this.el.find("#todoInputBox").on("blur", inputHide);  //input离焦事件
        this.el.find("#todoInputBox").on("keypress", inputHide);//input回车离焦事件
        this.el.find(".destroy").on("click", deleteTodo); //删除事件
        this.el.find(".toggle").on("click", todoCheck);  //点击check事件

    };

    function inputShow() {  //显示input
        _this.el.find("#todoInputBox").val(_this.model.get("todoText"));
        _this.el.addClass("editing");
        _this.el.find("#todoInputBox").focus();
    }

    function inputHide(e) {   //隐藏 input
        if (e.keyCode != 13 && e.type == "keypress")
            return;
        _this.el.removeClass("editing");
        _this.model.set("todoText", _this.el.find("#todoInputBox").val());
        _this.el.find("#todoValue").text(_this.model.get("todoText"));
    }

    function deleteTodo() {   //删除todo
        _this.el.remove();
        delete todoList.storge[_this.model.Id];
        Todos.currentNum--;
        $(todoList.storge).trigger("Check");
    }

    function todoCheck() {   //点击checked
        _this.model.set("checked", !_this.model.checked);
        _this.el.toggleClass("done", _this.model.checked);
        $(todoList.storge).trigger("Check");

    }

    function showAll() {     //显示全部
        _this.el.show();
    }

    function showActive() {  //显示待做todo
        _this.model.get("checked") ? _this.el.hide() : _this.el.show();
    }
    function showComplete() { //显示已完成todo
        _this.model.get("checked") ? _this.el.show() : _this.el.hide();
    }
    function deleteComplete() { //删除已完成todo
        if (_this.model.get("checked")) {
            _this.el.remove();
            delete todoList.storge[_this.model.Id];
            Todos.currentNum--;
            $(todoList.storge).trigger("Check");
        }
    }
    function toggleAll(e, flag) {  //点击toggleAll，     flag判断是全选还是全清
        if (flag == 1) {
            _this.model.set("checked", true);
            _this.el.find(".toggle")[0].checked = true;
            _this.el.toggleClass("done", true);
        }
        else {
            _this.model.set("checked", false);
            _this.el.find(".toggle")[0].checked = false;
            _this.el.toggleClass("done", false);
        }
    }

    this.setModel = function (model) {
        this.model = model;
    };
    this.getModel = function () {
        return this.model;
    };
    this.todoInit();//执行初始化函数

}