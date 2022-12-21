import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'load-devices',
    templateUrl: './load-devices.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })

export class LoadMerossDevices implements OnInit, OnDestroy, AfterViewInit { 
    constructor() {}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit(): void {
        
    }
}