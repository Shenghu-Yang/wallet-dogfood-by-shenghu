import { createSmartWalletClient } from "@account-kit/wallet-client";
import { alchemy, arbitrumSepolia } from "@account-kit/infra";
import { LocalAccountSigner } from "@aa-sdk/core";
import { createPublicClient } from "viem";
import { zeroAddress } from "viem";

async function main() {
  // Create a Smart Account Client
  const signer = LocalAccountSigner.privateKeyToAccountSigner(
    "0xa1d5b3e79f9f0323783a92a2d0d49ea728f85dc354f3a21f2f270d4e76a64c37"
  );

  console.log("\nSigner Address:", signer.getAddress());

  const transport = alchemy({
    apiKey: "",
  });

  const client = createSmartWalletClient({
    transport,
    chain: arbitrumSepolia,
    mode: "remote",
    signer,
  });

  // Request the account
  const account = await client.requestAccount();

  // Get the address
  const address = account.address;
  console.log("\nSmart Account Address:", address);

  // // Sign a message
  // const message = "Hello World!";
  // const signature = await client.signMessage({ message });

  // // Verify the signature
  // const publicClient = createPublicClient({
  //   chain: arbitrumSepolia,
  //   transport: transport,
  // });

  // const isValid = await publicClient.verifyMessage({
  //   address: account.address,
  //   message,
  //   signature,
  // });

  // console.log("\nSignature valid:", isValid);

  const preparedUO = await client.prepareCalls({
    calls: [{ to: zeroAddress, value: "0x0" }], // callData is optional in a "data" parameter
    from: account.address,
    // "capabilities" is a data structure that hold gas manager data (as seen below) or permission data
    capabilities: {
      paymasterService: {
        policyId: "PM-POLICY-ID-HERE", // put your gas manager policy ID here
      },
    },
  });

  console.log("\nPrepared User Operation:", preparedUO);

  // Sign the userOp
  const signature = await client.signSignatureRequest(
    preparedUO.signatureRequest
  );

  console.log("\nSignature:", signature);

  // Send the userOp
  const result = await client.sendPreparedCalls({
    ...preparedUO,
    signature,
  });

  console.log("\nResult:", result);
}

main();
