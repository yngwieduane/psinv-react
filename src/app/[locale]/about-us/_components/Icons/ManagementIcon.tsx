import React from 'react';

interface IconProps {
  // You can add props here if needed, like size, color, etc.
}

const ManagementIcon: React.FC<IconProps> = () => {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '50px',
        width: '58px',
        height: '58px',
        display: 'inline-block',
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect x="0.0200195" y="0.800781" width="39" height="39" fill="url(#pattern0_626_3094)"/>
        <defs><pattern id="pattern0_626_3094" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_626_3094" transform="scale(0.01)"/></pattern>
            <image id="image0_626_3094" width="100" height="100" xlinkHref="data:image/png;base64,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"/>
        </defs>
      </svg>
    </div>
  );
};

export default ManagementIcon;