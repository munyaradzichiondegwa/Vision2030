+   1 # Administrator Guide - Zimbabwe Vision 2030 Portal
+   2 
+   3 This guide provides detailed instructions for administrators to manage and update the Zimbabwe Vision 2030 Portal.
+   4 
+   5 ## 🔐 Accessing Admin Features
+   6 
+   7 ### Activating Admin Panel
+   8 
+   9 **Keyboard Shortcut**: Press `Ctrl + Shift + A` simultaneously
+  10 
+  11 This will reveal a floating settings button (⚙️) in the bottom-right corner of the screen. Click this button to open the admin panel.
+  12 
+  13 > **Note**: The admin panel is hidden by default to prevent unauthorized access. Only share the keyboard shortcut with authorized personnel.
+  14 
+  15 ## 📊 Data Management
+  16 
+  17 ### Understanding Data Sources
+  18 
+  19 The portal supports two data source types:
+  20 
+  21 #### 1. Local JSON File (Default)
+  22 - Data is loaded from `data.json` in the application directory
+  23 - Fast loading, no internet required
+  24 - Perfect for testing and development
+  25 - Changes require editing the file directly
+  26 
+  27 #### 2. Remote API/URL
+  28 - Data fetched from external server
+  29 - Enables centralized data management
+  30 - Supports automatic updates
+  31 - Requires stable internet connection
+  32 
+  33 ### Switching Data Sources
+  34 
+  35 1. Open Admin Panel (`Ctrl + Shift + A` → Click ⚙️)
+  36 2. Navigate to "Data Source Configuration"
+  37 3. Select source type from dropdown:
+  38    - **Local JSON File**: Use bundled data.json
+  39    - **Remote API/URL**: Fetch from external source
+  40 4. If Remote API selected:
+  41    - Enter the complete URL (e.g., `https://api.vision2030.gov.zw/data.json`)
+  42    - Ensure the URL returns valid JSON
+  43    - Check CORS is enabled on the server
+  44 5. Click "Update Data Source"
+  45 6. Data will refresh automatically
+  46 
+  47 ### Manual Data Refresh
+  48 
+  49 To manually reload data from the current source:
+  50 
+  51 1. Open Admin Panel
+  52 2. Navigate to "Data Management"
+  53 3. Click "Refresh All Data"
+  54 4. Wait for confirmation message
+  55 
+  56 > **Tip**: Use this after updating data.json or when remote data has changed
+  57 
+  58 ### Exporting Data
+  59 
+  60 To download current data as a backup:
+  61 
+  62 1. Open Admin Panel
+  63 2. Navigate to "Data Management"
+  64 3. Click "Export Current Data"
+  65 4. A JSON file will download with timestamp:
+  66    - Format: `vision2030-data-YYYY-MM-DD.json`
+  67    - Use this for backups or offline editing
+  68 
+  69 ### Importing Custom Data
+  70 
+  71 To upload and apply custom data:
+  72 
+  73 1. Prepare a JSON file following the correct structure (see Data Structure section)
+  74 2. Open Admin Panel
+  75 3. Navigate to "Data Management"
+  76 4. Click "Import Data from File"
+  77 5. Select your JSON file
+  78 6. If valid, data will be applied immediately
+  79 7. If invalid, error message will display
+  80 
+  81 > **Warning**: Imported data overrides current data. Always export a backup first!
+  82 
+  83 ## 🔄 Auto-Update Configuration
+  84 
+  85 ### Enabling Auto-Update
+  86 
+  87 1. Open Admin Panel
+  88 2. Navigate to "Auto-Update Settings"
+  89 3. Toggle "Enable Auto-Update" switch
+  90 4. Additional settings will appear
+  91 
+  92 ### Configuring Update Interval
+  93 
+  94 1. Set interval in minutes (5-1440)
+  95    - Minimum: 5 minutes
+  96    - Maximum: 1440 minutes (24 hours)
+  97    - Recommended: 30 minutes for remote sources
+  98 2. Data will refresh automatically at specified intervals
+  99 3. A notification confirms each successful update
+ 100 
+ 101 ### Disabling Auto-Update
+ 102 
+ 103 1. Open Admin Panel
+ 104 2. Toggle "Enable Auto-Update" switch to OFF
+ 105 3. Automatic updates will stop immediately
+ 106 
+ 107 > **Best Practice**: Enable auto-update for remote sources, disable for local sources
+ 108 
+ 109 ## 📄 Managing Resources
+ 110 
+ 111 ### Adding New Resources
+ 112 
+ 113 1. Open Admin Panel
+ 114 2. Click "Toggle Resource Upload Panel"
+ 115 3. A form will appear at the bottom of Resources section
+ 116 4. Fill in all fields:
+ 117    - **Document Title**: Clear, descriptive name
+ 118    - **Document URL**: Full URL to PDF/document
+ 119    - **Category**: Select from dropdown
+ 120      - Reports
+ 121      - Strategy Documents
+ 122      - Infrastructure
+ 123      - Economic Data
+ 124    - **File Size**: Include units (e.g., "5.2 MB")
+ 125    - **Description**: Brief summary of document content
+ 126 5. Click "Add Resource"
+ 127 6. New resource appears at top of list
+ 128 
+ 129 ### Resource Structure
+ 130 
+ 131 Each resource should have:
+ 132 ```json
+ 133 {
+ 134   "title": "State of the Economy Presentation (Oct 2025)",
+ 135   "description": "Comprehensive economic analysis...",
+ 136   "type": "PDF",
+ 137   "size": "8.5 MB",
+ 138   "category": "Reports",
+ 139   "url": "https://zimtreasury.co.zw/documents/report.pdf",
+ 140   "local": false
+ 141 }
+ 142 ```
+ 143 
+ 144 ### Removing Resources
+ 145 
+ 146 1. Open `data.json` file
+ 147 2. Locate resource in `resources` array
+ 148 3. Delete the entire object
+ 149 4. Save file
+ 150 5. Refresh data in Admin Panel
+ 151 
+ 152 ## 📰 Updating News Items
+ 153 
+ 154 ### Adding News
+ 155 
+ 156 Edit `data.json` → `news` array:
+ 157 
+ 158 ```json
+ 159 {
+ 160   "date": "January 2025",
+ 161   "title": "New Development Milestone Achieved",
+ 162   "summary": "Detailed description of the news...",
+ 163   "category": "Economic Growth",
+ 164   "source": "Ministry of Finance"
+ 165 }
+ 166 ```
+ 167 
+ 168 ### News Categories
+ 169 
+ 170 Standard categories:
+ 171 - Economic Stability
+ 172 - Food Security
+ 173 - Industrial Growth
+ 174 - Tourism Boom
+ 175 - Policy Framework
+ 176 - Infrastructure Development
+ 177 
+ 178 > **Tip**: Keep summaries under 200 characters for best display
+ 179 
+ 180 ## 🏗️ Managing Infrastructure Projects
+ 181 
+ 182 ### Adding Projects
+ 183 
+ 184 Edit `data.json` → `infrastructure` array:
+ 185 
+ 186 ```json
+ 187 {
+ 188   "name": "New Dam Project",
+ 189   "type": "Water Security",
+ 190   "progress": 45,
+ 191   "status": "In Progress",
+ 192   "location": "Mashonaland East",
+ 193   "description": "Dam construction for water security",
+ 194   "importance": "Critical for regional water supply"
+ 195 }
+ 196 ```
+ 197 
+ 198 ### Project Types
+ 199 
+ 200 Available filter categories:
+ 201 - Water Security
+ 202 - Transport
+ 203 - Energy
+ 204 - Industrial
+ 205 
+ 206 > **Note**: Projects with `progress` field show progress bars. Omit for completed projects.
+ 207 
+ 208 ### Project Progress Updates
+ 209 
+ 210 1. Open `data.json`
+ 211 2. Find project in `infrastructure` array
+ 212 3. Update `progress` value (0-100)
+ 213 4. Update `status` if changed:
+ 214    - "In Progress"
+ 215    - "Completed"
+ 216    - "Planned"
+ 217    - "Development"
+ 218    - "Ongoing"
+ 219 5. Save and refresh data
+ 220 
+ 221 ## 📈 Updating Economic Data
+ 222 
+ 223 ### GDP and Key Indicators
+ 224 
+ 225 Edit `data.json` → `economicData`:
+ 226 
+ 227 ```json
+ 228 {
+ 229   "gdp": {
+ 230     "current": 45.7,
+ 231     "currency": "USD Billion",
+ 232     "year": 2024,
+ 233     "projected2025": 48.5,
+ 234     "growthRate2024": 2.0,
+ 235     "growthRate2025": 6.0,
+ 236     "perCapitaIncome2025": 3000
+ 237   }
+ 238 }
+ 239 ```
+ 240 
+ 241 ### Sector Data
+ 242 
+ 243 Update individual sectors:
+ 244 
+ 245 ```json
+ 246 {
+ 247   "sectors": [
+ 248     {
+ 249       "name": "Manufacturing",
+ 250       "gdpContribution": 15.3,
+ 251       "growth": 200,
+ 252       "investments": 1400000000,
+ 253       "capacityUtilization": 57.3
+ 254     }
+ 255   ]
+ 256 }
+ 257 ```
+ 258 
+ 259 > **Important**: Changes to sector data affect both charts and sector cards. Ensure consistency.
+ 260 
+ 261 ## 🤖 Configuring Live Assistant
+ 262 
+ 263 ### Bot Selection
+ 264 
+ 265 Edit `data.json`:
+ 266 
+ 267 ```json
+ 268 {
+ 269   "liveSessionsEnabled": true,
+ 270   "aiAssistantBot": "Claude-Sonnet-4.5"
+ 271 }
+ 272 ```
+ 273 
+ 274 Available bots:
+ 275 - `Claude-Sonnet-4.5` (Recommended)
+ 276 - `GPT-4o`
+ 277 - `GPT-4o-mini`
+ 278 
+ 279 ### Customizing Quick Questions
+ 280 
+ 281 Edit `index.html` → Live Assistant section:
+ 282 
+ 283 ```html
+ 284 <button onclick="askQuestion('Your question here')">
+ 285   Button Text
+ 286 </button>
+ 287 ```
+ 288 
+ 289 Add up to 6 quick question buttons for common queries.
+ 290 
+ 291 ## 🎨 Visual Customization
+ 292 
+ 293 ### Updating Statistics Banner
+ 294 
+ 295 Edit `index.html` → Key Statistics Banner section:
+ 296 
+ 297 1. Locate stat cards (lines ~177-202)
+ 298 2. Update values and labels
+ 299 3. Change icons by modifying Font Awesome classes
+ 300 4. Adjust colors via Tailwind gradient classes
+ 301 
+ 302 ### Chart Data Updates
+ 303 
+ 304 Charts automatically pull from `data.json`:
+ 305 
+ 306 - **GDP Chart**: Uses `economicData.gdp` data
+ 307 - **Sector Chart**: Uses `economicData.sectors` array
+ 308 - **Inflation Chart**: Uses hardcoded values (update in JavaScript section)
+ 309 
+ 310 To update Inflation Chart:
+ 311 1. Open `index.html`
+ 312 2. Find Inflation Chart section (~line 1283)
+ 313 3. Update `labels` and `data` arrays
+ 314 4. Save and refresh
+ 315 
+ 316 ## 💾 Backup and Recovery
+ 317 
+ 318 ### Creating Backups
+ 319 
+ 320 **Method 1: Export via Admin Panel**
+ 321 1. Open Admin Panel
+ 322 2. Click "Export Current Data"
+ 323 3. Save file with meaningful name
+ 324 4. Store securely
+ 325 
+ 326 **Method 2: Manual File Copy**
+ 327 1. Copy `data.json` file
+ 328 2. Rename with version/date
+ 329 3. Store in backup folder
+ 330 
+ 331 ### Restoring from Backup
+ 332 
+ 333 1. Open Admin Panel
+ 334 2. Click "Import Data from File"
+ 335 3. Select backup file
+ 336 4. Confirm restoration
+ 337 
+ 338 ### Best Practices
+ 339 
+ 340 - Create backup before major updates
+ 341 - Keep last 3-5 versions
+ 342 - Test backups in development environment
+ 343 - Document changes in version notes
+ 344 
+ 345 ## 🔍 Troubleshooting
+ 346 
+ 347 ### Data Not Updating
+ 348 
+ 349 **Problem**: Changes to data.json don't appear
+ 350 
+ 351 **Solutions**:
+ 352 1. Clear browser cache (Ctrl + Shift + Del)
+ 353 2. Use "Refresh Data" in Admin Panel
+ 354 3. Check JSON validity with JSONLint
+ 355 4. Verify file is saved in correct location
+ 356 5. Check browser console for errors
+ 357 
+ 358 ### Import Fails
+ 359 
+ 360 **Problem**: "Invalid data format" error
+ 361 
+ 362 **Solutions**:
+ 363 1. Validate JSON structure with online validator
+ 364 2. Ensure all required fields present
+ 365 3. Check for trailing commas
+ 366 4. Verify quotes are straight, not curly
+ 367 5. Use exported data as template
+ 368 
+ 369 ### Remote Data Not Loading
+ 370 
+ 371 **Problem**: Remote URL doesn't fetch data
+ 372 
+ 373 **Solutions**:
+ 374 1. Test URL directly in browser
+ 375 2. Check CORS headers on server
+ 376 3. Verify URL is HTTPS (not HTTP)
+ 377 4. Ensure JSON content-type header
+ 378 5. Check network tab in DevTools
+ 379 
+ 380 ### Admin Panel Not Appearing
+ 381 
+ 382 **Problem**: Ctrl+Shift+A doesn't work
+ 383 
+ 384 **Solutions**:
+ 385 1. Ensure all three keys pressed simultaneously
+ 386 2. Try on different keyboard
+ 387 3. Check browser console for errors
+ 388 4. Verify app.js is loaded
+ 389 5. Refresh page and try again
+ 390 
+ 391 ## 📱 Mobile Administration
+ 392 
+ 393 While full admin features work on mobile:
+ 394 
+ 395 **Limitations**:
+ 396 - Keyboard shortcut may not work (no Ctrl key)
+ 397 - Small screen makes editing difficult
+ 398 - File imports may be restricted
+ 399 
+ 400 **Recommendations**:
+ 401 - Use desktop for major updates
+ 402 - Mobile for quick data refreshes
+ 403 - Test mobile view after updates
+ 404 
+ 405 ## 🔒 Security Best Practices
+ 406 
+ 407 ### Access Control
+ 408 
+ 409 1. **Limit Distribution**: Only share keyboard shortcut with authorized staff
+ 410 2. **Screen Recording**: Disable when admin panel is open
+ 411 3. **Public Displays**: Never leave admin panel visible
+ 412 4. **Session Security**: Log out when finished (close panel)
+ 413 
+ 414 ### Data Validation
+ 415 
+ 416 Before importing data:
+ 417 1. Scan for malicious code
+ 418 2. Validate JSON structure
+ 419 3. Test in development environment
+ 420 4. Review all changes carefully
+ 421 5. Keep backup of previous version
+ 422 
+ 423 ### Remote Sources
+ 424 
+ 425 When using remote data:
+ 426 1. Use HTTPS only
+ 427 2. Verify SSL certificates
+ 428 3. Implement API authentication
+ 429 4. Monitor access logs
+ 430 5. Rate limit requests
+ 431 
+ 432 ## 📊 Monitoring and Analytics
+ 433 
+ 434 ### Data Last Updated
+ 435 
+ 436 Check metadata in exported data:
+ 437 
+ 438 ```json
+ 439 {
+ 440   "metadata": {
+ 441     "lastUpdated": "2025-01-15T10:00:00Z",
+ 442     "version": "2.0"
+ 443   }
+ 444 }
+ 445 ```
+ 446 
+ 447 ### Update History
+ 448 
+ 449 Maintain a changelog:
+ 450 
+ 451 ```
+ 452 Version 2.1 - 2025-01-15
+ 453 - Updated GDP data for Q4 2024
+ 454 - Added 3 new infrastructure projects
+ 455 - Revised NDS1 achievements
+ 456 
+ 457 Version 2.0 - 2025-01-01
+ 458 - Major restructure of economic data
+ 459 - New category system for resources
+ 460 ```
+ 461 
+ 462 ## 🎓 Training Resources
+ 463 
+ 464 ### For New Administrators
+ 465 
+ 466 1. **Week 1**: Familiarize with structure
+ 467    - Explore admin panel features
+ 468    - Practice exporting/importing
+ 469    - Review data.json structure
+ 470 
+ 471 2. **Week 2**: Make test updates
+ 472    - Update a news item
+ 473    - Modify project progress
+ 474    - Add a resource
+ 475 
+ 476 3. **Week 3**: Full management
+ 477    - Configure auto-updates
+ 478    - Switch data sources
+ 479    - Perform backups
+ 480 
+ 481 ### Common Tasks Checklist
+ 482 
+ 483 **Weekly**:
+ 484 - [ ] Update news items
+ 485 - [ ] Review project progress
+ 486 - [ ] Check for data accuracy
+ 487 
+ 488 **Monthly**:
+ 489 - [ ] Update economic indicators
+ 490 - [ ] Add new resources
+ 491 - [ ] Create backup
+ 492 - [ ] Review auto-update logs
+ 493 
+ 494 **Quarterly**:
+ 495 - [ ] Comprehensive data review
+ 496 - [ ] Update sector information
+ 497 - [ ] Revise program achievements
+ 498 - [ ] Archive old news items
+ 499 
+ 500 ## 📞 Support
+ 501 
+ 502 For administrator support:
+ 503 
+ 504 - **Technical Issues**: Document and report via feedback form
+ 505 - **Data Questions**: Contact Ministry of Finance
+ 506 - **Feature Requests**: Submit through official channels
+ 507 
+ 508 ---
+ 509 
+ 510 **Remember**: With great power comes great responsibility. Always verify data accuracy before publishing updates!