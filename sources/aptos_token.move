module echo::main {
    use aptos_framework::event;
    use aptos_framework::object::{Self, ExtendRef, Object};
    use aptos_token_objects::collection;
    use aptos_token_objects::token::{Token, Self};
    use std::option::{Self, Option};
    use std::signer::address_of;
    use std::string::{String, utf8};
    use std::vector;
    use aptos_framework::type_info::type_of;
    /// Echo not exist at given address
    const EECHO_NOT_EXIST: u64 = 1;

    const APP_OBJECT_SEED: vector<u8> = b"AptKnow";
    const ECHO_COLLECTION_NAME: vector<u8> = b"AptKnow Knowledge Base";
    const ECHO_COLLECTION_DESCRIPTION: vector<u8> = b"AptKnow Collection is a decentralized knowledge repository on Aptos, where each Knowledge Avatar (KA) is represented by a unique NFT. These NFTs signify ownership of a knowledge base and grant the holder full control over its access, monetization, and evolution.";
    const ECHO_COLLECTION_URI: vector<u8> = b"https://echo-seven-wheat.vercel.app/";

    struct QueryTask has key, store {
        id: u64,
        nft_address: address,
        description: String,
        created_at: u64,
        status: u8,
        result: Option<String>,
        owner: address,
    }

    struct EchoParts has copy, drop, key, store {
        body: u8,
        ear: u8,
        face: u8,
    }

    struct Echo has key {
        parts: EchoParts,
        extend_ref: ExtendRef,
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
        coin_type: address,
        per_search_fee: u64,
        documents: vector<DocumentInfo>,
        change_log: vector<ChangeLog>,
        whitelist: vector<WhitelistEntry>,
        description: String,
        owner: address,
    }

    struct DocumentInfo has copy, drop, store {
        name: String,
        hash: vector<u8>,
        size: u64,
    }

    struct ChangeLog has copy, drop, store {
        action: u8, // 1: insert, 2: delete
        doc_info: DocumentInfo,
        timestamp: u64,
    }

    struct WhitelistEntry has copy, drop, store {
        user_address: address,
        usage_count: u64,
    }

    #[event]
    struct MintEchoEvent has drop, store {
        echo_address: address,
        token_name: String,
    }

    // Tokens require a signer to create, so this is the signer for the collection
    struct CollectionCapability has key {
        extend_ref: ExtendRef,
    }

    // This function is only called once when the module is published for the first time.
    fun init_module(account: &signer) {
        let constructor_ref = object::create_named_object(
            account,
            APP_OBJECT_SEED,
        );
        let extend_ref = object::generate_extend_ref(&constructor_ref);
        let app_signer = &object::generate_signer(&constructor_ref);

        move_to(app_signer, CollectionCapability {
            extend_ref,
        });

        create_echo_collection(app_signer);
    }

    fun get_collection_address(): address {
        object::create_object_address(&@echo, APP_OBJECT_SEED)
    }

    fun get_collection_signer(collection_address: address): signer acquires CollectionCapability {
        object::generate_signer_for_extending(&borrow_global<CollectionCapability>(collection_address).extend_ref)
    }

    fun get_echo_signer(echo_address: address): signer acquires Echo {
        object::generate_signer_for_extending(&borrow_global<Echo>(echo_address).extend_ref)
    }

    // Create the collection that will hold all the Echo
    fun create_echo_collection(creator: &signer) {
        let description = utf8(ECHO_COLLECTION_DESCRIPTION);
        let name = utf8(ECHO_COLLECTION_NAME);
        let uri = utf8(ECHO_COLLECTION_URI);

        collection::create_unlimited_collection(
            creator,
            description,
            name,
            option::none(),
            uri,
        );
    }

    // Create an Echo token object.
    // Because this function calls random it must not be public.
    // This ensures user can only call it from a transaction instead of another contract.
    // This prevents users seeing the result of mint and act on it, e.g. see the result and abort the tx if they don't like it.
    entry fun create_echo(
        user: &signer,
        name: String,
        body: u8,
        ear: u8,
        face: u8,
        fa_address: address,
        per_search_fee: u64,
        description: String
    ) acquires CollectionCapability {
        let uri = utf8(ECHO_COLLECTION_URI);
        // let description = utf8(ECHO_COLLECTION_DESCRIPTION);
        let parts = EchoParts {
            body,
            ear,
            face,
        };

        let collection_address = get_collection_address();
        let constructor_ref = &token::create(
            &get_collection_signer(collection_address),
            utf8(ECHO_COLLECTION_NAME),
            description,
            name,
            option::none(),
            uri,
        );

        let token_signer_ref = &object::generate_signer(constructor_ref);
        let extend_ref = object::generate_extend_ref(constructor_ref);
        let mutator_ref = token::generate_mutator_ref(constructor_ref);
        let burn_ref = token::generate_burn_ref(constructor_ref);
        let transfer_ref = object::generate_transfer_ref(constructor_ref);
        let documents = vector::empty<DocumentInfo>();
        let change_log = vector::empty<ChangeLog>();
        let whitelist = vector::empty<WhitelistEntry>();

        // Initialize and set default Echo struct values
        let echo = Echo {
            parts,
            extend_ref,
            mutator_ref,
            burn_ref,
            coin_type: fa_address,
            per_search_fee,
            documents,
            change_log,
            whitelist,
            description,
            owner: address_of(user),
        };
        move_to(token_signer_ref, echo);

        // Emit event for minting Echo token
        event::emit(
            MintEchoEvent {
                echo_address: address_of(token_signer_ref),
                token_name: name,
            },
        );

        // Transfer the Echo to the user
        object::transfer_with_ref(object::generate_linear_transfer_ref(&transfer_ref), address_of(user));
    }

    entry fun add_document(
        echo_address: address,
        // docs: vector<DocumentInfo>, // name, hash, size
        doc_name: String,
        doc_hash: vector<u8>,
        doc_size: u64,
        timestamp: u64
    ) acquires Echo {
        let echo = borrow_global_mut<Echo>(echo_address);

        let len = vector::length(&echo.documents);
        for (i in 0..len) {
            let existing_doc = vector::borrow(&echo.documents, i);
            assert!(existing_doc.hash != doc_hash, 2);
        };

        let new_doc = DocumentInfo {
            name: doc_name,
            hash: doc_hash,
            size: doc_size,
        };

        vector::push_back(&mut echo.documents, new_doc);

        let change = ChangeLog {
            action: 1, // 1: insert
            doc_info: new_doc,
            timestamp,
        };
        vector::push_back(&mut echo.change_log, change);

    }

    entry fun remove_documents(
        echo_address: address,
        doc_hashes: vector<vector<u8>>,
        timestamp: u64
    ) acquires Echo {
        let echo = borrow_global_mut<Echo>(echo_address);
        let found = false;
        let len = vector::length(&doc_hashes);
        for (i in 0..len) {
            let doc_hash = vector::borrow(&doc_hashes, i);

            let doc_len = vector::length(&echo.documents);
            for (j in 0..doc_len) {
                if (vector::borrow(&echo.documents, j).hash == *doc_hash) {
                    let delete_doc = vector::swap_remove(&mut echo.documents, j);

                    found = true;

                    let change = ChangeLog {
                        action: 2, // 2 : delete
                        doc_info: delete_doc,
                        timestamp,
                    };
                    vector::push_back(&mut echo.change_log, change);
                    break;
                }
            };
        };
        assert!(found, 3);
    }

    // entry fun increment_usage_count<CoinType>(
    //     echo_address: address,
    //     user: &signer,
    // ) acquires Echo {
    //     let echo = borrow_global_mut<Echo>(echo_address);
    //     let amount = echo.per_search_fee
    //     let owner_address = echo.owner;
    //     aptos_framework::coin::transfer<CoinType>(user, owner_address, amount);

    //     let len = vector::length(&echo.whitelist);
    //     let found = false;
    //     for (i in 0..len) {
    //         let entry = vector::borrow(&echo.whitelist, i);
    //         if (entry.user_address == address_of(user)) {
    //             found = true;
    //             break;
    //         }
    //     };

    //     if (!found) {
    //         let new_entry = WhitelistEntry {
    //             user_address: address_of(user),
    //             usage_count: 0,
    //         };
    //         vector::push_back(&mut echo.whitelist, new_entry);
    //     };

    //     for (i in 0..len) {
    //         let entry = vector::borrow_mut(&mut echo.whitelist, i);
    //         if (entry.user_address == address_of(user)) {
    //             entry.usage_count = entry.usage_count + 1;
    //             break;
    //         }
    //     };
    // }

    // Get collection name of Echo collection
    #[view]
    public fun get_ECHO_COLLECTION_NAME(): (String) {
        utf8(ECHO_COLLECTION_NAME)
    }

    // Get creator address of Echo collection
    #[view]
    public fun get_echo_collection_creator_address(): (address) {
        get_collection_address()
    }

    // Get collection ID of Echo collection
    #[view]
    public fun get_echo_collection_address(): (address) {
        let collection_name = utf8(ECHO_COLLECTION_NAME);
        let creator_address = get_collection_address();
        collection::create_collection_address(&creator_address, &collection_name)
    }

    // Returns all fields for this Echo (if found)
    #[view]
    public fun get_echo(echo_obj: Object<Token>): (String, EchoParts, String, vector<DocumentInfo>, vector<ChangeLog>, vector<WhitelistEntry>, address, address, u64) acquires Echo {
        let echo_address = object::object_address(&echo_obj);
        assert!(object::object_exists<Token>(echo_address), EECHO_NOT_EXIST);
        let echo = borrow_global<Echo>(echo_address);
        (token::name<Token>(echo_obj), echo.parts, echo.description, echo.documents, echo.change_log, echo.whitelist, echo.coin_type, echo.owner, echo.per_search_fee)
    }

    #[view]
    public fun get_bound_coin(echo_address: address): address acquires Echo {
        let echo = borrow_global<Echo>(echo_address);
        echo.coin_type
    }

    // #[view]
    // public fun get_nft_address_by_coin(coin_address: address): Option<address> acquires Echo {
    //     let collection_address = get_collection_address();
    //     let collection_objects = collection::get_all_objects<Token>(collection_address);

    //     let len = vector::length(&collection_objects);
    //     for (i in 0..len) {
    //         let token_obj = vector::borrow(&collection_objects, i);
    //         let echo_address = object::object_address(token_obj);
    //         if (object::object_exists<Echo>(echo_address)) {
    //             let echo = borrow_global<Echo>(echo_address);
    //             if (echo.coin_type == coin_address) {
    //                 return option::some(echo_address);
    //             }
    //         }
    //     };

    //     option::none()
    // }

    #[view]
    public fun get_whitelist(
        echo_address: address
    ): vector<WhitelistEntry> acquires Echo {
        let echo = borrow_global<Echo>(echo_address);
        echo.whitelist
    }

    // #[view]
    // public fun get_whitelisted_nfts(
    //     user_address: address
    // ): vector<address> acquires Echo {
    //     let collection_address = get_collection_address();
    //     let collection_objects = collection::get_all_objects<Token>(collection_address);

    //     let result = vector::empty<address>();

    //     let len = vector::length(&collection_objects);
    //     for (i in 0..len) {
    //         let token_obj = vector::borrow(&collection_objects, i);
    //         let echo_address = object::object_address(token_obj);
    //         if (object::object_exists<Echo>(echo_address)) {
    //             let echo = borrow_global<Echo>(echo_address);

    //             let whitelist_len = vector::length(&echo.whitelist);
    //             for (j in 0..whitelist_len) {
    //                 let addr = vector::borrow(&echo.whitelist, j);
    //                 if (*addr == user_address) {
    //                     vector::push_back(&mut result, echo_address);
    //                     break;
    //                 }
    //             }
    //         }
    //     };

    //     result
    // }
}
