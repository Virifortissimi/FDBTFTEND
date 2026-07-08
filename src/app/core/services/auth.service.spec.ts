import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, RouterPreloader } from '@angular/router';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const publicKeyCacheKey = 'foodbot.auth.publicKey.v1.web';

  const validPublicKey = {
    keyId: 'auth-test-key',
    algorithm: 'RSA-OAEP-256',
    platform: 'web',
    publicKeySpkiBase64: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A',
    expiresAtUtc: new Date(Date.now() + 10 * 60 * 1000).toISOString()
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: RouterPreloader, useValue: { preload: () => ({ subscribe: () => undefined }) } }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and persist auth public key metadata', async () => {
    const promise = (service as any).getAuthPublicKey();

    const request = httpMock.expectOne(`${environment.apiUrl}/auth/public-key?platform=web`);
    request.flush({ success: true, data: validPublicKey });

    const publicKey = await promise;

    expect(publicKey).toEqual(validPublicKey);
    expect(JSON.parse(localStorage.getItem(publicKeyCacheKey) || '{}')).toEqual(validPublicKey);
  });

  it('should reuse persisted auth public key while it is valid', async () => {
    localStorage.setItem(publicKeyCacheKey, JSON.stringify(validPublicKey));

    const publicKey = await (service as any).getAuthPublicKey();

    expect(publicKey).toEqual(validPublicKey);
    httpMock.expectNone(`${environment.apiUrl}/auth/public-key?platform=web`);
  });

  it('should clear malformed persisted auth public key and refetch', async () => {
    localStorage.setItem(publicKeyCacheKey, '{not-json');

    const promise = (service as any).getAuthPublicKey();

    const request = httpMock.expectOne(`${environment.apiUrl}/auth/public-key?platform=web`);
    request.flush({ success: true, data: validPublicKey });

    await promise;

    expect(JSON.parse(localStorage.getItem(publicKeyCacheKey) || '{}')).toEqual(validPublicKey);
  });
});
