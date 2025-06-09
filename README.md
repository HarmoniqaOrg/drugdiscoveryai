# DrugDiscovery AI Web Interface

This repository contains a minimal web interface for interacting with the **DrugDiscovery AI** agent hosted on Langbase.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set your API key**
   Export the `LANGBASE_API_KEY` environment variable with your Langbase key:
   ```bash
   export LANGBASE_API_KEY=YOUR_KEY_HERE
   ```
3. **Run the development server**
   ```bash
   npm start
   ```
4. Open your browser at [http://localhost:3000](http://localhost:3000) and submit a query.

The server proxies requests to the Langbase agent so your API key is kept secret.
