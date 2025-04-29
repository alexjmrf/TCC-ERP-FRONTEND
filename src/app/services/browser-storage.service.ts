import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getLocalStorage(): Storage | undefined {
    return this.isBrowser ? localStorage : undefined;
  }

  getSessionStorage(): Storage | undefined {
    return this.isBrowser ? sessionStorage : undefined;
  }

  // Convenience methods for localStorage
  getItem(key: string): string | null {
    const storage = this.getLocalStorage();
    return storage ? storage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.removeItem(key);
    }
  }

  clear(): void {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.clear();
    }
  }
}