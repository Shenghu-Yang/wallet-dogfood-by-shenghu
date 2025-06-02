# wallet-dogfood-by-shenghu

## How to run the quickstart code:

1: Before anything else, init a repo by running npm init in an empty directory

2: Create a file named index.ts and put the code from the quickstart guide into it.

3: Install tsx, the TypeScript executor: npm i --save-dev tsx

4: Run the code: npx tsx index.ts

## How to get the UserOps information after submission

cast run <AA_BUNDLE_TXN_HASH> -r $ARB_SEPOLIA_RPC_URL

e.g. cast run 0xd6c1724c7f7735bb1276731c04a38eb4410bfeaf8f23976a284406afcb1696c3 -r $ARB_SEPOLIA_RPC_URL
