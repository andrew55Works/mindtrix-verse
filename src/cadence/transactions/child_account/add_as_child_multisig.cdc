import FungibleToken from  0xFungibleToken
import NonFungibleToken from 0xNonfungibleToken
import MetadataViews from  0xMetadataViews
import ChildAccount from  0xChildAccount
import Mindtrix from  0xMindtrixNFT

/// Adds the labeled child account as a Child Account in the parent accounts'
/// ChildAccountManager resource. The parent maintains an AuthAccount Capability
/// on the child's account.
/// Note that this transaction assumes we're linking an account created by a
/// ChildAccountCreator and the child account already has a ChildAccountTag.
///
transaction {

    let authAccountCap: Capability<&AuthAccount>
    let managerRef: &ChildAccount.ChildAccountManager
    let info: ChildAccount.ChildAccountInfo

    prepare(parent: AuthAccount, child: AuthAccount) {

        /* --- Configure parent's ChildAccountManager --- */
        //
        // Get ChildAccountManager Capability, linking if necessary
        if parent.borrow<&ChildAccount.ChildAccountManager>(from: ChildAccount.ChildAccountManagerStoragePath) == nil {
            // Save
            parent.save(<-ChildAccount.createChildAccountManager(), to: ChildAccount.ChildAccountManagerStoragePath)
        }
        // Ensure ChildAccountManagerViewer is linked properly
        if !parent.getCapability<&{ChildAccount.ChildAccountManagerViewer}>(ChildAccount.ChildAccountManagerPublicPath).check() {
            parent.unlink(ChildAccount.ChildAccountManagerPublicPath)
            // Link
            parent.link<
                &{ChildAccount.ChildAccountManagerViewer}
            >(
                ChildAccount.ChildAccountManagerPublicPath,
                target: ChildAccount.ChildAccountManagerStoragePath
            )
        }
        // Get a reference to the ChildAccountManager resource
        self.managerRef = parent
            .borrow<
                &ChildAccount.ChildAccountManager
            >(
                from: ChildAccount.ChildAccountManagerStoragePath
            )!

        /* --- Link the child account's AuthAccount Capability & assign --- */
        //
        // Get the AuthAccount Capability, linking if necessary
        if !child.getCapability<&AuthAccount>(ChildAccount.AuthAccountCapabilityPath).check() {
            // Unlink any Capability that may be there
            child.unlink(ChildAccount.AuthAccountCapabilityPath)
            // Link & assign the AuthAccount Capability
            self.authAccountCap = child.linkAccount(ChildAccount.AuthAccountCapabilityPath)!
        } else {
            // Assign the AuthAccount Capability
            self.authAccountCap = child.getCapability<&AuthAccount>(ChildAccount.AuthAccountCapabilityPath)
        }

        // Get the child account's Metadata which should have been configured on creation in context of this dapp
        let childTagRef = child.borrow<
                &ChildAccount.ChildAccountTag
            >(
                from: ChildAccount.ChildAccountTagStoragePath
            ) ?? panic("Could not borrow reference to ChildAccountTag in account ".concat(child.address.toString()))
        self.info = childTagRef.info

        /** --- Setup parent's Mindtrix.Collection --- */
        //
        // Set up Mindtrix.Collection if it doesn't exist
        if parent.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            let collection <- Mindtrix.createEmptyCollection()
            parent.save(<-collection, to: Mindtrix.MindtrixCollectionStoragePath)
        }
        // Check for public capabilities
        if !parent.getCapability<
                &Mindtrix.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}
            >(Mindtrix.MindtrixCollectionPublicPath).check() {
            parent.unlink(Mindtrix.MindtrixCollectionPublicPath)
            parent.link<
                &Mindtrix.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}
            >(
                Mindtrix.MindtrixCollectionPublicPath,
                target: Mindtrix.MindtrixCollectionStoragePath
            )
        }

    }

    execute {
        // Add child account if it's parent-child accounts aren't already linked
        let childAddress = self.authAccountCap.borrow()!.address
        if !self.managerRef.getChildAccountAddresses().contains(childAddress) {
            self.managerRef.addAsChildAccount(childAccountCap: self.authAccountCap, childAccountInfo: self.info)
        }
    }
}
