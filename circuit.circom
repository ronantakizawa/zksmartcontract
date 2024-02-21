pragma circom 2.1.6;

include "node_modules/circomlib/circuits/comparators.circom";

template WalletCompare() {
    signal input balance1;
    signal input balance2;
    signal output isBalance1Greater;
    component gt = GreaterThan(8);
    gt.in[0] <== balance1;
    gt.in[1] <== balance2; 
   isBalance1Greater <== gt.out;
}

component main = WalletCompare();
