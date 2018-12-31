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
        items: [],
        count: 0,
        checked: [], 
        unchecked: [],
        userInput: "",
        activate: 0
    },
    methods:{
        add: function(userInput){
            this.activate = 0;
            var k = this.count + 1;
            this.items.push({key: k, name: this.userInput, show: true});
            this.count++;
            this.userInput = "";
        },
        showAll: function(){
            this.activate = 0;
            var self = this;
            this.items.forEach(function(item){
                item.show = true
            })
            // this.items.forEach( function(item){
            //     self.checked.forEach(function(checkedid){
            //         if(item.show === false){
            //             item.show = true; }
            //      })
            // })
        },
        unselectAll: function(){
            this.activate = 0;
            this.checked = [];
        },
        deleteSelected: function(){
            
            this.activate = 0;
            var self = this;
            this.checked.sort(); this.checked.reverse();
            this.checked.forEach(function(checkedid, checkedix, checkedkey){
                self.items = self.items.filter(item => item.key != checkedid);

            })
            this.checked = []; 
            // console.log(this.items, this.checked);
        },
        orderASC: function(){
            this.activate = 1;
            this.items = this.items.sort(compare);
        },
        orderDESC: function(){
            this.activate = 1;
            this.items = this.items.sort(compare).reverse();
        },
        showUnchecked: function(){   
            this.showAll();
            this.activate = 1;
            var self = this;
            this.checked.forEach(function(checkedelt){
                self.items.forEach(function(item){
                    if (item.key === checkedelt){
                        item.show = false;
                    }
                 })
            });
        },
        showChecked: function(){   
            this.activate = 1;
            var self = this;
            // console.log(this.items, this.checked);     
            this.items.forEach(function(item){
                item.show = false
            })
            
            this.checked.forEach(function(checkedelt){
                self.items.forEach(function(item){
                    if (item.key === checkedelt){
                        item.show = true;
                    }

               })                
            })
        },
        del: function(k){
            this.activate = 0;
            this.items = this.items.filter(item => item.key != k);
        }, 
        deleteAll: function(){
            this.activate = 0;
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