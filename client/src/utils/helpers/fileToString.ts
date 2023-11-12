const base64MetaRegExp = /^data:[^;]+;base64,/;

const fileToString = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = e => {
			const content = e.target?.result;
			console.log('content', content);
			if (typeof content === 'string') {
				return resolve(reader.result?.toString().replace(base64MetaRegExp, ''));
			}

			if (content) {
				const dataView = new DataView(content);
				const decoder = new TextDecoder('utf-8');
				const text = decoder.decode(dataView);
				return resolve(text.replace(base64MetaRegExp, ''));
			}
		};
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});

export default fileToString;
