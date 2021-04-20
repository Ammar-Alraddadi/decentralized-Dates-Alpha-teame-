const TAMER = artifacts.require("TAMER");

contract("TAMER", async function(addFarmer){

it(
    "should add a Farmer", async function(){

        let instance = await TAMER.deployed()
        await instance.addFarmer(1111,123,"nnn",{from: addFarmer[0]}); 

    })

    ////////////////////////

    it(
        "should add a product", async function(){
            //let Product ID = 1;
            let instance = await TAMER.deployed()
            await instance.addProduct("Sekery",123,12,30,23,21,{from: addFarmer[0]}); 
    
    
        })


})
