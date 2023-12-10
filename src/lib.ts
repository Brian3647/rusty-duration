const NANOS_PER_SEC = 1_000_000_000;
const NANOS_PER_MILLI = 1_000_000;
const NANOS_PER_MICRO = 1_000;
const MILLIS_PER_SEC = 1_000;
const MICROS_PER_SEC = 1_000_000;

class Duration {
	private readonly seconds: number;
	private readonly nanos: number;

	static readonly ZERO = new Duration(0, 0);
	static readonly MIN = new Duration(Number.MIN_SAFE_INTEGER, 0);
	static readonly MAX = new Duration(
		Number.MAX_SAFE_INTEGER,
		NANOS_PER_SEC - 1,
	);

	static readonly SECOND = Duration.fromSecs(1);
	static readonly MILLISECOND = Duration.fromMilis(1);
	static readonly MICROSECOND = Duration.fromMicros(1);
	static readonly NANOSECOND = Duration.fromNanos(1);

	constructor(seconds: number, nanos: number) {
		if (nanos < 0) {
			throw new Error('nanos must be positive');
		}

		const added_seconds = Math.floor(nanos / NANOS_PER_SEC);

		this.seconds = seconds + added_seconds;
		this.nanos = nanos % NANOS_PER_SEC;
	}

	static fromSecs(seconds: number) {
		return new Duration(seconds, 0);
	}

	static fromMilis(milis: number) {
		return new Duration(
			Math.floor(milis / MILLIS_PER_SEC),
			(milis % MICROS_PER_SEC) * NANOS_PER_MILLI,
		);
	}

	static fromMicros(micros: number) {
		return new Duration(
			Math.floor(micros / MICROS_PER_SEC),
			(micros % MICROS_PER_SEC) * NANOS_PER_MICRO,
		);
	}

	static fromNanos(nanos: number) {
		return new Duration(
			Math.floor(nanos / NANOS_PER_SEC),
			nanos % NANOS_PER_SEC,
		);
	}

	isZero() {
		return this.seconds === 0 && this.nanos === 0;
	}

	asSecs() {
		return this.seconds;
	}

	subsecMilis() {
		return Math.floor(this.nanos / NANOS_PER_MILLI);
	}

	subsecMicros() {
		return Math.floor(this.nanos / NANOS_PER_MICRO);
	}

	subsecNanos() {
		return this.nanos;
	}

	asMilis() {
		return (
			this.seconds * MILLIS_PER_SEC + Math.floor(this.nanos / NANOS_PER_MILLI)
		);
	}

	asMicros() {
		return (
			this.seconds * MICROS_PER_SEC + Math.floor(this.nanos / NANOS_PER_MICRO)
		);
	}

	asNanos() {
		return this.seconds * NANOS_PER_SEC + this.nanos;
	}

	add(other: Duration): Duration {
		let secs = this.seconds + other.seconds;
		let nanos = this.nanos + other.nanos;

		secs += Math.floor(nanos / NANOS_PER_SEC);
		nanos %= NANOS_PER_SEC;

		return new Duration(secs, nanos);
	}

	sub(other: Duration): Duration {
		let secs = this.seconds - other.seconds;
		let nanos = this.nanos - other.nanos;

		if (nanos < 0) {
			secs -= 1;
			nanos += NANOS_PER_SEC;
		}

		return new Duration(secs, nanos);
	}

	// Probably not the best way to do this,
	// but definitely the easiest.

	mul(other: Duration): Duration {
		return Duration.fromNanos(this.asNanos() * other.asNanos());
	}

	div(other: Duration): Duration {
		return Duration.fromNanos(this.asNanos() / other.asNanos());
	}
}

export {
	Duration,
	NANOS_PER_SEC,
	NANOS_PER_MILLI,
	NANOS_PER_MICRO,
	MILLIS_PER_SEC,
	MICROS_PER_SEC,
};
