export type TAuthDto = {
	email: string;
	password: string;
};

export type TGenerateResult = {
	accessToken: string;
	refreshToken: string;
};
