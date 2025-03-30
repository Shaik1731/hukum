 function createFunctionRegistry(){
    const registry={};
    return{
        regisryFunction:function(name,func){
            registry[name]=func;
        },
        executeFunction:function(name,srgs,context=null){
            if(registry[name]){
                return registry[name].apply(context.args);
            }
            return undefined;
        },
        mapFunction:function(name,dataArray){
            if(registry[name]){
                return dataArray.map(item=>registry[name](item))
            }
            return []
            
        },
        filterFunction:function(name,dataArray){
            if(registry[name]){
                return dataArray.filter(item =>registry[name](item))
            }
            return []
        },
        reduceFunction:function(name,dataArray,initialValue){
            if(registry[name]){
                return dataArray.reduce(registry[name],initialValue)
            }
            return initialValue
        },
            
    }
 }