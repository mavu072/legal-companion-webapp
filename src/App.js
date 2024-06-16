import * as React from 'react';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { AppContext } from './v2/context-provider/Context';
import ResponsiveChatUI from './v2/chat/chatUI';
import SnackBarNotification from './components/notification/SnackBar';

function App() {
  const { user } = React.useContext(AppContext);

  return (
    <>
      { user ? <SnackBarNotification message={`Authenticated as ${user.displayName ? user.displayName : user.email}.`} />
      : <SnackBarNotification message={`Using a guest profile.`} /> }
      <ResponsiveChatUI />
    </>
  );
}

library.add(fas);
library.add(fab);

export default App;