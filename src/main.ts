import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MerossMainModule } from './app/meross-app.module';


platformBrowserDynamic().bootstrapModule(MerossMainModule)
  .catch(err => console.error(err));
