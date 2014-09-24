/**
 * Created by Greedyint390 on 14-9-5.
 */
//命名空间
var Todos=Todos||{};
//TodoModeList 定义
Todos.TodoList=function(){
    var _this=this;
    this.storge={};
    this.getTodo=function(){
        var count = 0;
        for (var a in _this.storge) {
            if (a.indexOf("todo")==0 && !_this.storge[a].get("checked")) {
                count++;
            }
        }
        return count;
    }
};
