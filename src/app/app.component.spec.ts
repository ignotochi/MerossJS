import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MerossApp } from './meross-app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MerossApp
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MerossApp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MerossJS'`, () => {
    const fixture = TestBed.createComponent(MerossApp);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MerossJS');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MerossApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('MerossJS app is running!');
  });
});
