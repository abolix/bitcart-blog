---
title: BitcartCC Versions 0.3.0.0 and 0.0.0.4 are out!
img: https://github.com/bitcartcc/bitcart-media/raw/master/logo.png
author: MrNaif2018
category: releases
createdAt: "2021-04-06T22:32:41"
---

BitcartCC Versions 0.3.0.0 and 0.4.0.0 released!

BitcartCC Configurator and one-domain support: install BitcartCC from other instances without any
technical knowledge!

This article is describing both updates, as they are both focused on improving deployment experience.

### Major updates

These updates contain numerous changes, some of which are not backwards-compatible

### Completely improved docker deployment

We now test if deployment works in our automated systems, so that it will always work

Set up formatting and proper linting

Major improvements to the setup scripts:

New scripts:

- `restart.sh`, to restart the server
- `changedomain.sh`, to change domain (usage: `./changedomain.sh newdomain.tld`)

Added more validation to `setup.sh` (i.e. it is not possible to enter an invalid host anymore)

Added ability to change the root path where service is running by setting `BITCART_SERVICE_ROOTPATH` (i.e. `BITCART_STORE_ROOTPATH`)

Added new settings to configure nginx reverse proxy:

- `REVERSEPROXY_HTTP_PORT` - the http port nginx is running on (default 80)
- `REVERSEPROXY_HTTPS_PORT` - the https port nginx is running on (443)
- `REVERSEPROXY_DEFAULT_HOST` - the host to be served by default from server ip (default: none)

Overall generator refactor

### One domain support

Existing deployments will be unaffected.

If reverse proxy is enabled and `BITCART_ADMIN_HOST` and `BITCART_STORE_HOST` and `BITCART_ADMIN_API_URL` and `BITCART_STORE_API_URL` are all unset, one domain mode is enabled.

For one domain mode, only one setting is used: `BITCART_HOST`.

It will determine the only domain bitcartcc will run on.

The 3 main services will run under different routes.

There is a root service, running at domain root. The root service is selected in the following order (if available): store, admin, api

By default, assuming `BITCART_HOST` was `bitcart.local`:

- the store will run on `bitcart.local`
- admin on `bitcart.local/admin`
- api on `bitcart.local/api`

Everything will be configured to work on one domain.

To enable one domain mode for existing deployments:

```bash
unset BITCART_ADMIN_HOST
unset BITCART_STORE_HOST
unset BITCART_ADMIN_URL
unset BITCART_STORE_URL
./setup.sh
```

### Breaking change to improve readability

The following environment variables were renamed to reduce confusion:

- `BITCART_ADMIN_URL` -> `BITCART_ADMIN_API_URL`
- `BITCART_STORE_URL` -> `BITCART_STORE_API_URL`
- `BITCART_ADMIN_ONION_URL` -> `BITCART_ADMIN_API_ONION_URL`
- `BITCART_STORE_ONION_URL` -> `BITCART_STORE_API_ONION_URL`

Please set them in order for your deployment to work

### BitcartCC Configurator

Those releases have introduced the BitcartCC Configurator.

BitcartCC Configurator is an application in your admin panel, allowing to install new BitcartCC instances (via ssh or manually generated script) or to re-configure your own instance with ease.

Just enter needed settings and you will get a copiable script, or the configurator will automagically deploy the new instance for you.

By default it can be accessed by anonymous users.

Added a new server policy to make it available for authorized users only (default: False)

In Remote deployment mode, there is a button "Load settings", which will connect to the server via SSH and fill in it's settings in the form fields.

It is possible to change current instance's settings via admin panel's configurator.

Editing current instance settings (and pre-loading them via configurator) is only available to server admins.

By clicking on current instance mode, if you are server admin, your current settings will be loaded and filled in the form fields.

<script async src="https://telegram.org/js/telegram-widget.js?14" data-telegram-post="bitcartcc/3967" data-width="100%"></script>

The app will automatically connect to your server via SSH and apply new settings.

Note: it is not possible to view deployment log when updating your current instance, as the process performing the update gets restarted.

Note: for that to work you should have working SSH support, see below.

Note that even though configurator should fit most use cases, if you are not using one-domain mode, or if you have some completely custom and complex use-case, possibly involving multiple deployments on the same server, you should better use setup scripts from CLI.

### Breaking: SSH support in setup scripts

Old method of executing commands on the host (for maintenance purposes, like updating the server) is no longer used.

It means that there will be no listener process started anymore.

Instead, both maintenance commands and configurator's current instance mode use SSH support.

When running `./setup.sh`, BitcartCC configures itself to use system host keys.

On first startup, it generates an SSH key, and adds it to the list of trusted keys in the host (usually `~/.ssh/authorized_keys`)

That way, it can connect to the host via ssh, which is a way better way of executing commands, which opens doors to new possibilities.

Note: SSH support is only enabled when `BITCART_ENABLE_SSH` is set to true, by default it is so.

Note: SSH support requires an ssh server (`openssh-server`/`sshd`) to be running on the host machine.

**IMPORTANT:** For existing deployments, after updating, for future updates to work, you will need to re-run `./setup.sh`

### Other improvements

- Fix cleanup command
- Fix bugs in configurator
- Improve wallet loading logic in BitcartCC Core daemons
- Added support for build-time environment variables to docker-compose generator
- Maintenance updates for dependencies
- Fixed underpaid amounts calculation
- Fixed stats refresh in the admin panel
- Made the tor services page more clear
- Added ability to make email optional on store POS
- Improved additional components handling in the docker deployment, and added ability to preview settings

<script async src="https://telegram.org/js/telegram-widget.js?14" data-telegram-post="bitcartcc/3945" data-width="100%"></script>

### Migration guide

Those 2 new updates have introduced lots of new features which make the installation easy for both newcomers and existing users.

But there are a few backwards-incompatible changes between versions, as described above.

Summary:

If you are upgrading from versions earlier than 0.0.0.3, you have to migrate your environment variables. You have two ways:

1. Switch to one-domain mode, by unsetting all `_HOST` and `_URL` variables and setting `BITCART_HOST` only, see [One domain support](#one-domain-support)
2. Continue using the default mode before 0.0.0.3: rename your `_URL` variables to `_API_URL` ones, see [Breaking change to improve readability](#breaking-change-to-improve-readability)

And in both cases, you should re-run `./setup.sh`, in order for SSH setup to work.

From now on, you probably will never ever need to SSH to your server!

These updates have finalized our efforts to improve deployment experience. One of the categories to resolve in our roadmap is done!

Enjoy the update!
