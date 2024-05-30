**Versione Test: Frontend MerossJS 0.0.0-X -> dd/MM/yyyy** 

### MerossJS 1.3.7 (2024-05-30) 
[Fixed] **Auth**
- Validation token fix (error on commonService)


### MerossJS 1.3.5 (2024-05-30) 
[Fixed] **obs improvements**
- Added unsubscribe to change detector subscription
- Base class rename
- Used readonly if possible

### MerossJS 1.3.0(2024-03-26) 
[Added] **Feature**
- Default image for all supported devices in home component

[Fixed] **translator**
- Saved selected language to local storage


### MerossJS 1.2.8 (2024-03-08) 

[Added] **Version Bug**
- Solved bug for version display in homepage

### MerossJS 1.2.7 (2024-02-21) 

[Added] **Badge service**
- Badge will be in queue, added deletion with debounce

### MerossJS 1.2.6 (2024-02-21) 

[Fixed] **Filters Improvements**
- Filter service general improvements


### MerossJS 1.2.5 (2024-02-06) 

[Fixed] **Improvements**
- General improvements

[Fixed] **Filter service**
- Solved a reference problem on filter retrieveInstanceByName

[Fixed] **Filter service**
- Bug fix on filter service, add initializeWithDefault method filter

[Fixed] **Authentication fix**
- Bug on UI authentication, user was checked two times if logged


### MerossJS 1.2.0 (2024-01-28) 

[Fixed] **Style fixes**
- Device style fix

[Fixed] **Style fixes**
- Device filter service improvements

[Fixed] **Filter devices**
- Fixed device filter service registration

[Added] **Filter devices**
- Introduced a new feature: the ability to filter devices via a dialog. Users can now conveniently filter devices in the list, including MSS_310H, MSS_710, MSL_120, MSS_110, MSS_210, MSS_10, MSS_530H, MSS_425E, MSG_100, MSG_200, MSH_300, MS_100, MSXH_0, using the added filter functionality.

[Added] **Multilingual Support:**
- Added support for Italian, English, French, Spanish, German, Russian, and Chinese languages. Users can now seamlessly interact with the app in their preferred language.

[Added] **Session Polling Functionality:**
- Introduced a polling feature to keep the session active. Users have the flexibility to enable or disable this function based on their preferences.