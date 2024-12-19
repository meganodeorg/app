"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_REGISTRY_ABI = void 0;
exports.DATA_REGISTRY_ABI = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'target',
                type: 'address',
            },
        ],
        name: 'AddressEmptyCode',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'implementation',
                type: 'address',
            },
        ],
        name: 'ERC1967InvalidImplementation',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ERC1967NonPayable',
        type: 'error',
    },
    {
        inputs: [],
        name: 'EnforcedPause',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ExpectedPause',
        type: 'error',
    },
    {
        inputs: [],
        name: 'FailedInnerCall',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidInitialization',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NotFileOwner',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NotInitializing',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
    },
    {
        inputs: [],
        name: 'UUPSUnauthorizedCallContext',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'slot',
                type: 'bytes32',
            },
        ],
        name: 'UUPSUnsupportedProxiableUUID',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'ownerAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'url',
                type: 'string',
            },
        ],
        name: 'FileAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint64',
                name: 'version',
                type: 'uint64',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferStarted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'Paused',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'PermissionGranted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'proofIndex',
                type: 'uint256',
            },
        ],
        name: 'ProofAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'Unpaused',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'implementation',
                type: 'address',
            },
        ],
        name: 'Upgraded',
        type: 'event',
    },
    {
        inputs: [],
        name: 'UPGRADE_INTERFACE_VERSION',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'url',
                type: 'string',
            },
        ],
        name: 'addFile',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'key',
                type: 'string',
            },
        ],
        name: 'addFilePermission',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'url',
                type: 'string',
            },
            {
                internalType: 'address',
                name: 'ownerAddress',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'account',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'key',
                        type: 'string',
                    },
                ],
                internalType: 'struct IDataRegistry.Permission[]',
                name: 'permissions',
                type: 'tuple[]',
            },
        ],
        name: 'addFileWithPermissions',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'bytes',
                        name: 'signature',
                        type: 'bytes',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'score',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'dlpId',
                                type: 'uint256',
                            },
                            {
                                internalType: 'string',
                                name: 'metadata',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'proofUrl',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'instruction',
                                type: 'string',
                            },
                        ],
                        internalType: 'struct IDataRegistry.ProofData',
                        name: 'data',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct IDataRegistry.Proof',
                name: 'proof',
                type: 'tuple',
            },
        ],
        name: 'addProof',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'filePermissions',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'fileProofs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'bytes',
                        name: 'signature',
                        type: 'bytes',
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'score',
                                type: 'uint256',
                            },
                            {
                                internalType: 'uint256',
                                name: 'dlpId',
                                type: 'uint256',
                            },
                            {
                                internalType: 'string',
                                name: 'metadata',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'proofUrl',
                                type: 'string',
                            },
                            {
                                internalType: 'string',
                                name: 'instruction',
                                type: 'string',
                            },
                        ],
                        internalType: 'struct IDataRegistry.ProofData',
                        name: 'data',
                        type: 'tuple',
                    },
                ],
                internalType: 'struct IDataRegistry.Proof',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
        ],
        name: 'files',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'ownerAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'url',
                        type: 'string',
                    },
                    {
                        internalType: 'uint256',
                        name: 'addedAtBlock',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct IDataRegistry.FileResponse',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'filesCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'ownerAddress',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'paused',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pendingOwner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'proxiableUUID',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newImplementation',
                type: 'address',
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'version',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
];
//# sourceMappingURL=dataRegistryContract.abi.js.map