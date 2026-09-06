//depending on the environment, if 'common js' is used -> process.nextTick executes before
//Promise, and if 'module' is used -> Promise executes before process.nextTick

console.log("This is the starting point of my code");
process.nextTick(()=>{
    console.log("This is process.nextTick operation");
});
setImmediate(()=>{
    console.log("This is setImmediate operation");
},0);
setTimeout(()=>{
    console.log("This is first timeout operation");
},10000);
setTimeout(()=>{
    console.log("This is the second timout operation");
},5000);
console.log("This is the end point of my code");
new Promise((resolve,reject)=>{
    let success=true;
    if(success)
        resolve("Data loaded successfully");
    else
        reject("Data loading failed");
})
  .then((message)=>{
    console.log(message);
})
  .catch((message)=>{
    console.log(message);
  })
