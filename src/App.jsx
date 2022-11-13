import React from 'react';
import styled from '@emotion/styled';
import Header from '@components/ui/Header';
import Dashboard from "@components/dashboard/Dashboard";

const StyledApp = styled.div``;


function App() {

  return (
    <StyledApp>
      <div className="container">
        <Header />
        <Dashboard />
      </div>
    </StyledApp>
  )
}

export default App
