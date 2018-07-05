// function add(number) {
//   function add2(number2) {
//     return number + number2;
//   }
//   return add2;
// }
// add(4)(3);//замыкание

// function(height,color){
//   var height=height||50
//   var color=color||50

// }
// //присвоение по умолчанию в ес 6
//  (height=50, color='red')=>{
//    ...
//  }



// var _this=this;

// $('.btn'.click) дописать
// var _this=this;//дис указвает на виндов чтоб контекст выполнения н терялся
// const btn=document.querySelector('.btn');
// btn.addEventListener('click',(event)=>_this.sendData(event))


// function Dog(name){
//   this.name=name
// }
// Dog.sayHello=function(){
//   console.log('Hello, I am'+this.name)
// }

// var dog= new Dog('Bruno')
// dog.sayHello()

// var dog={
//   name:'Frodo',
//   sayName:function(){
//     console.log(this.name)
//   }
// }
// var dogNameFunction=dog.sayName
// dogNameFunction()

// new Promise((resolve, reject) => {
//     reject()
//   })
//   .then(
//     () => console.log('Success 1'),
//     () => console.log('Error 1')
//   )
//   .then(
//     () => console.log('Success 2'),
//     () => console.log('Error 2')
//   )  
//   .then(
//     () => console.log('Success 3'),
//     () => console.log('Error 3')
//   )

const a=[1,2,3,4].reduce((acc,next)=> acc+next);
console.log(a)