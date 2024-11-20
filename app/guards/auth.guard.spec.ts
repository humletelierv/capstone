import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';  // Asegúrate de que AuthGuard esté correctamente importado

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
