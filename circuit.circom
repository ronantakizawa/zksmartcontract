pragma circom 2.1.6;

include "node_modules/circomlib/circuits/comparators.circom";

template Over21() {
    signal input age;
    signal output oldEnough;
    component gt = GreaterThan(8);
    gt.in[0] <== age;
    gt.in[1] <== 20; 
    oldEnough <== gt.out;
}

component main = Over21();
