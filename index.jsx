import React from 'react';
import { createRoot } from 'react-dom/client';
import LiquidSilkFooter from './LiquidFooter';
import TacticalTelemetryCursor from './TacticalTelemetryCursor';
import MonolithicChronographLayer from './MonolithicChronographLayer';
import CapabilitiesStack from './CapabilitiesStack';
import SideVenturesSection from './SideVenturesSection';

const footerContainer = document.getElementById('react-footer-root');
if (footerContainer) {
  const root = createRoot(footerContainer);
  root.render(
    <>
      <MonolithicChronographLayer />
      <LiquidSilkFooter />
      <TacticalTelemetryCursor />
    </>
  );
}

const capabilitiesContainer = document.getElementById('react-capabilities-root');
if (capabilitiesContainer) {
  const dataEl = document.getElementById('stack-metrics-data');
  const metrics = dataEl ? JSON.parse(dataEl.textContent) : [];
  const root = createRoot(capabilitiesContainer);
  root.render(<CapabilitiesStack metrics={metrics} />);
}

const venturesContainer = document.getElementById('react-ventures-root');
if (venturesContainer) {
  const root = createRoot(venturesContainer);
  root.render(<SideVenturesSection />);
}
