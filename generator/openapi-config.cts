import type { ConfigFile } from '@rtk-query/codegen-openapi'

// Tests APIs
const config: ConfigFile = {
	schemaFile: '../src/features/Test/openapi.json',
	apiFile: '../src/features/Test/test.api.ts',
	apiImport: 'testApi',
	outputFile: '../src/features/Test/test-v2.api.ts',
	exportName: 'testApiV2',
	hooks: true,
}

export default config;