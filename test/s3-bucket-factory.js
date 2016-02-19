'use strict';

const test = require('ava');

const s3 = require('../lib/s3-bucket-factory.js')();

test('it should have the bucket name pre-configured', t => t.ok(s3.config.params.Bucket));
