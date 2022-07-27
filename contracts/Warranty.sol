// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
contract NFTminter is ERC1155,Ownable{
  
   using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; //tracks tokenids
 
    mapping(uint=>NFT)public idtoNFT;  //gives NFT from id
    mapping(address=>uint []) public accounttonft; //gives nftsid a person with given account own
 
    mapping(string=>uint) public QRtoid;  //gives id of nft corresponding to given qrhash
   

    struct NFT{
        uint serialno;
        string productdetail; 
        address minter;
        uint warrantyperiod;
    }  //its structure of everynftcard



     constructor()ERC1155(""){

     } ///dont look at it bro






function mintNFT(address to,NFT memory nft,string memory _qrhash)  external{
    
           _tokenIds.increment();
           uint id=_tokenIds.current();
           nft.minter=msg.sender;
           _mint(to,id,1,"");
           accounttonft[to].push(id);
           idtoNFT[id]=nft;
           QRtoid[_qrhash]=id;

     }  ///nft minting is handled from here


  

     function tranferNFT(address _to,uint  id) external
     {
         _safeTransferFrom(msg.sender,_to,id,1,"");
            uint  [] storage arr=accounttonft[msg.sender];
            for (uint  j=0;j<arr.length;j++)
            {
                if(id==arr[j])
               { arr[j]=arr[arr.length-1];
                arr.pop();
                break;}
            } 
            accounttonft[_to].push(id);
         
     } //responsible for the transfer of Nfts

     



function verifyproduct(string memory _qrhash) external view returns(uint)
{
uint nftid=QRtoid[_qrhash];
require(nftid!=0,"fake product");
return nftid;
} ///product verification is done from here....greatthing here is that this fncn will not cost
//any amount from user....its external view!!!

}


/////hope u understand !!(_)

