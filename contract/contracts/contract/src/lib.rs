#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Address, Map};

#[contract]
pub struct GamingAssets;

#[contractimpl]
impl GamingAssets {

    // Mint a new asset for a player
    pub fn mint_asset(env: Env, player: Address, asset_id: Symbol, metadata: Symbol) {
        player.require_auth();

        let mut assets: Map<Symbol, Symbol> =
            env.storage().instance().get(&player).unwrap_or(Map::new(&env));

        assets.set(asset_id, metadata);

        env.storage().instance().set(&player, &assets);
    }

    // Transfer asset between players (FIXED)
    pub fn transfer_asset(env: Env, from: Address, to: Address, asset_id: Symbol) {
        from.require_auth();

        let mut from_assets: Map<Symbol, Symbol> =
            env.storage().instance().get(&from).unwrap_or(Map::new(&env));

        // FIX: clone asset_id before multiple use
        let metadata = from_assets
            .get(asset_id.clone())
            .expect("Asset not found");

        from_assets.remove(asset_id.clone());
        env.storage().instance().set(&from, &from_assets);

        let mut to_assets: Map<Symbol, Symbol> =
            env.storage().instance().get(&to).unwrap_or(Map::new(&env));

        to_assets.set(asset_id, metadata);
        env.storage().instance().set(&to, &to_assets);
    }

    // Get asset metadata
    pub fn get_asset(env: Env, player: Address, asset_id: Symbol) -> Symbol {
        let assets: Map<Symbol, Symbol> =
            env.storage().instance().get(&player).unwrap_or(Map::new(&env));

        assets.get(asset_id).expect("Asset not found")
    }
}