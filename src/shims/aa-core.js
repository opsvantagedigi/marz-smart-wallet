// Minimal shim for @alchemy/aa-core used at build time.
// Export a LocalAccountSigner-like API expected by our dynamic code.

exports.LocalAccountSigner = {
  mnemonicToAccountSigner: function (mnemonic) {
    return {
      getAddress: async () => `shim-${Date.now().toString(36).slice(-8)}`,
      address: `shim-${Date.now().toString(36).slice(-8)}`,
    };
  },
};

exports.localAccountSigner = exports.LocalAccountSigner;
