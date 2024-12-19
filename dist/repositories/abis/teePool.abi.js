"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEE_POOL_ABI = void 0;
exports.TEE_POOL_ABI = [
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
        inputs: [],
        name: 'CancelDelayNotPassed',
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
        name: 'InsufficientFee',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidInitialization',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidJobStatus',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidJobTee',
        type: 'error',
    },
    {
        inputs: [],
        name: 'JobCompleted',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NoActiveTee',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NotInitializing',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NotJobOwner',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NothingToClaim',
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
        name: 'ReentrancyGuardReentrantCall',
        type: 'error',
    },
    {
        inputs: [],
        name: 'TeeAlreadyAdded',
        type: 'error',
    },
    {
        inputs: [],
        name: 'TeeNotActive',
        type: 'error',
    },
    {
        inputs: [],
        name: 'TransferFailed',
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
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'Claimed',
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
                internalType: 'uint256',
                name: 'jobId',
                type: 'uint256',
            },
        ],
        name: 'JobCanceled',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'jobId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'bidAmount',
                type: 'uint256',
            },
        ],
        name: 'JobSubmitted',
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
                internalType: 'address',
                name: 'attestator',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'jobId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'fileId',
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
                indexed: true,
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
        ],
        name: 'TeeAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
        ],
        name: 'TeeRemoved',
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
        inputs: [],
        name: 'activeTeeList',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'activeTeeListAt',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'teeAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'url',
                        type: 'string',
                    },
                    {
                        internalType: 'enum ITeePool.TeeStatus',
                        name: 'status',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'withdrawnAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'jobsCount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'publicKey',
                        type: 'string',
                    },
                ],
                internalType: 'struct ITeePool.TeeInfo',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'activeTeesCount',
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
                internalType: 'uint256',
                name: 'jobId',
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
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'url',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'publicKey',
                type: 'string',
            },
        ],
        name: 'addTee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'cancelDelay',
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
                internalType: 'uint256',
                name: 'jobId',
                type: 'uint256',
            },
        ],
        name: 'cancelJob',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'dataRegistry',
        outputs: [
            {
                internalType: 'contract IDataRegistry',
                name: '',
                type: 'address',
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
        name: 'fileJobIds',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]',
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
            {
                internalType: 'address',
                name: 'dataRegistryAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'initialCancelDelay',
                type: 'uint256',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
        ],
        name: 'isTee',
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
        inputs: [
            {
                internalType: 'uint256',
                name: 'jobId',
                type: 'uint256',
            },
        ],
        name: 'jobs',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'fileId',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'bidAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'enum ITeePool.JobStatus',
                        name: 'status',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint256',
                        name: 'addedTimestamp',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'ownerAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'teeAddress',
                        type: 'address',
                    },
                ],
                internalType: 'struct ITeePool.Job',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'jobsCount',
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
                internalType: 'bytes[]',
                name: 'data',
                type: 'bytes[]',
            },
        ],
        name: 'multicall',
        outputs: [
            {
                internalType: 'bytes[]',
                name: 'results',
                type: 'bytes[]',
            },
        ],
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
        inputs: [
            {
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
        ],
        name: 'removeTee',
        outputs: [],
        stateMutability: 'nonpayable',
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
                internalType: 'uint256',
                name: 'fileId',
                type: 'uint256',
            },
        ],
        name: 'requestContributionProof',
        outputs: [],
        stateMutability: 'payable',
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
        name: 'submitJob',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'teeFee',
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
                name: 'teeAddress',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'start',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'limit',
                type: 'uint256',
            },
        ],
        name: 'teeJobIdsPaginated',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'teeList',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'teeListAt',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'teeAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'url',
                        type: 'string',
                    },
                    {
                        internalType: 'enum ITeePool.TeeStatus',
                        name: 'status',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'withdrawnAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'jobsCount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'publicKey',
                        type: 'string',
                    },
                ],
                internalType: 'struct ITeePool.TeeInfo',
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
                internalType: 'address',
                name: 'teeAddress',
                type: 'address',
            },
        ],
        name: 'tees',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'teeAddress',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'url',
                        type: 'string',
                    },
                    {
                        internalType: 'enum ITeePool.TeeStatus',
                        name: 'status',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint256',
                        name: 'amount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'withdrawnAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'jobsCount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'string',
                        name: 'publicKey',
                        type: 'string',
                    },
                ],
                internalType: 'struct ITeePool.TeeInfo',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'teesCount',
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
                internalType: 'uint256',
                name: 'newCancelDelay',
                type: 'uint256',
            },
        ],
        name: 'updateCancelDelay',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IDataRegistry',
                name: 'newDataRegistry',
                type: 'address',
            },
        ],
        name: 'updateDataRegistry',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'newTeeFee',
                type: 'uint256',
            },
        ],
        name: 'updateTeeFee',
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
//# sourceMappingURL=teePool.abi.js.map