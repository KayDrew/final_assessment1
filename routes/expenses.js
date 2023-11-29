export  default function expenses(query){
let totalAmount=0;
let weekly=0;
let monthly=0;
let daily=0;
let onceOff=0;
let weekend=0;
let weekday=0;
let expenses=[];
let message="";
let regex= /^([a-zA-Z]{3,})$/;

async function home(req,res){
expenses=[{name:"Monthly", amount:monthly},
{name:"Daily",amount:daily},{name:"Once-Off",amount:onceOff},
{name:"Weekly",amount:weekly},{name:"Weekday",amount:weekday},{name:"Weekend",amount:weekend}];


req.flash("message",message);

res.render("index",{totalAmount,expenses 
});
}

async function  recordExpense(req,res){

let description=req.body.description;
let amount= req.body.amount;
let category= req.body.category;

let id=0;
switch(category){
	
case "Daily":
id=1;
break;

case "Monthly" :
id= 2;
break;

case "Weekend":
id=3 ;
break;

case "Weekly" :
id=4 ;
break;

case "Weekday" :
id=5 ;
break;

case "Once-Off"  :
id= 6;
break;



}



if(description){
	
	description= description.trim();
	
if(regex.test(description)){
	
	if(amount){

if(amount<1){

message="Amount cannon  be zero";
}

else{
	
await query.recordExpense(id,description,amount);

message="Successfully added expense";

}
}

else{
message="Please enter  an amount";
}

}

else{
message="Please enter a valid description";
}
}

else{
message="Please, enter  description";

}




let allItems= await query.getExpenses();
var weekly1=0;
var daily1=0;
var monthly1=0;
var weekend1=0;
var weekday1=0;
var onceOff1=0;
let totalAmount1=0;

for(let i=0;i<allItems.length;++i){

var item= allItems[i];
var name=item.name;

totalAmount1+= item.amount;

switch(item.name){

case "Daily":

daily1+=item.amount;

break;

case "Monthly":
monthly1+=item.amount;

break;

case "Once-Off":
onceOff1+=item.amount;

break;

case "Weekly":
weekly1+=item.amount;

break;

case "Weekend":
weekend1+=item.amount;

break;

case "Weekday":
weekday1+=item.amount;

break;



}

}


monthly=monthly1;
daily=daily1*30;
onceOff=onceOff1;
weekly=weekly1*4;
weekday=weekday1*5;
weekend=weekend1*4;

totalAmount= monthly+daily+onceOff+weekly+weekday+weekend;
res.redirect("/");
}

async  function clearExpenses(req,res){

await query.clearExpenses();
expenses=[];
totalAmount=0;
message="deleted";
res.redirect("/");
}


return{
home,
recordExpense,
clearExpenses 
}
	}
