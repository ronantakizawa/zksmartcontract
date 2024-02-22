const snarkjs = require("snarkjs");
const {Web3} = require('web3');
const ABI = require('./ABI.json');
require("dotenv").config();
const BigNumber = require('bignumber.js');


async function run() {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
          process.env.INFURA_URL,
        ),
      );
      const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.WALLET_PRIVATE_KEY
      );
      const contract = new web3.eth.Contract( ABI, process.env.CONTRACT_ADDRESS);
      web3.eth.accounts.wallet.add(signer);

      const balance1Wei = await web3.eth.getBalance(signer.address);
      const balance2Wei = await web3.eth.getBalance(process.env.TEST_WALLET);
      
      const balance1 = Math.round(web3.utils.fromWei(balance1Wei, 'ether')*1000);
      const balance2 = Math.round(web3.utils.fromWei(balance2Wei, 'ether')*1000);
      




    const { proof, publicSignals } = await snarkjs.plonk.fullProve({ balance1: BigInt(balance1), balance2: BigInt(balance2) }, "circuit.wasm", "circuit_final.zkey");
    

    const ans = publicSignals[0] === "0" ? "Wallet 2" : "Wallet 1";
    console.log(ans);

    const zkproof= await snarkjs.plonk.exportSolidityCallData(proof, publicSignals);
    const parts = zkproof.split('][');
    const proofArray = JSON.parse(parts[0] + ']');
    const pubSignalsArray = JSON.parse('[' + parts[1]);
    

    try {
        const output = await contract.methods.verifyProof(proofArray, pubSignalsArray).call();
        console.log(output ? "ZK Proof Successful and On-Chain!" : "There was an issue logging the ZKP");

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    
}
run()

