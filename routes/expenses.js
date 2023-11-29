export  default function expenses(query){

async function home(req,res){

res.render("index",{
});
}

async function  recordExpense(req,res){

let description=req.body.description;
let amount= req.body.amount;
let category= req.body.category;

console.log(description);
console.log(amount)
console.log(category);


res.redirect("/");


}


return{
home,
recordExpense
}
}