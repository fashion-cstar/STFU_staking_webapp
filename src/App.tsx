import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { BSC, Config, DAppProvider, Mainnet, BSCTestnet, ChainId } from "@usedapp/core"
import { Rpc_URLS } from './constants/AppConstants'
import { ThemeProvider } from "@emotion/react"
import theme from "src/theme/theme"
import Layout from 'src/common/layout/Layout'
import { NFTProvider, NFTStakingProvider, RefreshContextProvider, StakingProvider, StakingProviderV2 } from "src/contexts"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Staking, NFTStaking, Home } from 'src/pages'

// mainet
const config: Config = {
  // readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: Rpc_URLS[ChainId.BSC] ?? '',
    [BSCTestnet.chainId]: Rpc_URLS[ChainId.BSCTestnet] ?? ''
  },
  // networks: [BSC, Mainnet, BSCTestnet],
  autoConnect: false
}

function App() {
  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <RefreshContextProvider>
          <StakingProvider>
            <StakingProviderV2>
              <NFTProvider>
                <NFTStakingProvider>
                  <BrowserRouter>
                    <Layout>
                      <Routes>
                        <Route path="/staking" element={<Staking />} />
                        <Route path="/nft_staking" element={<NFTStaking />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                          path="*"
                          element={<Navigate to="/staking" replace />}
                        />
                      </Routes>
                    </Layout>
                  </BrowserRouter>
                </NFTStakingProvider>
                <ToastContainer />
              </NFTProvider>
            </StakingProviderV2>
          </StakingProvider>
        </RefreshContextProvider>
      </ThemeProvider>
    </DAppProvider>
  );
}

export default App;
