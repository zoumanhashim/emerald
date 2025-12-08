import { ethers } from 'ethers'

// Contract ABI - you'll need to generate this after compiling the contract
const contractABI = [
  // Add the ABI here after compiling
]

const contractAddress = process.env.CONTRACT_ADDRESS!

export const getContract = (signer?: ethers.Signer) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(contractAddress, contractABI, signer || provider)
  return contract
}

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed')
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  return signer
}

export const mintNFT = async (amount: number) => {
  const signer = await connectWallet()
  const contract = getContract(signer)

  const tx = await contract.mint(amount)
  await tx.wait()
  return tx
}