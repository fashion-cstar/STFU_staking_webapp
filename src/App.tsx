import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { BSC, Config, DAppProvider, Mainnet, BSCTestnet, ChainId } from "@usedapp/core"
import { Rpc_URLS } from './constants/AppConstants'
import { ThemeProvider } from "@emotion/react"
import theme from "src/theme/theme"
import Layout from 'src/common/layout/Layout'
import { RefreshContextProvider } from "src/contexts"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Staking, Home } from 'src/pages'

// mainet
const config: Config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: Rpc_URLS[ChainId.BSC] ?? '',
  },
  networks: [BSC, Mainnet, BSCTestnet],
  autoConnect: false
}

function App() {
  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <RefreshContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/staking" element={<Staking />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="*"
                  element={<Navigate to="/staking" replace />}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
          <ToastContainer />
        </RefreshContextProvider>
      </ThemeProvider>
    </DAppProvider>
  );
}

export default App;
