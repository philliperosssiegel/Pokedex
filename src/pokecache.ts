type CacheEntry<T> = {
    createdAt: number;
    val: T
}

export class PokeCache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, { createdAt: Date.now(), val});
    }

    get<T>(key: string): T | undefined{
        const entry = this.#cache.get(key) as CacheEntry<T> | undefined;
        return entry?.val;
    }

    #reap(): void {
        for (const [key, value] of this.#cache) {
            if (value.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}

