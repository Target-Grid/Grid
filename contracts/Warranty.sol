// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
contract NFTminter is ERC1155,Ownable{
   using Counters for Counters.Counter;
   
    Counters.Counter private _tokenIds; //tracks tokenids
    Counters.Counter private _companyIds; //trcks companyids

    mapping(uint=>NFT)public idtoNFT;  //gives NFT from id
    mapping(address=>uint []) public accounttonft; //gives nftsid a person with given account own
 
    mapping(string=>uint) public QRtoid;  //gives id of nft corresponding to given qrhash
    mapping(uint=>string)public cidtochash; // maps copmany id with hash of companydata
    string [] public companyhashtlist;     //stores hash of all the regisered companies i will make it private so that no one can see it

    struct NFT{
        uint serialno;
        string productdetail; 
        string companyhash;
        uint companyId;
        address minter;
        uint warrantyperiod;
    }  //its structure of everynftcard



     constructor()ERC1155(""){

     } ///dont look at it bro

modifier onlyregisted(string memory _chash)
{
    bool found=false;
    for(uint i=0;i<companyhashtlist.length;i++)
    {
        if(keccak256(abi.encodePacked(_chash))==keccak256(abi.encodePacked(companyhashtlist[i])))
        {
            found=true;
            break;
        }
    }
    require(found==true,"company not registered with given hash");
    _;
}  //this is gatekeeper to function which checks that only regesterd companies can mint nfts




function mintNFTs(address to,uint256 counts,NFT []memory _nftlist,string []memory QRlist,string memory _chash) onlyregisted(_chash) external{
       uint[] memory ids= new uint[](counts);
       uint[] memory amount = new uint[](counts);
       
      
       for(uint256 i=0;i<counts;i++)
       {
           _tokenIds.increment();
           uint no=_tokenIds.current();
           ids[i]=no;
           amount[i]=1;
           _nftlist[i].minter=msg.sender;
           _nftlist[i].companyhash=_chash;
       }
     _mintBatch(to,ids,amount,"");
     for(uint i=0;i<counts;i++)
     {
     accounttonft[to].push(ids[i]);
     idtoNFT[ids[i]]=_nftlist[i];
     QRtoid[QRlist[i]]=ids[i];

     }}  ///nft minting is handled from here




     function tranferNFTs(address _to,uint []memory ids,uint [] memory amount) external
     {
         _safeBatchTransferFrom(msg.sender,_to,ids,amount,"");
         for(uint i=0;i<ids.length;i++)
         {
            uint  [] storage arr=accounttonft[msg.sender];
            for (uint  j=0;j<arr.length;j++)
            {
                if(ids[i]==arr[j])
               { arr[j]=arr[arr.length-1];
                arr.pop();
                break;}
            } 
            accounttonft[_to].push(ids[i]);
         }
     } //responsible for the transfer of Nfts

     
     


function registercompany(string memory _companyhash) external onlyOwner()
{
_companyIds.increment();
uint no=_companyIds.current();
cidtochash[no]=_companyhash;
companyhashtlist.push(_companyhash);
} ///only admin can register any company after verification
 
 
 


///product verification is done from here....great thing here is that this fncn will not cost any amount from user....as its external view!!!

function verifyproduct(string memory _qrhash) external view returns(uint)
{
uint nftid=QRtoid[_qrhash];
string memory chash=idtoNFT[nftid].companyhash;
bool found=false;
for(uint i=0;i<companyhashtlist.length;i++)
{  
    if(keccak256(abi.encodePacked(chash))==keccak256(abi.encodePacked(companyhashtlist[i])))
    {
        found=true;
        break;
    }
}
require(found==true,"company not found");
return nftid;
} 

}


//hope u understand !!!!!!

