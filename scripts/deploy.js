const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log("Deploying contracts with the account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  const EmeraldStandard = await ethers.getContractFactory("EmeraldStandard")
  const baseURI = "ipfs://YOUR_METADATA_FOLDER_CID/" // Replace with your IPFS metadata folder CID
  const contract = await EmeraldStandard.deploy(baseURI)

  await contract.deployed()

  console.log("EmeraldStandard deployed to:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })