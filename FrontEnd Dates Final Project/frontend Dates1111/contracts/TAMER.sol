// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract  TAMER  {

    struct Farmer {
        uint FarmerId;
        uint Account;
        string Location;
        
    }
    
      struct Tamer {
        string TamerType;
        uint TamerId;
        uint productBoxNum;
        uint price;
        uint ProductDOP;
        uint ProductExp;
        address owner;
    }
    
    uint tamerCounter;
    uint famerCounter;
    string private _name;
    string private _symbol;
    address  public isOwner ;


    constructor () {
        isOwner =msg.sender;
        _name = "Tamer";
        _symbol = "TM";
    }
    
    

    function name() public view  returns (string memory) {
        return _name;
    }


    function symbol() public view  returns (string memory) {
        return _symbol;
    }

   
    
    mapping(uint => Tamer) public tamerIndex;
    mapping(address => mapping(uint => Tamer)) public client;
    mapping(uint256 => Farmer) private _Farmar;
    mapping(address => bool) public isFarmer;
    
    
    function addFarmer(uint FarmerId, uint Account, string memory Location ) public  {
    Farmer memory newFarmer = Farmer(FarmerId, Account, Location);
    _Farmar[famerCounter++] = newFarmer; 
    isFarmer[msg.sender]=true;
    }

    function addProduct(string memory TamerType ,uint _TamerId, uint _ProductBoxNum, uint _price, uint _ProductDOP, uint _ProductExp ) public  onlyFarmer{
        Tamer memory newProduct = Tamer(TamerType,_TamerId, _ProductBoxNum, _price, _ProductDOP, _ProductExp, msg.sender);
        tamerIndex[tamerCounter++] = newProduct;
        }
    
    
  modifier onlyFarmer(){
      
    require(isFarmer[msg.sender] == true , "you are not the authurized" );
      _;
    }
     
 
    
     
    function changePrice(uint _TamerIndex, uint _price) public  onlyFarmer{
        tamerIndex[_TamerIndex].price = _price;
    }
    
   
    
   function buyTamer(uint _TamerIndex) public  payable {
      
        require(msg.value >= tamerIndex[_TamerIndex].price, "check the amount ");
        
        payable(tamerIndex[_TamerIndex].owner).transfer(tamerIndex[_TamerIndex].price);

    } 
    
    /*  function transferMoney( address to, uint256 _id) public {
        //address owner=msg.sender;
       require(msg.sender != to," You are the owner of this Insurance ");
       require(ownerOf(_id) == msg.sender," Your not the Owner ");
        _transfer(msg.sender, to, _id);
        
    }*/

    
}