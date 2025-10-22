export class AppMapper {
	compareValue<T>(oldVal: T, newVal: T): T | undefined {
		return oldVal === newVal ? undefined : newVal;
	}

	cleanUndefineds(obj: Record<string, unknown>) {
		return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
	}
}

export const appMapper = new AppMapper();
