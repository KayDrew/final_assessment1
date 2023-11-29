export  default function expenses(query){

let message="";
let regex= /^([a-zA-Z]{3,})$/;

async function home(req,res){

req.flash("message",message);

res.render("index",{
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

console.log(id);

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


res.redirect("/");


}

async function getExpenses(req,res){

let expenses= await query.getExpenses();


}


return{
home,
recordExpense,
getExpenses 
}
}