/**
 * Created by Greedyint390 on 14-9-5.
 */

//声明命名空间
var Todos=Todos||{};
Todos.totalNum=Todos.totalNum||0;
Todos.currentNum=Todos.currentNum||0;

//TodoModel 定义
Todos.TodoModel=function() {
    var _this = this;
    this.checked = null;
    this.todoText = null;
    this.Id = null;
    this.initialize = (function (argument) {   //初始化方法
        if (argument.length > 0) {
            _this.checked = argument[0].checked;
            _this.todoText = argument[0].todoText;
            _this.Id = argument[0].Id;
        }
    })(arguments);
    this.setData = function (model) {         //传入数据
        this.checked = model.checked;
        this.todoText = model.todoText;
        this.Id = model.Id;
    };
    this.get = function (attr) {              //get方法
        return this[attr];
    };
    this.set = function (attr, value) {        //set方法
        this[attr] = value;
    }
};