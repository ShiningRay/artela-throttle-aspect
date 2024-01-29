# Throttle Aspect

## Use Case Summary

**Throttle Aspect** enables contracts to limit the frequency of invokation.

**Typical Senario**:
- In airdrop, limit the per address claim frequency.
- For hot projects, protect from DDoS.

## Team Members and Roles
Team Member

1: [ShiningRay](https://github.com/ShiningRay/) - Core Dev

## Problem Addressed

In many scenarios, we do not want certain specific interfaces or methods to be frequently called, hence the concept of rate limiting is introduced. For example, in a web front-end, using a feature that triggers a search upon typing, to prevent users from frequently triggering the search, we can set a time interval. Within this interval, the user is only able to trigger the search once.

Similarly, in blockchain contexts, there are comparable scenarios. For instance, in airdrops, we don't want users to frequently claim the airdrops. Therefore, we can set a time interval, during which a user can only claim the airdrop once.

## Project Design

### Implementation

By using Aspect's `mutableState` to store method call information, and checking the frequency of method calls in the `PreContractCall` aspect, if the frequency exceeds the limit, the transaction will be interrupted.

Currently, the `FilterTx` aspect has not been implemented. If implemented, it would be possible to reject transactions that exceed the limit before they enter the memory pool. This would help reduce network stress and prevent DDoS attacks.

## Value to the Artela Ecosystem

The rate limiting feature can prevent DDoS attacks and protect network security. In scenarios such as airdrops, it can limit users from frequently claiming airdrops, thus protecting the interests of the project initiators.

## Compare to EVM Contract implementations

In the EVM (Ethereum Virtual Machine) ecosystem, rate limiting functionality can be implemented within contracts. However, if a contract has not initially considered rate limiting logic, upgrading the contract to include such functionality can be relatively cumbersome. By using Aspect, rate limiting features can be added to contracts without the need to modify the contract itself.



## TODO & Future Plans

1. Due to the current unimplemented state of Artela's `FilterTx` join point, if this could be implemented, it would be possible to reject transactions exceeding limits before they enter the Mempool, thereby reducing network stress and preventing DDoS attacks.

2. This Aspect demonstration has already specified method signatures and related rate limiting configurations through `property` at deployment. However, in practical applications, we hope:
   1. This Aspect can act as a common component, providing capabilities to different contracts.
   2. The rate limiting configurations can be dynamically modified during runtime on the blockchain.
   These objectives can be achieved through the `operation` interface.
3. Add support for rate limiting based on time units.
4. Support different rate limiting configurations for different methods.
5. Support different rate limiting configurations for different addresses.


## How to Use

Clone the repository from https://github.com/ShiningRay/artela-throttle-aspect

```bash
$ git clone https://github.com/ShiningRay/artela-throttle-aspect
```

First create an EoA

```bash
$ npm run account:create
address:  0x6B70B03B608a19Bf1817848A4C8FFF844f0Be0fB
```

Then, the script will create a private key file `privateKey.txt` in the project directory. You can also input your own private key. Record your address, and then you can apply for test coins in Artela's Discord faucet.

## Compile and deploy Contract

If you are binding the Aspect to an existing contract, you can skip this step.

```bash
$ npm run contract:build

$ npm run contract:deploy

> contract:deploy
> node scripts/contract-deploy.cjs --name Counter

from address:  0x6B70B03B608a19Bf1817848A4C8FFF844f0Be0fB
(node:87588) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
deploy contract tx hash: 0x55d445796c0bc4435e827e88ee35104205369c685d9f06bbfc42d37bd4229769
{
  blockHash: '0xb26ee4e2a2f24f1e10b13b9978ca16651f85ac862dd586770fa174dcdb325fd8',
  blockNumber: 2175119,
  contractAddress: '0x9CEAE67580eB1d82B9CeEe53e57f137f66D87d83',
  cumulativeGasUsed: 3500000,
  from: '0x6b70b03b608a19bf1817848a4c8fff844f0be0fb',
  gasUsed: 7000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash: '0x55d445796c0bc4435e827e88ee35104205369c685d9f06bbfc42d37bd4229769',
  transactionIndex: 0,
  type: '0x0'
}
contract address:  0x9CEAE67580eB1d82B9CeEe53e57f137f66D87d83
--contractAccount 0x6B70B03B608a19Bf1817848A4C8FFF844f0Be0fB --contractAddress 0x9CEAE67580eB1d82B9CeEe53e57f137f66D87d83

```

Remember the address of the last deployed contract for subsequent binding purposes.

### Compile Aspect

```bash
$ npm run aspect:build
```

After the build is complete, run the deployment script.

```bash
$ node scripts/aspect-deploy.cjs --method 0xd09de08a --interval 30 --limit 1

from address:  0x6B70B03B608a19Bf1817848A4C8FFF844f0Be0fB
sending signed transaction...
{
  blockHash: '0xdaaa2b913be2bb3007a6324b1ac81f5c824a9d61e52775f0cf300b8d66b87967',
  blockNumber: 2177337,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x6b70b03b608a19bf1817848a4c8fff844f0be0fb',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xf665be06dbd652060dda053beb599c0b9da710314d32a79b35189082f776ec58',
  transactionIndex: 0,
  type: '0x0',
  aspectAddress: '0x9AE212EFbc8935D95DD266947cDb231571c1A09e'
}
ret:  {
  blockHash: '0xdaaa2b913be2bb3007a6324b1ac81f5c824a9d61e52775f0cf300b8d66b87967',
  blockNumber: 2177337,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x6b70b03b608a19bf1817848a4c8fff844f0be0fb',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xf665be06dbd652060dda053beb599c0b9da710314d32a79b35189082f776ec58',
  transactionIndex: 0,
  type: '0x0',
  aspectAddress: '0x9AE212EFbc8935D95DD266947cDb231571c1A09e'
}
== deploy aspectID == 0x9AE212EFbc8935D95DD266947cDb231571c1A09e
```

The parameters for the deployment script are:

- `method`: The method signature.
- `interval`: The number of blocks in the rate limiting interval.
- `limit`: The maximum number of times the method can be executed in each interval.

Remember the final `aspectID` for subsequent binding.


# Binding Aspect

Run the `bind.cjs` script, and input the previously deployed contract address (or your own contract address) along with the AspectID.

```bash
$ node scripts/bind.cjs --contract <CONTRAT_ADDRESS> --aspectId <ASPECT_ID>

sending signed transaction...
{
  blockHash: '0x619117094ee0083aafdb5400891c5e293976306d112e05a58d8836b24c808e68',
  blockNumber: 2175732,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x6b70b03b608a19bf1817848a4c8fff844f0be0fb',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x59529c6cbb2658e9f8f70ae3848fd52990c2e3d96e0cf58c26b4a83e14e76f13',
  transactionIndex: 0,
  type: '0x0'
}
== aspect bind success ==
```

Then, you can execute the script to query the Aspect bound to the contract to check whether the contract has been successfully bound.

```bash
$ node scripts/get-bound-aspect.cjs --contract <CONTRAT_ADDRESS>
bound aspects : 0x9AE212EFbc8935D95DD266947cDb231571c1A09e,1,1
```

If the output displays the aforementioned AspectID, it indicates that the binding has been successful.

## Testing

The `scripts/batch-test.cjs` script will send contract transactions in batch simultaneously, which is used to test the rate limiting functionality.

```bash
$ node scripts/batch-test.cjs

#0
call contract tx hash: 0x8fbf4f2768e265045ee18a8d9c846a187656ff69b12c65776ac05958fe6ce6c9
#1
call contract tx hash: 0x7db621cbf06bed8d1569517292427ba06c65ab361ff8fc110ad2be3e6396b0c8
#2
call contract tx hash: 0x9d1c26f29a63f0b074a9743c0383a2e5d12eb3cd048627aa6cde98d9da6ad6be
#3
call contract tx hash: 0xbbc0452038fe672ad77b8acb16dc8ad7a4e12c00389aa24458762e30810b988c
#4
call contract tx hash: 0x2f678aebc6a635d490f1e306eab34a2fab9bdc3406598ed963378ccc97b40a28
#5
{
  blockHash: '0xe73887b147b24d68077b54ef4dc6d20a3682b895780c129f1c73c993c3f9f06c',
  blockNumber: 2177577,
  contractAddress: null,
  cumulativeGasUsed: 2000000,
  from: '0x6b70b03b608a19bf1817848a4c8fff844f0be0fb',
  gasUsed: 4000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x9ceae67580eb1d82b9ceee53e57f137f66d87d83',
  transactionHash: '0x8fbf4f2768e265045ee18a8d9c846a187656ff69b12c65776ac05958fe6ce6c9',
  transactionIndex: 0,
  type: '0x0'
}
call contract tx hash: 0x7db43657de0bd98ede59ece6ec54c5db1397998320cc9d4375848a04a9e19419
#6
/Users/shiningray/projects/personal/throttle-aspect/node_modules/web3-core-helpers/lib/errors.js:90
        var error = new Error(message);
                    ^

Error: Transaction has been reverted by the EVM:
{
  "blockHash": "0x81ce98a29a43349e5e23dee5e57ed6af94287f91c42eb018bdb6d92a357b7cd4",
  "blockNumber": 2177579,
  "contractAddress": null,
  "cumulativeGasUsed": 4000000,
  "from": "0x6b70b03b608a19bf1817848a4c8fff844f0be0fb",
  "gasUsed": 4000001,
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0x9ceae67580eb1d82b9ceee53e57f137f66d87d83",
  "transactionHash": "0x9d1c26f29a63f0b074a9743c0383a2e5d12eb3cd048627aa6cde98d9da6ad6be",
  "transactionIndex": 1,
  "type": "0x0"
}
    at Object.TransactionError (/Users/shiningray/projects/personal/throttle-aspect/node_modules/web3-core-helpers/lib/errors.js:90:21)
    at Object.TransactionRevertedWithoutReasonError (/Users/shiningray/projects/personal/throttle-aspect/node_modules/web3-core-helpers/lib/errors.js:101:21)
    at /Users/shiningray/projects/personal/throttle-aspect/node_modules/@artela/web3-core-method/lib/index.js:456:57
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  receipt: {
    blockHash: '0x81ce98a29a43349e5e23dee5e57ed6af94287f91c42eb018bdb6d92a357b7cd4',
    blockNumber: 2177579,
    contractAddress: null,
    cumulativeGasUsed: 4000000,
    from: '0x6b70b03b608a19bf1817848a4c8fff844f0be0fb',
    gasUsed: 4000001,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: false,
    to: '0x9ceae67580eb1d82b9ceee53e57f137f66d87d83',
    transactionHash: '0x9d1c26f29a63f0b074a9743c0383a2e5d12eb3cd048627aa6cde98d9da6ad6be',
    transactionIndex: 1,
    type: '0x0'
  }
}
```

If the script returns an error, it indicates that the rate limiter has successfully prevented the transaction from succeeding.


