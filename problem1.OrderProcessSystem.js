function createOrderManager(){
    let orders=[]
    return {
        addOrder:function(order){
            orders.push(order);
        },
        UpdateOrderStatus:function(orderId,newStatus){
            orders=orders.map(order =>{
                if(order.Id ==orderId){
                    return {
                        ...order,status:newStatus
                    }
                }
                return order
            })
        },
        filterOrders:function(status){
            return orders.filter(order => order.status==status)
        },
        sortOrder:function(sortBy,orderDirection="asc"){
            const sortedOrders=[...orders];
            if(sortBy ==="data"){
                sortedOrders.sort((a,b)=>{
                    const dataA=new Data(a.createdAt);
                    const dataB=new Data(b.createdAt);
                    return orderDirection ==="asc" ? dataA-dataB:dataB-dataA;
                })
            }
            else if(sortBy =="status"){
                sortedOrders.sort((a,b)=>{
                    return orderDirection=="asc"? a.status.localCompare(b.status):
                    b.status.localCompare(a.status)
                })
            }
            return sortedOrders;
        },
        GetTotalRevenue:function(){
            return orders.reduce((total,order)=>{
                const orderRevenue=order.items.reduce((itemTotal,item)=>{
                    return itemTotal+item.price*item.quantity;
                },0)
                return total+orderRevenue;
            },0);
        },
        exportOrders:function(){
            return JSON.stringify(orders,null,2);
        },
       
    }
}
const manager = createOrderManager();
manager.addOrder({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrder({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
console.log(manager.filterOrders("pending"));

console.log(manager.GetTotalRevenue());