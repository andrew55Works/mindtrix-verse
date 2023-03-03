
# Mindtrix Verse

---

![](https://firebasestorage.googleapis.com/v0/b/mindtrix-dev.appspot.com/o/public%2F2023-0228-vienna-woods%2Fmindtrix_verse_cover_1200_630.png?alt=media&token=e997e0f5-663d-49c6-b6e9-2e5fab57cfe6)
Mindtrix Verse aims to gamify the podcast community to catch users' eyes and provide an easy payment system to onboard them into Web3.
## Key features
1. Credit Card Payment with Dapper Wallet
2. Walletless onboarding with Google SSO
3. Stable Coin Payment with USDC and FUSD
4. A fun, interactive, and scalable 3D world for podcast communities

## Links
1. Live Demo: https://alpha-app.mindtrix.xyz/world/vienna-woods
2. Video Demo: https://youtu.be/abgnmh0RvhQ
3. Flow Hackathon Portfolio: https://devfolio.co/projects/mindtrix-verse-c461  

## Cadence Contracts
Contracts are deployed on `Testnet`

|Type|Name|Address|Purpose|
|-------|-------|-------|-------|
|Contract|Mindtrix.cdc|[0xd162b02676d63c36](https://f.dnz.dev/0xd162b02676d63c36/Mindtrix)| Mindtrix NFT
|Contract|MindtrixTemplate.cdc|[0xd162b02676d63c36](https://f.dnz.dev/0xd162b02676d63c36/MindtrixTemplate)| For minting Pack NFT
|Contract|ChildAccount.cdc|[0x2504de96b27963fe](https://f.dnz.dev/0x2504de96b27963fe/ChildAccount)|Add `ChildAccountCreated` event for indexing the newly created address by mapping its public key to off-chain DB

## Challenges we ran into
For development, Walletless Onboarding is the tough one for new Web3 developers like us. We separate the building process into parts: getting SSO info from the front end, generating key pairs, multisign from the backend, and sending transactions of creating a child account with the emulator. Though we successfully connected the individual parts, we still suffer from the last one: getting the created child account’s address. We are yet to develop a feature to get the real-time on-chain address from the off-chain service as soon as the child account is created. Currently, we deploy a webhook to receive event indexing, and the user will wait for 10 sec to fetch their child account info. It would be nice if anyone could kindly share faster solutions on this. Furthermore, we understand Walletless Onboarding aims to abstract payment flow; however, it’s difficult for us to find an online credit card payment provider for NFT purchasing without KYC. A possible way we may try to sell an IRL product and then mint the NFT to users as a digital receipt. For now, we recommend the user utilize Credit Card Payment with Dapper Wallet.

When integrating 3D objects into the web, we notice performance issues causing browser freeze. One of our conducted solutions is to replace the realistic water reflection shader with a low-poly effect. For another, we’re trying to reduce the number of 3D surfaces. Assuming that a circle needs 32 surfaces for the best effect of an otter face, we will reduce it to 24. Though people are hard to aware of the difference between the two, the size of the file And web page load is reduced a lot. In the future, we know we have to continue optimizing the performance to provide a product-ready 3D experience.


## Getting Started

### Configuring .env 
For anyone wants to start the project, please configure variables in `.env.staging`. 
They're for some key third-party services, such as [Firebase Auth](https://firebase.google.com/docs/auth) for Google SSO, [Dapper Wallet](https://meetdapper.com/developers) Merchant Address for Credit Card Payment. 

### Installing Dependencies
```bash
yarn install
```

### Running the development server:

```bash
yarn watch:staging
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

----

If you guys have any good ideas on Mindtrix Verse, please contact [andrewshen@mindtrix.xyz](andrewshen@mindtrix.xyz) 📧



