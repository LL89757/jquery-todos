/**
 * Created by Greedyint390 on 14-9-1.
 */
//命名空间
var Todos = Todos || {};
var todoList = new Todos.TodoList();
//appView
function AppView() {
    this.el = $("body");
    var _this = this;
    this.router = "All";
    //初始化函数
    this.initialize = function () {
        this.el.find("#new-todo").on("keypress", add);     //添加Todo
        this.el.find("#new-todo").on("blur", clearText);   //离焦输入框清空
        this.el.find("#toggle-all").on("click", toggleAll);//点击toggleAll
        this.el.find("#filters").on("click", show);        //筛选功能
        this.el.find("#clear-completed").on("click", clearComplete);  //清除已完成
        $(todoList.storge).on("Check", Check);      // 显示校验功能
        this.el.find("#todo-list").sortable();//拖拽排序
        $(window).on("unload", closeSaved);
        this.showSaved();
    };
    this.showSaved = function () {
        var num = 0;
        //获取排序Id
        var order = localStorage.getItem("orderId").split(",");
        if (localStorage.getItem("todoList").length > 2) {
            //获取model
            var list = JSON.parse(localStorage.getItem("todoList"));
            for (var id in order) {
                //添加Todo到html
                for (var i in list) {
                    if (list[i].Id == order[id]) {
                        var todo = _this.el.find("#todo-template").clone();
                        _this.el.find("#todo-list").append(todo.html());
                        _this.el.find("#todoBox").attr("id", "todo" + num)
                        _this.el.find(".todo").show();
                        //添加model
                        var todoModel = new Todos.TodoModel({checked: list[i].checked, todoText: list[i].todoText, Id: "todo" + num});
                        var viewEl = _this.el.find("#todo" + num)
                        var todoView = new Todos.TodoView({model: todoModel, el: viewEl})
                        todoList.storge["todo" + num] = todoModel;
                        viewEl.find(".toggle")[0].checked = todoModel.checked;
                        viewEl.toggleClass("done", todoModel.checked);
                        num++;
                        Todos.totalNum = num;
                        Todos.currentNum = num;
                        $(todoList.storge).trigger("Check");
                    }

                }

            }

        }

    }
    //刷新和关闭保存数据
    function closeSaved() {
        localStorage.setItem("todoList", JSON.stringify(todoList.storge));
        localStorage.setItem("orderId", _this.el.find("#todo-list").sortable('toArray'));
    }

//点击toggleAll
    function toggleAll() {
        if (Todos.currentNum == 0)
            return;
        var flag = todoList.getTodo() != 0 ? 1 : 2;              //flag判断是全选还是全清
        for (var x in todoList.storge) {
            if (typeof todoList.storge[x] == "object" && flag)
                $(todoList.storge[x]).trigger("toggleAll", flag);
        }
        $(todoList.storge).trigger("Check");
    }

//清除已完成Todo
    function clearComplete() {
        for (var x in todoList.storge) {
            $(todoList.storge[x]).trigger("deleteComplete");
        }
    }

//添加Todo
    function add(e) {
        var total = Todos.totalNum;
        //var currentNum = currentNum;
        if (e.keyCode != 13) return;
        if (this.value == "")
            return;
//添加Todo到html
        var todo = _this.el.find("#todo-template").clone();
        _this.el.find("#todo-list").append(todo.html());
        _this.el.find("#todoBox").attr("id", "todo" + total)
        _this.el.find(".todo").show();
//添加model
        var todoModel = new Todos.TodoModel({checked: false, todoText: $("#new-todo").val(), Id: "todo" + total});
        var viewEl = _this.el.find("#todo" + (total))
        var todoView = new Todos.TodoView({model: todoModel, el: viewEl})
        todoList.storge["todo" + total] = todoModel;
        _this.el.find("#new-todo").val("");
        Todos.totalNum++;
        Todos.currentNum++;
        show(_this.router);
        $(todoList.storge).trigger("Check");

    }

//清空输入框
    function clearText() {
        _this.el.find("#new-todo").val("");
    }

//显示功能
    function show(e) {
        var x;
        if (e.type == "click") {
            $(e.target.offsetParent).find("a").removeClass();
            $(e.target).attr("class", "selected");
            _this.router = e.target.text;
        }
        switch (_this.router) {
            case "All":
            {//显示全部
                for (x in todoList.storge) {
                    if (todoList.storge[x] instanceof Todos.TodoModel) {
                        $(todoList.storge[x]).trigger("showAll");
                    }
                }
                break;
            }
            case "Active":
            {//显示未完成
                for (x in todoList.storge) {
                    if (todoList.storge[x] instanceof Todos.TodoModel) {
                        $(todoList.storge[x]).trigger("showActive");
                    }
                }
                break;
            }
            case "Completed":
            {//显示已完成
                for (x in todoList.storge) {
                    if (todoList.storge[x] instanceof Todos.TodoModel) {
                        $(todoList.storge[x]).trigger("showComplete");
                    }
                }
                break;
            }
        }
    }

//显示总数,clear数,校验toggleAll,
    function Check() {
        _this.el.find("#todo-count").text(Todos.currentNum + " itmes left");
        _this.el.find("#clear-completed").text("Clear " + (Todos.currentNum - todoList.getTodo()) + " completed")
        _this.el.find("#toggle-all")[0].checked = todoList.getTodo() == 0 && Todos.currentNum > 0;
    }

    this.initialize();   //执行初始化函数
}
$(function () {
    var appView = new AppView();
});