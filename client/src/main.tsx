import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'normalize.css';
import { fontAwesome } from '@/fontAwesome';
import { MainProvider } from '@/providers';
fontAwesome.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MainProvider />
	</React.StrictMode>
);
