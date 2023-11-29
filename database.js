export default  function  dbQueries(db){

async  function  create(){

try{
	
//	await db.none("CREATE TABLE expenses(id INT,description VARCHAR(255) NOT NULL,amount INT NOT NULL,FOREIGN KEY(id) REFERENCES categories(id))");



}catch(err){

console.log(err);

}

}


async function insertCategory(name){

try{
await  db.none("INSERT INTO  categories(id,name) VALUES (DEFAULT,$1)",name);

console.log("inserted");
}catch(err){
	
console.log(err);

}

}

async function recordExpense(id,description, amount){

try{
await  db.none("INSERT INTO  expenses(id,description,amount) VALUES ($1,$2,$3)",[id,description,amount]);
return "inserted";
}catch(err){
	
console.log(err);

}

}


async function getExpenses(){

try{

let result= db.manyOrNone("SELECT categories.name, expenses.description, expenses.amount FROM  expenses JOIN categories ON expenses.id=categories.id");

return result;

}catch(err){
console.log(err);

return [];

}
}

async  function  clearExpenses(){

try{
await  db.none("DELETE FROM expenses");

return "deleted";
}catch(err){

console.log(err);
}


}




return{
create,
insertCategory,
recordExpense,
clearExpenses,
getExpenses

}

}

