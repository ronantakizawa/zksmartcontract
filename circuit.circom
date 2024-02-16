pragma circom 2.0.0;

include "node_modules/circomlib/circuits/comparators.circom";

template Over21() {

    signal input age;
    signal input ageLimit; 
    signal output oldEnough;
    
    component gt = GreaterThan(8);
    gt.in[0] <== age;
    gt.in[1] <== ageLimit; 
    
    oldEnough <== gt.out;
}

component main = Over21();
