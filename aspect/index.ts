
import {
    allocate,
    BlockInput,
    entryPoint,
    execute,
    IPostContractCallJP,
    IPreContractCallJP,
    parseCallMethod,
    PostContractCallInput,
    PreContractCallInput,
    PreExecMessageInput,
    sys,
    uint8ArrayToHex,
} from "@artela/aspect-libs";

/**

 */
class Aspect implements IPreContractCallJP {
    /**
     *
     * @param input
     */
    preContractCall(input: PreContractCallInput): void {
        sys.log('THROTTLE start')
        let call: PreExecMessageInput
        let block: BlockInput
        if (!input.block) {
            throw new Error('missing block ')
        }
        block = input.block!

        if (!input.call) {
            throw new Error('missing contract call info ')
        }
        call = input.call!
        const interval = sys.aspect.property.get<u64>("interval")
        sys.log("THROTTLE interval: " + interval.toString())
        if (interval == 0) {
            return
        }

        const limit = sys.aspect.property.get<u64>('limit')
        const limitBy = sys.aspect.property.get<u8>("limitBy")
        const method = sys.aspect.property.get<Uint8Array>('method')

        sys.log("THROTTLE limit: " + limit.toString())
        sys.log("THROTTLE limitBy: " + limitBy.toString())
        sys.log("THROTTLE method: " + method.toString())
        const methodSig = parseCallMethod(call.data);
        sys.log("THROTTLE methodSig: " + methodSig)
        if (methodSig != uint8ArrayToHex(method, '0x')) {
            return
        }

        const contractAddress = uint8ArrayToHex(call.to);
        let prefix: string;
        if (!call.from) {
            throw new Error('missing from address')
        }
        const from = uint8ArrayToHex(call.from);
        switch (limitBy) {
            case 1:
                prefix = `${contractAddress}:${methodSig}:${from}:`
                break
            case 0:
            default:
                prefix = `${contractAddress}:${methodSig}:`
        }
        sys.log("THROTTLE prefix: " + prefix)
        const lastExecState = sys.aspect.mutableState.get<u64>(prefix + 'lastExecAt');
        if (!block.number) {
            throw new Error('missing from block number')
        }

        const lastExec = lastExecState.unwrap()
        const currentBlockNumber = block.number;
        sys.log("THROTTLE lastExec: " + lastExec.toString())
        sys.log("THROTTLE currentBlockNumber: " + currentBlockNumber.toString())

        if (lastExec) {
            if (currentBlockNumber - lastExec > interval) { // exceed interval, allow to execute
                lastExecState.set(currentBlockNumber)
            } else {
                const execTimesState = sys.aspect.mutableState.get<u64>(prefix + 'execTimes');
                let execTimes = execTimesState.unwrap() || 0

                if (execTimes && execTimes > limit) {
                    // exceed limits, not allow to execute
                    return sys.revert('exceed limit')
                }

                execTimes += 1
                execTimesState.set(execTimes)
            }
        } else {
            lastExecState.set(currentBlockNumber)
        }

        // read the throttle config from the properties and decode

        // means the allowed number of invokations to the specific method in the unit of time/blocks

        // read the last invokation time or block of specific method from the storage, if empty, means no last invokation

        // read the invokation times of specific method from storage

        // check if the invokation is allowed

        // increment the invokation times and save it to the storage

        // update the last invokation time or block of specific method to the storage


    }

    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param sender address of the transaction
     * @return true if check success, false if check fail
     */
    isOwner(sender: Uint8Array): bool {
        return false;
    }
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }

