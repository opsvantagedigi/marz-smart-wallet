// Minimal shim for @alchemy/aa-alchemy used at build time to avoid bundler errors.
// This file is aliased in next.config.mjs so the real package is never analyzed
// by webpack during the build. At runtime, dynamic imports may still load the
// real package if available; this shim keeps the build safe.

exports.createModularAccountAlchemyClient = async function (opts) {
  return {
    getAddress: async () => `shim-${Date.now().toString(36).slice(-8)}`,
    // stub other methods as needed
  };
};

exports.createClient = exports.createModularAccountAlchemyClient;
