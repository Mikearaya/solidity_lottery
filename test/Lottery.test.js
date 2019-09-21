const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); 
const {abi, evm} = require('../compile') 

//set a testing etherium network
const web3 = new Web3(ganache.provider());
let accounts;
let lottery;

beforeEach( async() => {
accounts = await web3.eth.getAccounts();
lottery = await new web3.eth.Contract(abi)
.deploy({data: evm.bytecode["object"]})
.send({from: accounts[0], gas: '1000000'});
} );



describe('Lottery Contract', () => {
  
  it('deployes a contract', () => {
      assert.ok(lottery.options.address);
  });

  it('enters one player', async () => {
    await lottery.methods.enter().send({
      from: accounts[1], 
      value: web3.utils.toWei('0.02', 'ether')
    })

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    })

    assert.equal(accounts[1], players[0]);
    assert.equal(1, players.length);

  });

  it('enters multiple players', async () => {
    await lottery.methods.enter().send({
      from: accounts[1], 
      value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2], 
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

  assert.equal(accounts[1], players[0]);    
  assert.equal(accounts[2], players[1]);    
    assert.equal(2, players.length);

  });


  it('requires a minimum amount of ether to enter', async() => {
     
     try {
      await lottery.methods.enter().send({
      from: accounts[1], 
      value: web3.utils.toWei('302', 'ether')
      });
    assert(false);
     } catch(exception) {
        assert(exception);
     }

  });


  it('only allows manager to pick winner', async() => {

    try {
      await lottery.methods.pickWinner().send({
        from : accounts[1]
      });

      assert(false);
    } catch(exception)  {
      assert(exception);
    }
  });

  
})
