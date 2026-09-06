console.log("this is stariting point of my code") ;
// ascychronus
process.nextTick(() => {
    console.log("this is process.nextTick operstion") ;
})
setTimeout(() => {
    console.log("this is first timeout operation") ;
},4000);
setTimeout(() => {
    console.log("this is second timeout operation") ;
},6000);
new Promise((resolve,reject) =>{
    //let success = true ;
    let success = false ;
    if(success) resolve("data loaded successfully") ;
    else reject("data loading failed") ;
}
)
.then((message) =>{
    console.log(message) ;
}
)
.catch((message) => {
    console.log(message) ;
}
)
// event dom function 
import EventEmitter from "node:events";
function createDOMEvent() {
    const emitter = new EventEmitter();
    return {
        addEventListener(eventType, listener) {
            emitter.on(eventType, listener);
        },
        removeEventListener(eventType, listener) {
            emitter.off(eventType, listener);
        },
        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            emitter.emit(event.eventType, event);
        }
    };
}
const button = createDOMEvent();
button.addEventListener("save", (event) => {
    console.log("saving....");
    console.log(event.detail);
});
button.addEventListener("submit", (event) => {
    console.log("data submitted successfully");
    console.log(event.detail);
});
// function handleClick(event){
// }
button.dispatchEvent({
    eventType: "save",
    detail: "this is save dispatcher"
});
button.dispatchEvent({
    eventType: "submit",
    detail: "this is submit dispatcher"
});
console.log("this is the end point of my code");