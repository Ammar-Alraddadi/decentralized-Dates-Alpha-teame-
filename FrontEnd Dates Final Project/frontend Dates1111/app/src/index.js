import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/TAMER.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

   addFarmer: async function() {
    const { addFarmer } = this.meta.methods;
    const FarmerId = parseInt(document.getElementById("FarmerId").value);
    const Account =parseInt( document.getElementById("Account").value);
    const Location = document.getElementById("Location").value;
   

    //const offered = parseInt(document.getElementById("offered").value);
    //const amount = parseInt(document.getElementById("amount").value);
    //const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

   // const { addFarmer } = this.meta.methods;
   await addFarmer(FarmerId,Account,Location).send({ from: this.account });

    this.setStatus("You add a Farmer" + this.account);
    
  },
////////////////////////////////
addProduct: async function() {
  const TamerType = parseInt(document.getElementById("TamerType").value);
  const TamerId = document.getElementById("TamerId").value;
  const ProductBoxNum = parseInt(document.getElementById("ProductBoxNum").value);
  //const price = parseInt(document.getElementById("price").value);
  //const ProductDOP = parseInt(document.getElementById("ProductDOP").value);
  //const ProductExp = document.getElementById("ProductExp").value;

  this.setStatus("Initiating transaction... (please wait)");

  const { addProduct } = this.meta.methods;
 await addProduct(TamerType,TamerId,ProductBoxNum,price,ProductDOP,ProductExp).send({ from: this.account });

  this.setStatus("You add a Product" + this.account);
  
},
///////////////////////////////////
//modifier onlyFarmer(){
      
 // require(isFarmer[msg.sender] == true , "you are not the authurized" );
  //  _;
 // }
////////////////////////////////////////////////  

changePrice: async function() {
  const TamerIndex = parseInt(document.getElementById("TamerIndex").value);
  const price = document.getElementById("price").value;
 // const ProductBoxNum = parseInt(document.getElementById("ProductBoxNum").value);
  //const price = parseInt(document.getElementById("price").value);
  //const ProductDOP = parseInt(document.getElementById("ProductDOP").value);
  //const ProductExp = document.getElementById("ProductExp").value;

  this.setStatus("Initiating transaction... (please wait)");

  const { changePrice } = this.meta.methods;
 await changePrice(TamerIndex,price).send({ from: this.account });

  this.setStatus("You can changePrice" + this.account);
},
/////////////////////////////////////////////////////////// 

buyTamer: async function() {
  const TamerIndex = parseInt(document.getElementById("TamerIndex").value);
 /// const price = document.getElementById("price").value;
 // const ProductBoxNum = parseInt(document.getElementById("ProductBoxNum").value);
  //const price = parseInt(document.getElementById("price").value);
  //const ProductDOP = parseInt(document.getElementById("ProductDOP").value);
  //const ProductExp = document.getElementById("ProductExp").value;

  this.setStatus("Initiating transaction... (please wait)");

  const { buyTamer } = this.meta.methods;
 await buyTamer(TamerIndex).send({ from: this.account });

  this.setStatus("You can buyTamer" + this.account);
},
/////////////////////////////////////////////////////////////////









  //sendCoin: async function() {
   // const amount = parseInt(document.getElementById("amount").value);
   // const receiver = document.getElementById("receiver").value;

   // this.setStatus("Initiating transaction... (please wait)");

   // const { sendCoin } = this.meta.methods;
   // await sendCoin(receiver, amount).send({ from: this.account });

   // this.setStatus("Transaction complete!");
   // this.refreshBalance();
 // },

 setStatus: function(message) {
  const status = document.getElementById("status");
  status.innerHTML = message;
},
}


window.App = App;

window.addEventListener("load", function() {
if (window.ethereum) {
  // use MetaMask's provider
  App.web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // get permission to access accounts
} else {
  console.warn(
    "No web3 detected. Falling back to HTTP://127.0.0.1:7545. You should remove this fallback when you deploy live",
  );
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  App.web3 = new Web3(
    new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"),
  );
}

App.start();
});

