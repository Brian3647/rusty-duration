import { test, expect, describe } from 'bun:test';

import { Duration, NANOS_PER_SEC, MILLIS_PER_SEC, MICROS_PER_SEC } from './lib';

describe('Duration', () => {
	test('fromSecs', () => {
		const d = Duration.fromSecs(1);
		expect(d.asSecs()).toBe(1);
		expect(d.asMilis()).toBe(1000);
		expect(d.asMicros()).toBe(1000000);
		expect(d.asNanos()).toBe(1000000000);
	});

	test('fromMilis', () => {
		const d = Duration.fromMilis(1);
		expect(d.asSecs()).toBe(0);
		expect(d.asMilis()).toBe(1);
		expect(d.asMicros()).toBe(1000);
		expect(d.asNanos()).toBe(1000000);
	});

	test('fromMicros', () => {
		const d = Duration.fromMicros(1);
		expect(d.asSecs()).toBe(0);
		expect(d.asMilis()).toBe(0);
		expect(d.asMicros()).toBe(1);
		expect(d.asNanos()).toBe(1000);
	});

	test('fromNanos', () => {
		const d = Duration.fromNanos(1);
		expect(d.asSecs()).toBe(0);
		expect(d.asMilis()).toBe(0);
		expect(d.asMicros()).toBe(0);
		expect(d.asNanos()).toBe(1);
	});

	test('add', () => {
		const d1 = Duration.fromSecs(1);
		const d2 = Duration.fromMilis(500);
		const d3 = d1.add(d2);
		expect(d3.asSecs()).toBe(1);
		expect(d3.subsecMilis()).toBe(500);
	});

	test('sub', () => {
		const d1 = new Duration(5, 500);
		const d2 = new Duration(3, 300);
		const result = d1.sub(d2);
		expect(result.asSecs()).toBe(2);
		expect(result.subsecNanos()).toBe(200);
	});

	test('mul', () => {
		const d1 = new Duration(2, 200);
		const d2 = new Duration(3, 300);
		const result = d1.mul(d2);
		const expectedNanos = d1.asNanos() * d2.asNanos();
		expect(result.asNanos()).toBe(expectedNanos);
	});

	test('div', () => {
		const d1 = new Duration(6, 600);
		const d2 = new Duration(2, 200);
		const result = d1.div(d2);
		const expectedNanos = d1.asNanos() / d2.asNanos();
		expect(result.asNanos()).toBe(expectedNanos);
	});
});

describe('Constants', () => {
	test('NANOS_PER_SEC', () => {
		expect(NANOS_PER_SEC).toBe(1_000_000_000);
	});

	test('MILLIS_PER_SEC', () => {
		expect(MILLIS_PER_SEC).toBe(1_000);
	});

	test('MICROS_PER_SEC', () => {
		expect(MICROS_PER_SEC).toBe(1_000_000);
	});

	test('SECOND', () => {
		expect(Duration.SECOND).toEqual(new Duration(1, 0));
	});

	test('MILLISECOND', () => {
		expect(Duration.MILLISECOND).toEqual(new Duration(0, 1_000_000));
	});

	test('MICROSECOND', () => {
		expect(Duration.MICROSECOND).toEqual(new Duration(0, 1_000));
	});

	test('NANOSECOND', () => {
		expect(Duration.NANOSECOND).toEqual(new Duration(0, 1));
	});
});
