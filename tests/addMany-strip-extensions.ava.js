import fs from 'fs';
import path from 'path';
import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const { test, mockPath, testSrcPath, nodePlop } = (new AvaTest(__filename));


var plop;
var multipleAdds;
test.before(async () => {
	plop = await nodePlop(`${mockPath}/plopfile.js`);
	multipleAdds = plop.getGenerator('add-many-strip-extensions');
});

test.before(() => {
	return multipleAdds.runActions({ name: 'John Doe' });
});

test('Check that all files generated without hbs extension', t => {
	const expectedFiles = [
		'remove-hbs/john-doe-my-view.js',
		'remove-hbs/john-doe-my-view.spec.js',
	];
	expectedFiles.map((file) => {
		const filePath = path.resolve(testSrcPath, file);
		t.true(fs.existsSync(filePath), `Can't resolve ${filePath}`);
	});
});

test('Check that all files generated with all extensions removed', t => {
	const expectedFiles = [
		'remove-all/my-view.spec',
		'remove-all/my-view.spec.js',
	];
	expectedFiles.map((file) => {
		const filePath = path.resolve(testSrcPath, file);
		t.true(fs.existsSync(filePath), `Can't resolve ${filePath}`);
	});
});
