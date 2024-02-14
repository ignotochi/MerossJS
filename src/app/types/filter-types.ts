import { FilterName } from "../enum/enums";
import { IDeviceFilter } from "../interfaces/IDeviceFilter";
import { IStatusFilter } from "../interfaces/IStatusFilter";

export type DeviceFilter = [IDeviceFilter, FilterName.Device];

export type StatusFilter = [IStatusFilter, FilterName.Status];