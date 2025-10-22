# Zimbabwe Vision 2030 Portal

A comprehensive, modern web application showcasing Zimbabwe's journey to Vision 2030 through the TSP, NDS1, and NDS2 development programs. Features dynamic data management, interactive visualizations, live Q&A assistance, and administrative capabilities.

## 🌟 Features
### 📊 Economic Data & Visualization
- **Interactive Charts**: GDP growth trajectories, sector contribution breakdowns, and inflation trends
- **Real-time Statistics**: Live economic indicators displayed prominently
- **Dynamic Updates**: Data automatically refreshes from local or remote sources

### 🏗️ Infrastructure Progress Tracker
- **Real-time Project Monitoring**: Track completion status of major infrastructure projects
- **Filterable View**: Filter projects by type (Water Security, Transport, Energy, Industrial)
- **Progress Bars**: Visual indicators showing project completion percentages
- **New: Province Filtering & Map**: Click province buttons to filter projects; view on interactive Mapbox map with GeoJSON from ZIMSTAT.

### 📚 Resources & Downloads
- **Document Library**: Access official reports, strategy documents, and publications
- **Dynamic Loading**: Resources loaded from JSON data source (local or remote e.g., zimtreasury.co.zw)
- **Admin Upload**: Authorized users can add new resources

### 🤖 Live Q&A Assistant
- **AI-Powered Chat**: Integrated with Poe Embed API using Claude-Sonnet-4.5 (enhanced with Grok for real-time search from IMF/ZIMSTAT/gov sites—no static responses)
- **Quick Questions**: Pre-configured common questions for instant answers
- **Contextual Responses**: Assistant has access to current economic data
- **Fallback Mode**: Poe/Claude if Grok unavailable

### 💬 Feedback & Contact
- **Contact Form**: Submit feedback, suggestions, or technical issues (now sends to WhatsApp +263713794347)
- **Local Storage**: Feedback saved locally (can be configured for backend submission)
- **Contact Information**: Easy access to official government contact details
- **New: Social Links**: Facebook, LinkedIn, X, YouTube in footer.

### ⚙️ Admin Panel (Advanced Features)
#### Data Source Management
- **Local JSON**: Load data from `data.json` file
- **Remote API**: Fetch data from external URL
- **Switchable Sources**: Toggle between local and remote data sources
- **Auto-Update**: Configurable automatic data refresh intervals (5-1440 minutes)

#### Data Management Tools
- **Refresh Data**: Manual refresh button to reload all data
- **Export Data**: Download current data as JSON file
- **Import Data**: Upload and apply custom JSON data file
- **Resource Upload**: Add new documents to the resource library

#### Access Control
- **Keyboard Shortcut**: Press `Ctrl + Shift + A` to toggle admin panel visibility
- **Hidden by Default**: Admin features remain invisible to regular users

## New: Investor's Guide
- Dynamic cards for sectors with "Learn More" overlays showing progress/opportunities from data.json.

## 📁 File Structure