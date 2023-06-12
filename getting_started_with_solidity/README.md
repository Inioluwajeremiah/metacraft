## MyTken README
1. This contract contains public variables that store the details MyToken coin
Token Name = AdewaraToken, Token Abbreviation = ADT and Total Supply initialized to 0
2. MyToken contract has a mapping of addresses to balances (address => uint)
3. MyToken contract has a mint function that takes two parameters: an address and a value. 
The function then increases the total supply by that number and increases the balance of the “sender” address by that amount
4. MyToken contract has a burn function, which is used to destroy tokens. 
It takes an address and value just like the mint functions. It then deducts the value from the total supply 
and from the balance of the “sender”. Lastly, the burn function has a conditionals to make sure the balance of "sender" is greater than or equal to the amount that is supposed to be burned.