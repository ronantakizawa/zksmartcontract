**Zero-Knowledge ID Check**

Using a ZK-Snark, this age verification app checks if you are older than 21 without the client or server ever storing or knowing your age.

Yes you read that right. 

The code will never know your age.

Using zksnarkjs and the Plonk ZK-Snark Algorithm, the client converts your input and runs a DAG arithmetic circuit in WASM to present a mathmatical proof of your age to verify.

More on ZK-Snarks: https://z.cash/learn/what-are-zk-snarks/

More on Plonk: https://eprint.iacr.org/2019/953.pdf
