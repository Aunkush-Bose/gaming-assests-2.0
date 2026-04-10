import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
if (typeof window !== "undefined") {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CBX2YDCLBBZQYOMYHWRI6IYDI6V4PYVNHD7NNJRKRTCFGUKMMM34NI7B",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAJZ2V0X2Fzc2V0AAAAAAAAAgAAAAAAAAAGcGxheWVyAAAAAAATAAAAAAAAAAhhc3NldF9pZAAAABEAAAABAAAAEQ==",
            "AAAAAAAAAAAAAAAKbWludF9hc3NldAAAAAAAAwAAAAAAAAAGcGxheWVyAAAAAAATAAAAAAAAAAhhc3NldF9pZAAAABEAAAAAAAAACG1ldGFkYXRhAAAAEQAAAAA=",
            "AAAAAAAAAAAAAAAOdHJhbnNmZXJfYXNzZXQAAAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAIYXNzZXRfaWQAAAARAAAAAA=="]), options);
        this.options = options;
    }
    fromJSON = {
        get_asset: (this.txFromJSON),
        mint_asset: (this.txFromJSON),
        transfer_asset: (this.txFromJSON)
    };
}
