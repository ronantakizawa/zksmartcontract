const proofComponent = document.getElementById('proof');
const resultComponent = document.getElementById('result');
const bGenProof = document.getElementById("bGenProof");
const ansComponent = document.getElementById("answer");
const ageInput = document.getElementById("ageInput"); // Get the age input element

bGenProof.addEventListener("click", calculateProof);

async function calculateProof() {
    // Use the age from the input field
    const age = ageInput.value;

    const { proof, publicSignals } =
      await snarkjs.plonk.fullProve({age: parseInt(age)}, "./circuit.wasm", "circuit_final.zkey");

    proofComponent.innerHTML = JSON.stringify(proof, null, 1);

    const vkey = await fetch("verification_key.json").then(function(res) {
        return res.json();
    });

    const res = await snarkjs.plonk.verify(vkey, publicSignals, proof);

    resultComponent.innerHTML = res ? "Verification successful" : "Verification failed";

    const ans = publicSignals[0]==="0" ? "Under 21" : "Over 21"
    ansComponent.innerText = ans
}
