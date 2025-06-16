const arr = [1,2,13,4,5];
let size = arr.length;
if(size % 2 != 0){
    let msize = size-1;
    let mid = msize/2;
    console.log("Middle",arr[mid]);
}
else
{
    console.log("There is no middle one");
}