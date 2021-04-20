const TAMER = artifacts.require("TAMER");

contract("TAMER", async function(addFarmer){

it (
    "should addFarmer", async function(){
        //let Product ID = 1;
        let instance = await TAMER.deployed()
        await instance.addFarmer(1,"riyadh",web3.utils.toWei('1', 'ether')) });




})
