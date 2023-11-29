import 'dotenv/config';
import assert from 'assert';
import database from '../database.js';
import pkg from 'pg-promise';
const connectionString = process.env.URL;
const Pool = pkg();

const db = Pool({
    connectionString,
    ssl: true
});

let query= database(db)

describe('The Expense Tracker  App',async function(){
	
beforeEach(async function () {
	
    try {
        	
       await query.clearExpenses();
       
           }catch(err){

         console.log(err);
}
        
}  );
      
   
   it("should  be able to add expenses to the table", async function (){

let result=await query.recordExpense(3,"Cinema",200);

assert.equal ("inserted",result);

});

after(function () {
        db.$pool.end;
    });

});