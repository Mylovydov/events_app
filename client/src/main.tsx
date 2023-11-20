import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'normalize.css';
import MainProvider from './providers/main/Main.provider.tsx';
import { fontAwesome } from '@/fontAwesome';

fontAwesome.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MainProvider />
	</React.StrictMode>
);
