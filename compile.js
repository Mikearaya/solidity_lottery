const path = require('path');
const fs = require('fs');
const solc = require('solc');


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Task': {
          content: source,
       },
    },
    settings: { 
        outputSelection: {
            '*': {
                '*': ['abi',"evm.bytecode"],   
             // here point out the output of the compiled result
            },
        },
    },
});

const ex = JSON.parse(solc.compile(jsonContractSource)).contracts['Task']['Inbox'];


module.exports = ex;


