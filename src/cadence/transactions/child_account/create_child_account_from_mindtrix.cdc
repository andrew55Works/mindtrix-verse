import ChildAccount from 0xChildAccount
import MetadataViews from 0xMetadataViews

/// This transaction creates an account using the signer's ChildAccountCreator,
/// funding creation via the signing account and adding the provided public key.
/// A ChildAccountTag resource is saved in the new account, identifying it as an
/// account created under this construction. This resource also holds metadata
/// related to the purpose of this account.
/// Additionally, the ChildAccountCreator maintains a mapping of addresses created
/// by it indexed on the originatingpublic key. This enables dapps to lookup the
/// address for which they hold a public key.
///
transaction(
    pubKey: String,
    fundingAmt: UFix64,
    childAccountName: String,
    childAccountDescription: String,
    clientIconURL: String,
    clientExternalURL: String
  ) {

	prepare(signer: AuthAccount) {
		// Save a ChildAccountCreator if none exists
		if signer.borrow<&ChildAccount.ChildAccountCreator>(from: /storage/ChildAccountCreatorTestV2) == nil {
			signer.save(<-ChildAccount.createChildAccountCreator(), to: /storage/ChildAccountCreatorTestV2)
		}
		// Link the public Capability so signer can query address on public key
		if !signer.getCapability<&{ChildAccount.ChildAccountCreatorPublic}>(/public/ChildAccountCreatorTestV2).check() {
			signer.unlink(/public/ChildAccountCreatorTestV2)
			signer.link<
				&{ChildAccount.ChildAccountCreatorPublic}
			>(
				/public/ChildAccountCreatorTestV2,
				target: /storage/ChildAccountCreatorTestV2
			)
		}
		// Get a reference to the ChildAccountCreator
		let creatorRef = signer.borrow<&ChildAccount.ChildAccountCreator>(
				from: /storage/ChildAccountCreatorTestV2
			) ?? panic("Problem getting a ChildAccountCreator reference!")
		// Construct the ChildAccountInfo metadata struct
    let info = ChildAccount.ChildAccountInfo(
          name: childAccountName,
          description: childAccountDescription,
          clientIconURL: MetadataViews.HTTPFile(url: clientIconURL),
          clienExternalURL: MetadataViews.ExternalURL(clientExternalURL),
          originatingPublicKey: pubKey
        )
		// Create the account, passing signer AuthAccount to fund account creation
		// and add initialFundingAmount in Flow if desired
    let newAccount: AuthAccount = creatorRef.createChildAccount(
        signer: signer,
        initialFundingAmount: fundingAmt,
        childAccountInfo: info
	    )
		// At this point, the newAccount can further be configured as suitable for
		// use in your dapp (e.g. Setup a Collection, Mint NFT, Configure Vault, etc.)
		// ...
	}
}
