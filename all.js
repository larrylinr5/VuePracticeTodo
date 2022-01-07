var app = new Vue({
    el: '#app',
    data: {
        newTodo:'',
        todos:[
            {
                id:'345',
                title:'預設的第一筆資料(可刪除)',
                completed:false,
            }
        ],
        //暫存的代辦事項物件
        cacheTodo:{},
        //暫存的代辦事項標題
        cacheTitle:'',
        //顯示的代辦事項範圍
        visibility:'all'
    },
    methods: {
        //新增todo方法
        addTodo:function(){
            //取得輸入值 & 去掉前後多餘空白
            const value = this.newTodo.trim();
            //用時間戳記來當作id
            const timestamp = Math.floor(Date.now())
            //console.log(value,timestamp)
            
            //若內容為空值則不往下執行
            if(!value) return;

            //新增一筆todo資料
            this.todos.push({
                id:timestamp,
                title:value,
                completed:false,
            })
            //清空輸入值
            this.newTodo=''
        },
        //移除todo方法
        removeTodo:function(todo){
            this.todos.splice(this.todos.findIndex(item=>todo.id===item.id),1)
        },
        //編輯點擊的代辦事項
        editTodo:function(item){
            this.cacheTodo=item
            this.cacheTitle=item.title
        },
        //取消編輯點擊的代辦事項
        cencleEdit:function(){
            this.cacheTodo={}
        },
        //完成編輯點擊的代辦事項
        doneEdit:function(item){
            item.title=this.cacheTitle
            this.cacheTitle=''
            this.cacheTodo={}
        },
        //清除所有任務
        clearTodo:function(){
            this.todos=[]
        }
    },
    computed:{
        //挑選要選擇的代辦事項
        filteredTodos:function(){
            //若選擇全部 => 回傳完整todos
            if(this.visibility==='all') return this.todos
            //若選擇進行中 => 回傳completed:false的todos
            else if(this.visibility==='active'){
                return this.todos.filter(item=>!item.completed)
            }
            //若選擇已完成 => 回傳completed:true的todos
            else if(this.visibility==='completed'){
                return this.todos.filter(item=>item.completed)
            }
        },
        //計算總共有多少筆未完成的代辦事項
        caculateTodoLength:function(){
            return this.todos.filter(item=>!item.completed).length
        }
    }
});