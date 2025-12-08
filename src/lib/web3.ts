import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseEther } from 'viem'

// Contract ABI - you'll need to generate this after compiling the contract
const contractABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_mintAmount', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export function useMintNFT() {
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const mint = (amount: number) => {
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'mint',
      args: [BigInt(amount)],
      value: parseEther((amount * 15000).toString()), // 15,000 MATIC per emerald
    })
  }

  return {
    mint,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
  }
}

export function useWallet() {
  const { address, isConnected } = useAccount()
  return { address, isConnected }
}