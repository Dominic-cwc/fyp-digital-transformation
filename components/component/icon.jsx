export function IconHome(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line className="text-slate-100" x1="4" x2="20" y1="12" y2="12" />
      <line className="text-slate-100" x1="4" x2="20" y1="6" y2="6" />
      <line className="text-slate-100" x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export function IconChartbar(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

export function IconDocument(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line className="text-slate-100" x1="18" y1="6" x2="6" y2="18"></line>
      <line className="text-slate-100" x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export function IconApplyEvent(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // This will use the current text color
      stroke="currentColor"
    >
      <path d="M6,23H18a3,3,0,0,0,3-3V4a3,3,0,0,0-3-3H15a1,1,0,0,0-1,1,2,2,0,0,1-4,0A1,1,0,0,0,9,1H6A3,3,0,0,0,3,4V20A3,3,0,0,0,6,23ZM5,10h.882a1,1,0,0,0,0-2H5V4A1,1,0,0,1,6,3H8.126a4,4,0,0,0,7.748,0H18a1,1,0,0,1,1,1V8h-.882a1,1,0,0,0,0,2H19V20a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1ZM7.706,9a1,1,0,0,1,1-1h1.882a1,1,0,1,1,0,2H8.706A1,1,0,0,1,7.706,9Zm4.706,0a1,1,0,0,1,1-1h1.882a1,1,0,0,1,0,2H13.412A1,1,0,0,1,12.412,9Z" />
    </svg>
  );
}

export function IconNotifications(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // This will use the current text color for the fill
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M19.29 17.29L18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.9 0 1.34-1.08.71-1.71zM16 17H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.10 0 2-.9 2-2h-4c0 1.10.89 2 2 2z" />
    </svg>
  );
}

export function IconFlag(props) {
  return (
    <svg
      {...props} // Spreads any additional props passed to the component
      xmlns="http://www.w3.org/2000/svg" // Sets the XML namespace for SVG
      width="24" // Sets the width of the icon
      height="24" // Sets the height of the icon
      viewBox="0 0 24 24" // Defines the position and dimension of the SVG container
      fill="currentColor" // Sets the fill color to the current font color
    >
      <title>{props.title}</title>
      {/* Path for the bounding box, not visible as fill is "none" */}
      <path fill="none" d="M0 0h24v24H0V0z" />
      {/* Path for the actual notification icon */}
      <path d="M5 1.25C5.41421 1.25 5.75 1.58579 5.75 2V3.08515L7.32358 2.77043C9.11678 2.41179 10.9756 2.58245 12.6735 3.26161L13.0868 3.42693C14.3652 3.93832 15.7724 4.03382 17.1082 3.69986C18.3875 3.38005 19.4147 4.76652 18.7363 5.89719L17.4578 8.02808C17.0814 8.65542 17.021 8.78483 17.0056 8.90275C16.9972 8.96731 16.9972 9.03269 17.0056 9.09725C17.021 9.21517 17.0814 9.34458 17.4578 9.97192L19.0184 12.573C19.5884 13.5229 19.0787 14.7534 18.004 15.0221L17.9039 15.0471C15.9814 15.5277 13.9563 15.3903 12.1164 14.6543C10.6886 14.0832 9.12562 13.9397 7.61776 14.2413L5.75 14.6149V22C5.75 22.4142 5.41421 22.75 5 22.75C4.58579 22.75 4.25 22.4142 4.25 22V2C4.25 1.58579 4.58579 1.25 5 1.25ZM5.75 13.0851L7.32358 12.7704C9.11678 12.4118 10.9756 12.5825 12.6735 13.2616C14.2206 13.8805 15.9235 13.996 17.5401 13.5919L17.6402 13.5669C17.7377 13.5425 17.7839 13.4309 17.7322 13.3447L16.1716 10.7437C16.1517 10.7106 16.132 10.6779 16.1125 10.6455C15.8295 10.1756 15.5796 9.76055 15.5183 9.29176C15.493 9.09808 15.493 8.90192 15.5183 8.70824C15.5796 8.23946 15.8295 7.82441 16.1125 7.35454C16.132 7.32208 16.1517 7.28936 16.1716 7.25634L17.4254 5.16658C15.7976 5.56324 14.0861 5.4422 12.5297 4.81964L12.1164 4.65433C10.6886 4.08323 9.12562 3.93973 7.61776 4.2413L5.75 4.61485V13.0851Z" />
    </svg>
  );
}
