function  compare (a,b){
    if (a.name < b.name) 
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}


new Vue({
    el:"#main",
    data: {
        item: "",
        items: [],
        count: 0,
        checked: [],
    },
    methods:{
        add: function(item){
            var k = this.count + 1;
            this.items.push({key: k, name: item, show: true});
            this.count++;
            // $("#input").value = "Enter Item" // HOW TO MAKE IT GO BACK TO BLANK AGAIN????
            console.log($("#userinput"));
        },
        unselectAll: function(){
            this.checked = [];
        },
        deleteSelected: function(){
            var self = this;
            this.items.forEach(function(item, ix){               
                self.checked.forEach(function(c){
                    if(item.key === c){
                        //console.log(item.key, c, ix);
                        self.items.splice(ix, 1 );
                    }
                })
            })
        },
        orderASC: function(){
            this.items = this.items.sort(compare);
        },
        orderDESC: function(){
            this.items = this.items.sort(compare).reverse();
        },
        showUnchecked: function(){   
            var self = this;
            this.items.forEach(function(item){
                self.checked.forEach(function(checkedid){
                    if(item.key === checkedid){
                        item.show =! item.show;
                    }
                 })
            });
        },
        showChecked: function(){   
            var self = this;
            this.items.forEach(function(item){
                if(!self.checked.includes(item.key)){
                    item.show =! item.show
                }
            })
        },
        del: function(k){
            this.items = this.items.filter(item => item.key != k);
        }, 
        deleteAll: function(){
            this.items = [];
        },
    }, //end of methods
    computed: {
        selectAll: {
            get: function () {
                return this.items ? this.checked.length == this.items.length : false;
            },
            set: function (getvalue) {
                var selected = [];
                if (getvalue) {
                    this.items.forEach(function (item) {
                        selected.push(item.key);
                    });
                }
                this.checked = selected;
            }
        }
    } // end of computed
})