---
title: BitcartCC Version 0.5.0.0 is out!
img: https://github.com/bitcartcc/bitcart-blog/raw/master/assets/img/bitcartcc-0500.png
author: MrNaif2018
category: releases
createdAt: "2021-06-04T16:04:13"
---

BitcartCC Version 0.5.0.0 is out! Refactors, bugfixes, quality of life improvements and better BitcartCC!

### Major update

This update contains many backwards-incompatible changes

This update is the biggest of all the time, with over 5000 line additions and deletions, more than 121 files changed.

It has finished most of the parts of our Backend Improvements in our roadmap.

There are lots of internal improvements, not all changes are user-facing, but there are lots of critical bug fixes and quality improvements.

This update also fixes some not very critical, but security issues, upgrade is recommended to everyone.

This update starts the era of refreshed, lighter and better BitcartCC.
New features should now be added way faster due to amount of work done on improving maintenance work

There should be no action required to upgrade, everything will be performed automatically.
If it has failed, please let us know.

This changelog contains quite a bit of additional technical information than usual due to the nature of this update.

### Major refactor of all our backend code

We have re-organized all our code into their corresponding directories, so it is now less cluttered, even more readable and easier to add new features (i.e. `crud.py` into `crud` directory, `utils.py` into `utils` directory, utils are now split into files by their category)

All the endpoints were re-organized into logical sub-urls.
See breaking changes below for more information on how to migrate.

Improved texts handling in the database

All imports now use absolute names, code is more readable

Added new utilities for database management and made all the code use it, it will allow easier database access from plugins (to be added later) and scripts.

This allowed us to greatly reduce code duplication, and in the process we found and fixed many bugs.

For example, loading related invoice's products, or store's wallets and notifications is now done automatically, as well as updating references in the database. Before it was duplicated and had some bugs.

As all database access is now done by those functions, in the future we may add additional events or logs for those queries to be used by scripts

In the future those refactors will allow us to batch insert needed data, greatly improving performance for stores with many wallets connected, for example

### Test suite rewriten from scratch, new regtest tests added

Our test suite was rewritten from scratch, now each test doesn't depend on each other, which means that our tests are fully correct and can't pass while some issue still exists.

So now if one test fails the whole test suite doesn't fail with it together.

Improved tests helped us indentify many bugs.

We now have added regtest functional tests which help us test the pay flow, here's how it is done:

We run tests in an isolated environment (fresh database) in regtest network

The test creates a store, then sets transaction_speed (we test all variants), creates an invoice, pays it from the full node

Beforehand it starts a simple http server, sets notification_url to that server's url. Server on POST request just sends it's message later on, and then we check that two IPNs were sent in each case: `paid` status, and `complete` status

That way the whole payment processing workflow is now tested

We now test invoice response structure (i.e. payment methods) better

We now test different validation we have better

Improved CI testing process, it is now possible to publicly view test reports by anyone

Our SDK is now tested in 3 python versions instead of one, with regtest tests running on the base BitcartCC version (currently python 3.7)

### Breaking: Unique string ID

Now all objects IDs are strings.

All previous IDs will remain the same.

Newly generated IDs will be generated from a cryptographically secure source.

This change is breaking, but has been requested for a while, because it greatly improves privacy. It is no longer possible to sequentically scan for all wallet's addresses by opening checkout pages with IDs from 1 to N. It is also not possible to know the exact number of invoices on an instance.

Object id length is 22 for invoices and products, and 32 for other products.

As IDs are now longer than few characters, in the admin panel, for object ids with length > 22 they will be truncated and it will be possible to copy them on click

Payment methods order is now fully guaranteed by having a created date, existing data should be migrated automatically (but the created date of existing methods will not match the actual date)

As All object IDs are now strings, not integers, you should remove integer checks and conversions in your calls to API.

Existing ids will be returned as strings, so instead of id 42 you will receive id "42"

All upgrades should be performed automatically

As unique id is now in place, existing deployments will be unaffected, but on new deployments, the first created store by server admin becomes the default store at the store POS. Before that, store POS displays no store.

### Important security fixes

Before it was possible to create a store with wallets current user doesn't own from API. It didn't leak privacy, but that was allowed. This issue is now fixed.

There was added a check that ensures that all related objects (i.e. wallets connected to store, products connected to invoice, etc) are owned by the current user.

Otherwise, a HTTP 403 Forbidden code is returned and operation is cancelled.

Also, it was possible to create products on store current user does not own, and other similar issues. Unfortunately there were quite a lot of such.

All access control issues were fixed, upgrade is recommended.

We try our best to build the most secure software possible, but we need your help. The bigger our community becomes, the more developers will be available to audit our code and help us identify some issues quickly.

As sometimes it's hard to find unpredictable behaviour in your own code.

Tests were added to proove that no such issues will arise in the future.

### Quality of life improvements

- Improved PATCH methods: to update objects from API no fields are required, there is no need to pass unnecessary fields (`user_id`, `wallets`) to just change store's name for example! Before it was impossible to update objects from API without additional API call to fetch those requires fields. Some fields required weren't required even on object creation. This shouldn't be an issue now.
- Added IPN sending logs: on success it will say that sending IPN succeeded, otherwise it will log an error message to help diagnose issues
- Added better pagination in admin panel to easily navigate between pages. The pagination buttons allow you to jump to the first, last page and some pages inbetween instead of constantly clicking "next" button.

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/4090" data-width="100%"></script>

<script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-post="bitcartcc/4091" data-width="100%"></script>

### Breaking: removed PUT http method

We have Removed PUT http methods because they weren't used and not tested enough, therefore they could lead to unexpected issues if used.

Also see the PATCH method improvements

### Breaking: renamed endpoints

Due to our refactors and re-organization, here's a list of renamed endpoints:

`/rate` -> `/cryptos/rate`

`/fiatlist` -> `/cryptos/fiatlist`

`/categories` -> `/products/categories`

`/services` -> `/tor/services`

`/updatecheck` -> `/update/check`

`/crud/stats` -> `/users/stats`

`/wallet_history` -> `/wallets/history`

Note: it is no longer possible to open `/wallets/history/0` to get wallet history for all wallets on your account, added a new endpoint for that:

`/wallets/history/all`

### Misc changes

- Fixed search in admin panel in pages other than invoices page
- Fixed objects template editing
- Better logo rendering in dark mode
- New SDK method: get_invoice to get lightning invoice data
- Fixed rare bug with error on editing store checkout settings
- Fixed an issue with wallet's xpub validation not always running when creating from API
- PATCH: fixed issues with modifying store checkout settings from API, changes only changed settings, others remain unaffected (before they were reset to defaults)
- Disallowed modifying invoice products after creation
- When creating notification providers, we now validate that notification provider selected is supported, otherwise the operation is cancelled (to avoid issues with not-existing providers on invoice completion)
- Fixed policies update endpoints' returning incorrect response data (fields not updated) sometimes
- Fixed an issue where /wallet_history returned wallet history of all wallets on a server, not of current user
- Fixed bitcart-cli builds

### Migration guide

Even though the update contains many changes, all changes should be applies automatically.

If BitcartCC fails to start, check `docker logs compose_backend_1` if it's telling something like

`psycopg2.errors.UndefinedObject: constraint "discountsxproducts_discount_id_discounts_fkey" of relation "discountsxproducts" does not exist`

If so, it probably means that your BitcartCC instance exists for a while. But don't worry! Without stopping anything, just run our migration helper:

`contrib/upgrade/upgrade-to-0500.sh` in root bitcart-docker directory

It should fix all the issues
