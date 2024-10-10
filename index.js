let arr = [1,2,3,4,5,6]
for (let i=1; i<arr.length;  i++){
    if(arr[i]%2==0){
        console.log("even");
    }else if(arr[i]%2==1){
        console.log("odd");
    }
}