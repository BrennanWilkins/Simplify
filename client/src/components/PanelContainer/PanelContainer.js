import React, { useEffect, useRef } from 'react';

const PanelContainer = props => {
  const panelRef = useRef();

  useEffect(() => {
    const handleClick = e => {
      // close panel on click outside
      if (panelRef.current.contains(e.target)) { return; }
      props.close();
    };

    if (props.show) { document.addEventListener('mousedown', handleClick); }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [props.show]);

  return (
    <div ref={panelRef}>{props.children}</div>
  );
};

export default PanelContainer;
