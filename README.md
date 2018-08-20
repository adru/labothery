This is the REPO for TrueBlue's Loyalty DEMO app



SETUP FOR NEW PROJECTS.


APPLE DEV CONSOLE
https://developer.apple.com/account/overview.action
> To create app, activate push, download provisioningprofile for PhoneGap

1. Identifiers > App IDs > +
App ID Description: [Name]
Explicit App ID: guru.trueblue.[name]
[check] Push Notifications

2. Certificates > All > +
Apple Push Notification service SSL (Sandbox) / Apple Push Notification service SSL (Production)
App ID: [choose]
Upload CertificateSigningRequest.certSigningRequest
- found in Dropbox/True Blue Marketing/Product/Development/Apple iTunes/iOS Certificates/CertificateSigningRequest.certSigningRequest
Generate, Download aps_development.cer / aps_production.cer

3. Provisioning Profiles > All > +
iOS App Development / App Store
App ID: [choose]
Select certificates: [Select All]
Select devices: [Select All]
Profile Name: [name] Development / Distribution
Generate, Download developer / distribution.mobileprovision

4. Terminal to generate PEM development/distribution
Generate Certificate: openssl x509 -in [name]_aps_development.cer -inform der -out [name]_devCert.pem
Generate PEM: cat [name]_devCert.pem ios_devKey.pem > [name]_dev.pem
- found in Dropbox/True Blue Marketing/Product/Development/Apple iTunes/iOS Certificates/ios_devKey.pem
Test: openssl s_client -connect gateway.sandbox.push.apple.com:2195 -cert [name]_devCert.pem -key [name]_dev.pem
Pass: trueblueguru
Database: client.apn_key = [name].pem
Upload _dev PEM to dev.trueblue.guru/applications/certs/[name].pem (remove _dev after upload)


GOOGLE DEV CONSOLES
https://console.developers.google.com/project/
https://play.google.com/apps/publish/
> To create app, activate push, keystore?

1. Create Project > https://console.developers.google.com/project/
[Project Name]
[Project ID]

2. APIs & auth
APIs > Enable: Distance Matrix API, Google Cloud Messaging for Android, Google Maps Javascript API v3
Credentials > Public API access > Create new Key: Server Applications, Browser Applications
Database: client.gcm_key = Key for server applications
index.html: Key for browser applications

3. + Add new application > https://play.google.com/apps/publish/
Title: [Name]
Prepare Store Listing

4. Services & APIs
Link a sender ID: Key for server applications
app.js: Linked Sender ID (app id created in console.dev)



app.js

:6 - $rootScope.clientId = client id
> TrueBlue.db, create new client

:7 - $rootScope.GCMSenderID = Linked Sender ID
> https://console.developers.google.com/project/ > Overview > Project Number

:14 - $rootScope.backTitle = "Menu"
> When on the products page, what is it that it goes back to?

:15 - $rootScope.backSearch = "the menu"
> When searching, what are you searching?


index.html

~:199 - Google Maps API Key javascript
> use Browser Application API Key



PREPARATION FOR PRODUCTION
:9 - API Path
> change all to live.trueblue.guru

Upload PEM to live.trueblue.guru/applications/certs/[name].pem (remove _dis after upload)

DbHandler.php > executeAPNPush > switch to production ssl