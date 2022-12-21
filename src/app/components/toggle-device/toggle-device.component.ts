import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'toggle-device',
    templateUrl: './toggle-device.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })

export class ToggleMerossDevice implements OnInit, OnDestroy, AfterViewInit { 
    constructor() {}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit(): void {
        
    }
}